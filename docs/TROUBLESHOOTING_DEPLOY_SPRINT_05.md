# Troubleshooting deploy · Sprint 05

## Vercel build falla por variables de entorno

Revisa que existan en Vercel:

```txt
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
ADMIN_EMAIL o ADMIN_EMAILS
SUPABASE_SERVICE_ROLE_KEY
```

Luego haz Redeploy.

## `/api/health` dice `supabasePublicRead: error`

Causas comunes:

- URL de Supabase incorrecta.
- Anon key incorrecta.
- Tablas no creadas.
- RLS impide lectura pública de tablas publicadas.
- Ejecutaste `sprint-03-admin.sql` pero no `schema.sql` / `seed.sql` en una base nueva.

## No puedo entrar a `/admin`

Revisa:

1. Usuario existe en Supabase Auth.
2. Usuario está confirmado.
3. Correo coincide con `ADMIN_EMAIL` o está dentro de `ADMIN_EMAILS`.
4. Tabla `admin_users` contiene ese correo con `is_active = true`.
5. `SUPABASE_SERVICE_ROLE_KEY` está configurada en Vercel.

## Cambios del admin no se ven en la web pública

- Revisa que el proyecto esté publicado.
- Espera 60 segundos.
- Refresca fuerte.
- Revisa `/api/health`.
- Revisa en Supabase si el registro cambió.

## El formulario de contacto no guarda

- Revisa consola del navegador.
- Revisa logs de Vercel.
- Confirma que existe `contact_messages`.
- Confirma que las políticas RLS permiten insert público.

## El sitio usa localhost en metadata o sitemap

Cambia en Vercel:

```env
NEXT_PUBLIC_SITE_URL=https://TU-URL-FINAL
```

Luego redeploy.

## Error por rutas duplicadas

No deben existir estas rutas antiguas:

```txt
app/contacto
app/notas
app/proyectos
app/servicios
app/sobre-mi
app/page.tsx
```

Las rutas públicas actuales viven dentro de:

```txt
app/(site)
```
