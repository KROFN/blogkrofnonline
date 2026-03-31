create extension if not exists "pgcrypto";

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  cover_image text,
  is_published boolean not null default false,
  featured boolean not null default false,
  reading_time integer,
  views integer not null default 0,
  category text,
  author_id uuid not null references auth.users(id) on delete cascade
);

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.posts enable row level security;
alter table public.admins enable row level security;

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admins
    where user_id = uid
  );
$$;

drop policy if exists "published posts are readable" on public.posts;
create policy "published posts are readable"
on public.posts
for select
using (is_published = true or public.is_admin(auth.uid()));

drop policy if exists "admins can insert posts" on public.posts;
create policy "admins can insert posts"
on public.posts
for insert
with check (public.is_admin(auth.uid()));

drop policy if exists "admins can update posts" on public.posts;
create policy "admins can update posts"
on public.posts
for update
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "admins can delete posts" on public.posts;
create policy "admins can delete posts"
on public.posts
for delete
using (public.is_admin(auth.uid()));

drop policy if exists "admins can read admins" on public.admins;
drop policy if exists "service role manages admins" on public.admins;
create policy "service role manages admins"
on public.admins
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
