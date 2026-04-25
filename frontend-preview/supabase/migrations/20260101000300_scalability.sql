-- =============================================================================
-- Saltos — scalability layer
-- =============================================================================
-- Built for thousands of concurrent users:
--   * Atomic reservation creation (race-condition-free overbooking guard)
--   * Atomic pass-entry consumption
--   * Stripe webhook idempotency table
--   * Extra indexes for hot paths (auth lookups, user dashboards, admin lists)
--   * Materialized counters helper (kept simple; can be promoted to MV later)
-- =============================================================================

-- ---------- Stripe webhook idempotency ---------------------------------------
-- Stripe may deliver the same event multiple times. We store every processed
-- event id and short-circuit duplicates in `lib/stripe/webhooks.ts`.
create table if not exists public.stripe_events (
  id              text primary key,             -- evt_xxx
  type            text not null,
  payload         jsonb,
  processed_at    timestamptz not null default now()
);

alter table public.stripe_events enable row level security;
-- No public access; only service-role (which bypasses RLS) writes here.

-- ---------- Atomic reservation creation --------------------------------------
-- Acquires a row-level lock on the target session and verifies remaining
-- capacity in the same transaction. Eliminates the read-then-write race that
-- can sell more seats than available under load.
--
-- Returns the inserted reservation row.
create or replace function public.create_reservation_atomic(
  p_session_id          uuid,
  p_quantity            integer,
  p_total_grosze        integer,
  p_user_id             uuid default null,
  p_guest_name          text default null,
  p_guest_email         text default null,
  p_guest_phone         text default null,
  p_notes               text default null
)
returns public.reservations
language plpgsql
security definer
set search_path = public
as $$
declare
  v_session       public.class_sessions%rowtype;
  v_class_cap     integer;
  v_taken         integer;
  v_capacity      integer;
  v_reservation   public.reservations%rowtype;
begin
  if p_quantity <= 0 then
    raise exception 'quantity_must_be_positive';
  end if;

  -- Lock the session row to serialize concurrent bookings for the same slot.
  select * into v_session
  from public.class_sessions
  where id = p_session_id
  for update;

  if not found then
    raise exception 'session_not_found';
  end if;

  if v_session.is_cancelled then
    raise exception 'session_cancelled';
  end if;

  if v_session.starts_at <= now() then
    raise exception 'session_in_past';
  end if;

  -- Resolve effective capacity (override on session > class default).
  if v_session.capacity_override is not null then
    v_capacity := v_session.capacity_override;
  else
    select capacity into v_class_cap from public.classes where id = v_session.class_id;
    v_capacity := coalesce(v_class_cap, 0);
  end if;

  -- Sum confirmed + still-pending reservations for this session.
  select coalesce(sum(quantity), 0) into v_taken
  from public.reservations
  where session_id = p_session_id
    and status in ('paid', 'pending');

  if v_taken + p_quantity > v_capacity then
    raise exception 'insufficient_capacity';
  end if;

  insert into public.reservations (
    session_id, quantity, total_grosze,
    user_id, guest_name, guest_email, guest_phone,
    notes, status
  )
  values (
    p_session_id, p_quantity, p_total_grosze,
    p_user_id, p_guest_name, p_guest_email, p_guest_phone,
    p_notes, 'pending'
  )
  returning * into v_reservation;

  return v_reservation;
end;
$$;

grant execute on function public.create_reservation_atomic(uuid, integer, integer, uuid, text, text, text, text)
  to anon, authenticated;

-- ---------- Atomic pass-entry consumption ------------------------------------
-- Decrements `entries_remaining` of an active pass in a single transaction.
-- Returns true if the entry was consumed.
create or replace function public.consume_pass_entry(p_pass_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_pass public.passes%rowtype;
begin
  select * into v_pass from public.passes where id = p_pass_id for update;
  if not found then return false; end if;

  if v_pass.valid_until is not null and v_pass.valid_until < now() then
    return false;
  end if;

  if v_pass.entries_remaining is null then
    -- Unlimited pass (monthly / yearly) — nothing to decrement.
    return true;
  end if;

  if v_pass.entries_remaining <= 0 then
    return false;
  end if;

  update public.passes
     set entries_remaining = entries_remaining - 1
   where id = p_pass_id;

  return true;
end;
$$;

grant execute on function public.consume_pass_entry(uuid) to authenticated;

-- ---------- Pending reservations TTL cleanup --------------------------------
-- Cancels reservations that have been "pending" for more than 30 minutes
-- (typical Stripe Checkout session TTL). Free up seats for other customers.
create or replace function public.cleanup_stale_reservations()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  with cancelled as (
    update public.reservations
       set status = 'cancelled'
     where status = 'pending'
       and created_at < now() - interval '30 minutes'
    returning 1
  )
  select count(*) into v_count from cancelled;
  return v_count;
end;
$$;

-- Suggested cron (set up via Supabase Dashboard → Database → Cron):
--   SELECT cron.schedule('cleanup_stale_reservations', '*/10 * * * *',
--     $$select public.cleanup_stale_reservations();$$);

-- ---------- Hot-path indexes -------------------------------------------------
-- Fast user dashboard ("my reservations") — covering composite index.
create index if not exists reservations_user_created_idx
  on public.reservations(user_id, created_at desc)
  where user_id is not null;

-- Fast availability calc — only count rows that consume capacity.
create index if not exists reservations_session_active_idx
  on public.reservations(session_id)
  where status in ('paid', 'pending');

-- Admin list filtering by status + date range.
create index if not exists reservations_status_created_idx
  on public.reservations(status, created_at desc);

-- Guest reservation lookup ("find my reservation by email").
create index if not exists reservations_guest_email_idx
  on public.reservations(guest_email)
  where guest_email is not null;

-- Auth profile role lookup (used by middleware on every protected request).
create index if not exists profiles_role_idx
  on public.profiles(role)
  where role <> 'user';

-- Sessions calendar view (admin grafik).
create index if not exists class_sessions_class_starts_idx
  on public.class_sessions(class_id, starts_at);

-- Stripe webhook fast lookup (already PK, but explicit for clarity).
-- create index implicitly exists from PRIMARY KEY (id).
