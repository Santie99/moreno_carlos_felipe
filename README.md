# Santie Portfolio · Sprint 07 Final Operativo

Portafolio personal profesional construido con Next.js, TypeScript, Tailwind, Supabase, Supabase Storage y Vercel.

## Estado

Sprint 07 cierra la versión operativa:

- Web pública con SEO.
- Supabase como fuente de datos.
- `/admin` privado con login.
- CRUD de proyectos y servicios.
- Gestión real de imágenes con Supabase Storage.
- WhatsApp funnel con fallback a `/contacto`.
- Home editable desde `/admin/home`.
- Configuración global editable desde `/admin/configuracion`.
- Documentación final de producción y mantenimiento.

## Instalación local

```bash
npm install
npm run dev
```

Abrir:

```txt
http://localhost:3000
```

## Validación técnica

```bash
npm run typecheck
npm run build
```

## Variables de entorno

Crear `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
ADMIN_EMAIL=tu-correo-admin@email.com
SUPABASE_STORAGE_BUCKET=portfolio-media
```

No subir `.env.local` a GitHub.

## SQL requerido

En Supabase SQL Editor, ejecutar según tu estado:

1. `supabase/schema.sql` si partes de cero.
2. `supabase/seed.sql` si necesitas datos iniciales.
3. `supabase/sprint-03-admin.sql` para admin.
4. `supabase/sprint-06-storage.sql` para Storage.
5. `supabase/sprint-07-final.sql` para cierre operativo.

## Admin

Rutas principales:

```txt
/admin/login
/admin
/admin/proyectos
/admin/servicios
/admin/perfil
/admin/media
/admin/home
/admin/configuracion
/admin/mensajes
/admin/guia
```

## Documentación relevante

```txt
docs/GUIA_FINAL_MANTENIMIENTO_SPRINT_07.md
docs/GUIA_ADMIN_FINAL_SPRINT_07.md
docs/CHECKLIST_FINAL_PRODUCCION_SPRINT_07.md
docs/PRUEBAS_SPRINT_07.md
docs/ARCHIVOS_A_REEMPLAZAR_O_CREAR_SPRINT_07.md
```

## Producción

Subir a GitHub y desplegar en Vercel.

Después de configurar variables en Vercel, hacer redeploy sin build cache si cambiaste variables críticas.

Verificar:

```txt
/api/health
/robots.txt
/sitemap.xml
/admin/login
```
