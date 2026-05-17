-- FTHUN Landing Page — Broadcast log
-- Run this in Supabase SQL Editor AFTER schema.sql

create table if not exists public.broadcasts (
  id              uuid primary key default gen_random_uuid(),
  subject         text not null,
  html            text not null,
  recipient_count integer not null default 0,
  sent_at         timestamptz default now()
);

create index if not exists idx_broadcasts_sent on public.broadcasts (sent_at desc);

alter table public.broadcasts enable row level security;

create policy "Service role can read broadcasts" on public.broadcasts
  for select using (auth.role() = 'service_role');

create policy "Service role can insert broadcasts" on public.broadcasts
  for insert with check (auth.role() = 'service_role');
