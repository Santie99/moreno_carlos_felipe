# Sprint 07 · Cierre final operativo

## Objetivo

Cerrar la versión operativa del portafolio para que el sitio pueda mantenerse desde `/admin` sin tocar código para cambios normales de contenido.

## Cambios incluidos

- `/admin/home` ahora edita contenido real de la home:
  - hero,
  - capacidades,
  - bloque sobre mí,
  - CTA final,
  - visibilidad de secciones.
- `/admin/configuracion` ahora edita configuración global:
  - site title,
  - site description,
  - keywords,
  - OG image global,
  - canonical URL,
  - disponibilidad freelance,
  - visibilidad de `/notas`,
  - fallback de WhatsApp a `/contacto`.
- Servicios ahora soportan mensaje de WhatsApp personalizado por servicio.
- Mejoras de admin:
  - warnings para proyectos destacados no publicados,
  - aviso si hay más de 3 destacados,
  - preview de URL pública de proyecto,
  - copiar link de proyecto,
  - acceso a home/media desde dashboard,
  - etiquetas de mensaje WhatsApp personalizado en servicios.
- `/notas` puede ocultarse desde configuración.
- `sitemap.xml` respeta si `/notas` está activo.
- SQL final `supabase/sprint-07-final.sql`.
- Documentación final de mantenimiento, admin, QA y producción.

## Resultado

El proyecto queda como versión final operativa: contenido, proyectos, servicios, imágenes, WhatsApp, SEO básico y configuración principal se administran desde `/admin`.
