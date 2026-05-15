-- FTHUN Landing Page — Waitlist Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- 1. Create the waitlist table
create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  source     text default 'landing_page',
  created_at timestamptz default now()
);

-- 2. Add an index on email for fast duplicate checks
create index if not exists idx_waitlist_email on public.waitlist (email);

-- 3. Add an index on created_at for chronological queries
create index if not exists idx_waitlist_created on public.waitlist (created_at desc);

-- 4. Enable Row Level Security
alter table public.waitlist enable row level security;

-- 5. Policy: allow inserts from the API (service role bypasses RLS,
--    but this keeps the table locked down if accessed via anon key)
create policy "Allow public inserts" on public.waitlist
  for insert
  with check (true);

-- 6. Policy: only authenticated / service role can read
create policy "Service role can read" on public.waitlist
  for select
  using (auth.role() = 'service_role');

-- Optional: view to quickly check signup count
create or replace view public.waitlist_stats as
select
  count(*)                                       as total_signups,
  count(*) filter (where created_at > now() - interval '24 hours') as last_24h,
  count(*) filter (where created_at > now() - interval '7 days')   as last_7d,
  min(created_at)                                as first_signup,
  max(created_at)                                as latest_signup
from public.waitlist;
