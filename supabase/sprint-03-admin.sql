-- Sprint 03 · Admin login support
-- Ejecuta este archivo si ya habías corrido schema.sql del Sprint 02.
-- Si estás creando la base desde cero, puedes ejecutar schema.sql actualizado y luego seed.sql.

alter table public.admin_users
  add column if not exists is_active boolean not null default true;

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

-- Cambia el correo si tu admin será otro.
insert into public.admin_users (email, role, is_active)
values ('morenopachecocarlos10a@gmail.com', 'owner', true)
on conflict (email) do update set role = excluded.role, is_active = true;
