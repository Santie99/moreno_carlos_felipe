# Entrega Sprint 02 · Supabase sin /admin

## Objetivo

Conectar la web pública a Supabase sin construir todavía el panel `/admin`.

## Cambios principales

- Se agregó integración con Supabase REST usando `fetch` nativo.
- Se creó `lib/data.ts` como capa de datos central.
- Se creó `lib/supabase-rest.ts` como cliente REST liviano.
- Las páginas públicas ahora leen perfil, proyectos y servicios desde `lib/data.ts`.
- Si Supabase no está configurado, la web usa `lib/mock-data.ts` como fallback.
- El formulario de contacto ahora envía a `/api/contact`.
- `/api/contact` guarda mensajes en Supabase si las variables están configuradas.
- Se agregaron `supabase/schema.sql` y `supabase/seed.sql`.
- Se actualizaron README y `.env.example`.

## Qué no incluye

- No incluye `/admin` todavía.
- No incluye login.
- No incluye edición de proyectos desde la web.
- No incluye Supabase Storage para subir imágenes desde interfaz.

Eso queda para Sprint 03.
