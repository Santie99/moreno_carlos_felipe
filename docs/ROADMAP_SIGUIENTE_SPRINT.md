# Roadmap sugerido para el siguiente sprint

## Sprint 02 recomendado

Objetivo: preparar la conexión real a Supabase y dejar el modelo de datos listo.

Incluye:

1. Crear proyecto Supabase.
2. Crear `supabase/schema.sql`.
3. Crear tablas:
   - profile
   - projects
   - project_images
   - services
   - skills
   - education_items
   - contact_messages
   - site_settings
   - admin_users
4. Crear RLS.
5. Crear seed inicial con los datos mock actuales.
6. Conectar lectura pública desde Supabase.
7. Conectar formulario de contacto para guardar mensajes.

## Sprint 03 recomendado

Objetivo: crear `/admin` privado.

Incluye:

1. Login admin.
2. Protección por correo autorizado.
3. CRUD de proyectos.
4. Marcar proyectos como destacados.
5. Reordenar proyectos principales.
6. CRUD de servicios.
7. Edición de perfil.
8. Edición de contenido home.
9. Gestión de mensajes.
10. Subida de imágenes.
