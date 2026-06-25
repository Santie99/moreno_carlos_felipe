-- Sprint 02 · Supabase schema for Santie Bernal portfolio
-- Run this file first in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique,
  email text unique not null,
  role text not null default 'owner',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where is_active = true
      and (
        user_id = auth.uid()
        or lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      )
  );
$$;

create table if not exists public.profile (
  id text primary key default 'main',
  name text not null,
  headline text not null,
  short_bio text not null,
  long_bio text not null,
  profile_image_url text not null,
  location text not null,
  email text not null,
  github_url text not null default '#',
  linkedin_url text not null default '#',
  x_url text not null default '#',
  whatsapp_url text not null default '#',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  level text not null default 'Base aplicada',
  sort_order int not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  provider text not null,
  description text not null,
  category text not null,
  sort_order int not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id text primary key,
  title text not null,
  slug text unique not null,
  short_description text not null,
  long_description text not null,
  problem text not null,
  solution text not null,
  target_user text not null,
  category text not null,
  status text not null,
  tags text[] not null default '{}',
  stack text[] not null default '{}',
  features text[] not null default '{}',
  product_decisions text[] not null default '{}',
  technical_challenges text[] not null default '{}',
  learnings text[] not null default '{}',
  potential text[] not null default '{}',
  demo_url text,
  github_url text,
  video_url text,
  cover_image_url text not null,
  og_image_url text,
  seo_title text not null,
  seo_description text not null,
  is_published boolean not null default false,
  is_featured boolean not null default false,
  featured_order int not null default 100,
  highlight_level text not null default 'secundario',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id text not null references public.projects(id) on delete cascade,
  image_url text not null,
  alt_text text not null,
  sort_order int not null default 100,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id text primary key,
  title text not null,
  slug text unique not null,
  short_description text not null,
  ideal_client text not null,
  problem text not null,
  deliverables text[] not null default '{}',
  scope text[] not null default '{}',
  exclusions text[] not null default '{}',
  price_from text not null,
  price_note text not null,
  cta_text text not null,
  whatsapp_message text,
  is_active boolean not null default true,
  sort_order int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.home_sections (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  title text not null,
  subtitle text,
  content text,
  cta_label text,
  cta_url text,
  is_active boolean not null default true,
  sort_order int not null default 100,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  opportunity_type text not null,
  budget text,
  link text,
  message text not null,
  status text not null default 'Nuevo',
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.profile enable row level security;
alter table public.skills enable row level security;
alter table public.education_items enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.services enable row level security;
alter table public.home_sections enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

-- Drop duplicated policies when re-running this file.
drop policy if exists "Public can read profile" on public.profile;
drop policy if exists "Admins can manage profile" on public.profile;
drop policy if exists "Public can read active skills" on public.skills;
drop policy if exists "Admins can manage skills" on public.skills;
drop policy if exists "Public can read active education" on public.education_items;
drop policy if exists "Admins can manage education" on public.education_items;
drop policy if exists "Public can read published projects" on public.projects;
drop policy if exists "Admins can manage projects" on public.projects;
drop policy if exists "Public can read project images" on public.project_images;
drop policy if exists "Admins can manage project images" on public.project_images;
drop policy if exists "Public can read active services" on public.services;
drop policy if exists "Admins can manage services" on public.services;
drop policy if exists "Public can read active home sections" on public.home_sections;
drop policy if exists "Admins can manage home sections" on public.home_sections;
drop policy if exists "Anyone can insert contact messages" on public.contact_messages;
drop policy if exists "Admins can read contact messages" on public.contact_messages;
drop policy if exists "Admins can update contact messages" on public.contact_messages;
drop policy if exists "Public can read site settings" on public.site_settings;
drop policy if exists "Admins can manage site settings" on public.site_settings;
drop policy if exists "Admins can read admin users" on public.admin_users;
drop policy if exists "Admins can manage admin users" on public.admin_users;

create policy "Public can read profile" on public.profile for select using (true);
create policy "Admins can manage profile" on public.profile for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active skills" on public.skills for select using (is_active = true);
create policy "Admins can manage skills" on public.skills for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active education" on public.education_items for select using (is_active = true);
create policy "Admins can manage education" on public.education_items for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read published projects" on public.projects for select using (is_published = true);
create policy "Admins can manage projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read project images" on public.project_images for select using (
  exists (select 1 from public.projects p where p.id = project_id and p.is_published = true)
);
create policy "Admins can manage project images" on public.project_images for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active services" on public.services for select using (is_active = true);
create policy "Admins can manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active home sections" on public.home_sections for select using (is_active = true);
create policy "Admins can manage home sections" on public.home_sections for all using (public.is_admin()) with check (public.is_admin());

create policy "Anyone can insert contact messages" on public.contact_messages for insert with check (true);
create policy "Admins can read contact messages" on public.contact_messages for select using (public.is_admin());
create policy "Admins can update contact messages" on public.contact_messages for update using (public.is_admin()) with check (public.is_admin());

create policy "Public can read site settings" on public.site_settings for select using (true);
create policy "Admins can manage site settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins can read admin users" on public.admin_users for select using (public.is_admin());
create policy "Admins can manage admin users" on public.admin_users for all using (public.is_admin()) with check (public.is_admin());
