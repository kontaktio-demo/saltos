-- =============================================================================
-- Saltos — Row-Level Security policies
-- =============================================================================
-- Enables RLS on every table and grants minimal sensible access:
--   * Public (anon)        — read published "marketing" tables only
--   * Authenticated users  — read/manage their own data (reservations, passes,
--                            profile)
--   * staff / admin role   — full read/write via the policies (when accessed
--                            via the regular Supabase client). The service-role
--                            key bypasses RLS entirely and is used by the
--                            Stripe webhook + admin Server Actions.
--
-- Helper: is_admin() — checks profiles.role for the current auth.uid().
-- =============================================================================

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'staff')
  );
$$;

-- ---------------- profiles ---------------------------------------------------
alter table public.profiles enable row level security;

create policy "profiles: user can read own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles: user can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles: admin can update any profile"
  on public.profiles for update
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------- classes ----------------------------------------------------
alter table public.classes enable row level security;

create policy "classes: public read of active classes"
  on public.classes for select
  using (is_active or public.is_admin());

create policy "classes: admin write"
  on public.classes for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------- class_sessions --------------------------------------------
alter table public.class_sessions enable row level security;

create policy "sessions: public read non-cancelled future sessions"
  on public.class_sessions for select
  using ((not is_cancelled and starts_at >= now()) or public.is_admin());

create policy "sessions: admin write"
  on public.class_sessions for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------- pricing_plans ---------------------------------------------
alter table public.pricing_plans enable row level security;

create policy "pricing: public read of active plans"
  on public.pricing_plans for select
  using (is_active or public.is_admin());

create policy "pricing: admin write"
  on public.pricing_plans for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------- reservations ----------------------------------------------
alter table public.reservations enable row level security;

create policy "reservations: user reads own"
  on public.reservations for select
  using (auth.uid() = user_id or public.is_admin());

create policy "reservations: anyone can create (incl. guests)"
  on public.reservations for insert
  with check (true);

create policy "reservations: user updates own"
  on public.reservations for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "reservations: admin all"
  on public.reservations for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------- passes -----------------------------------------------------
alter table public.passes enable row level security;

create policy "passes: user reads own"
  on public.passes for select
  using (auth.uid() = user_id or public.is_admin());

create policy "passes: admin write"
  on public.passes for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------- faqs -------------------------------------------------------
alter table public.faqs enable row level security;

create policy "faqs: public read published"
  on public.faqs for select
  using (is_published or public.is_admin());

create policy "faqs: admin write"
  on public.faqs for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------- gallery_items ---------------------------------------------
alter table public.gallery_items enable row level security;

create policy "gallery: public read published"
  on public.gallery_items for select
  using (is_published or public.is_admin());

create policy "gallery: admin write"
  on public.gallery_items for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------- contact_messages ------------------------------------------
alter table public.contact_messages enable row level security;

create policy "contact: anyone can submit"
  on public.contact_messages for insert
  with check (true);

create policy "contact: admin reads all"
  on public.contact_messages for select
  using (public.is_admin());

create policy "contact: admin writes"
  on public.contact_messages for update
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------- birthday_inquiries ----------------------------------------
alter table public.birthday_inquiries enable row level security;

create policy "birthday: anyone can submit"
  on public.birthday_inquiries for insert
  with check (true);

create policy "birthday: admin reads all"
  on public.birthday_inquiries for select
  using (public.is_admin());

create policy "birthday: admin writes"
  on public.birthday_inquiries for update
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------- settings ---------------------------------------------------
alter table public.settings enable row level security;

create policy "settings: public read"
  on public.settings for select
  using (true);

create policy "settings: admin write"
  on public.settings for all
  using (public.is_admin())
  with check (public.is_admin());
