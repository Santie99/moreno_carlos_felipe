-- Sprint 06 · Supabase Storage para imágenes del portafolio.
-- Ejecuta este archivo una vez en Supabase SQL Editor.
-- Bucket: portfolio-media
-- Lectura pública; escritura solo desde el servidor/admin usando service role.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  6291456,
  array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Limpia políticas previas para que el script sea re-ejecutable.
drop policy if exists "Public can read portfolio media" on storage.objects;
drop policy if exists "Admins can manage portfolio media" on storage.objects;

-- Lectura pública de imágenes del portafolio.
create policy "Public can read portfolio media"
on storage.objects for select
to public
using (bucket_id = 'portfolio-media');

-- Gestión administrativa desde sesiones autenticadas/admin.
-- Nota: las rutas /api/admin/media usan service role, que bypasses RLS.
-- Esta política queda lista si más adelante se usa Supabase client autenticado.
create policy "Admins can manage portfolio media"
on storage.objects for all
to authenticated
using (
  bucket_id = 'portfolio-media'
  and exists (
    select 1
    from public.admin_users admin
    where lower(admin.email) = lower(auth.jwt() ->> 'email')
      and coalesce(admin.is_active, true) = true
  )
)
with check (
  bucket_id = 'portfolio-media'
  and exists (
    select 1
    from public.admin_users admin
    where lower(admin.email) = lower(auth.jwt() ->> 'email')
      and coalesce(admin.is_active, true) = true
  )
);
