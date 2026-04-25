-- =============================================================================
-- Saltos — initial database schema
-- =============================================================================
-- This migration creates the full domain model:
--   * profiles            — extension of auth.users with role + contact info
--   * classes             — types of activities (free jump, dodgeball, ninja...)
--   * class_sessions      — concrete time slots (date+time) for each class
--   * pricing_plans       — tickets, packs, monthly/yearly passes
--   * reservations        — bookings linked to a session (paid via Stripe)
--   * passes              — user-owned multi-entry passes
--   * faqs                — FAQ entries (categorized)
--   * gallery_items       — gallery photos / videos (Supabase Storage)
--   * contact_messages    — inbound contact form submissions
--   * birthday_inquiries  — birthday party inquiries
--   * settings            — global key/value settings
--
-- Row-Level Security (RLS) is ENABLED on all tables. Public-read tables
-- (classes, pricing_plans, faqs, gallery_items) expose only published rows.
-- =============================================================================

-- Required extensions ---------------------------------------------------------
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Helper: updated_at trigger --------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Enums -----------------------------------------------------------------------
do $$ begin
  create type public.user_role as enum ('user', 'staff', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.reservation_status as enum ('pending', 'paid', 'cancelled', 'refunded', 'completed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.pass_type as enum ('single', 'pack_5', 'pack_10', 'monthly', 'yearly');
exception when duplicate_object then null; end $$;

-- =============================================================================
-- profiles  — 1:1 with auth.users
-- =============================================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  phone       text,
  role        public.user_role not null default 'user',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row whenever a new auth.user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', null))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================================
-- classes
-- =============================================================================
create table if not exists public.classes (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  title               text not null,
  short_description   text,
  description         text,
  duration_minutes    integer not null default 60 check (duration_minutes between 15 and 480),
  capacity            integer not null default 20 check (capacity > 0),
  min_age             integer check (min_age is null or min_age >= 0),
  cover_image_url     text,
  is_active           boolean not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create trigger classes_set_updated_at
  before update on public.classes
  for each row execute function public.set_updated_at();

create index if not exists classes_active_idx on public.classes(is_active);

-- =============================================================================
-- class_sessions  — concrete time slots
-- =============================================================================
create table if not exists public.class_sessions (
  id                 uuid primary key default gen_random_uuid(),
  class_id           uuid not null references public.classes(id) on delete cascade,
  starts_at          timestamptz not null,
  ends_at            timestamptz not null,
  capacity_override  integer check (capacity_override is null or capacity_override > 0),
  is_cancelled       boolean not null default false,
  created_at         timestamptz not null default now(),
  check (ends_at > starts_at)
);

create index if not exists class_sessions_class_idx on public.class_sessions(class_id);
create index if not exists class_sessions_starts_at_idx on public.class_sessions(starts_at);

-- =============================================================================
-- pricing_plans
-- =============================================================================
create table if not exists public.pricing_plans (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  name              text not null,
  description       text,
  price_grosze      integer not null check (price_grosze >= 0),
  type              public.pass_type not null,
  entries           integer check (entries is null or entries > 0),
  stripe_price_id   text,
  is_active         boolean not null default true,
  sort_order        integer not null default 0,
  created_at        timestamptz not null default now()
);

create index if not exists pricing_plans_active_idx on public.pricing_plans(is_active, sort_order);

-- =============================================================================
-- reservations
-- =============================================================================
create table if not exists public.reservations (
  id                            uuid primary key default gen_random_uuid(),
  user_id                       uuid references auth.users(id) on delete set null,
  guest_name                    text,
  guest_email                   text,
  guest_phone                   text,
  session_id                    uuid not null references public.class_sessions(id) on delete restrict,
  quantity                      integer not null check (quantity > 0),
  total_grosze                  integer not null default 0 check (total_grosze >= 0),
  status                        public.reservation_status not null default 'pending',
  stripe_checkout_session_id    text,
  stripe_payment_intent_id      text,
  notes                         text,
  created_at                    timestamptz not null default now(),
  updated_at                    timestamptz not null default now(),
  -- A reservation must have either a logged-in user or guest contact details.
  check (user_id is not null or (guest_name is not null and guest_email is not null))
);

create trigger reservations_set_updated_at
  before update on public.reservations
  for each row execute function public.set_updated_at();

create index if not exists reservations_user_idx on public.reservations(user_id);
create index if not exists reservations_session_idx on public.reservations(session_id);
create index if not exists reservations_status_idx on public.reservations(status);
create index if not exists reservations_created_idx on public.reservations(created_at desc);

-- =============================================================================
-- passes  — multi-entry passes owned by users
-- =============================================================================
create table if not exists public.passes (
  id                          uuid primary key default gen_random_uuid(),
  user_id                     uuid not null references auth.users(id) on delete cascade,
  pricing_plan_id             uuid not null references public.pricing_plans(id) on delete restrict,
  entries_remaining           integer not null default 0 check (entries_remaining >= 0),
  valid_from                  timestamptz not null default now(),
  valid_until                 timestamptz,
  stripe_payment_intent_id    text,
  created_at                  timestamptz not null default now()
);

create index if not exists passes_user_idx on public.passes(user_id);

-- =============================================================================
-- faqs
-- =============================================================================
create table if not exists public.faqs (
  id            uuid primary key default gen_random_uuid(),
  category      text not null default 'Ogólne',
  question      text not null,
  answer        text not null,
  sort_order    integer not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now()
);

create index if not exists faqs_published_idx on public.faqs(is_published, category, sort_order);

-- =============================================================================
-- gallery_items
-- =============================================================================
create table if not exists public.gallery_items (
  id            uuid primary key default gen_random_uuid(),
  title         text,
  category      text,
  type          text not null default 'image' check (type in ('image', 'video')),
  storage_path  text not null,         -- path in Supabase Storage bucket
  width         integer,
  height        integer,
  sort_order    integer not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now()
);

create index if not exists gallery_published_idx on public.gallery_items(is_published, sort_order);

-- =============================================================================
-- contact_messages
-- =============================================================================
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null,
  status      text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  created_at  timestamptz not null default now()
);

-- =============================================================================
-- birthday_inquiries
-- =============================================================================
create table if not exists public.birthday_inquiries (
  id              uuid primary key default gen_random_uuid(),
  parent_name     text not null,
  email           text not null,
  phone           text not null,
  child_name      text,
  child_age       integer check (child_age is null or (child_age between 0 and 120)),
  guests_count    integer not null check (guests_count > 0),
  preferred_date  date not null,
  package         text,
  notes           text,
  status          text not null default 'new' check (status in ('new', 'confirmed', 'cancelled')),
  created_at      timestamptz not null default now()
);

-- =============================================================================
-- settings  — global key/value (e.g. opening hours, banners)
-- =============================================================================
create table if not exists public.settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

create trigger settings_set_updated_at
  before update on public.settings
  for each row execute function public.set_updated_at();
