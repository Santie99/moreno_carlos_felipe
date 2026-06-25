# Entrega Sprint 05 · Deploy, producción y operación

## Objetivo

Preparar el proyecto para deploy en Vercel sin cambiar la lógica pública ni romper el admin existente.

## Cambios incluidos

- Documentación completa de deploy en Vercel.
- Documentación de configuración Supabase para producción.
- Documentación para operar proyectos desde `/admin`.
- Ruta `/api/health` para revisar variables y lectura pública de Supabase.
- Página `/admin/guia` con instrucciones operativas rápidas.
- Link a la guía dentro del sidebar del admin.
- Quick action hacia la guía desde el dashboard admin.
- `vercel.json` con headers básicos de seguridad.
- `.env.example` actualizado para local y producción.
- README actualizado a Sprint 05.

## Qué no incluye

- No despliega automáticamente en tu cuenta de Vercel.
- No cambia tus datos reales en Supabase.
- No modifica RLS ni tablas, porque el Sprint 05 es de deploy/documentación/polish operativo.
- No agrega gestión real de imágenes con Supabase Storage; eso queda para un sprint posterior.
