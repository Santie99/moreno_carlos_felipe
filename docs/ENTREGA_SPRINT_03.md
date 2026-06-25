# Entrega Sprint 03 · /admin privado con login

## Objetivo

Agregar un panel privado `/admin` conectado a Supabase Auth para que el contenido principal de la web pueda gestionarse sin tocar código.

## Incluye

- `/admin/login` con login de correo + contraseña usando Supabase Auth.
- Protección básica de rutas `/admin` mediante cookie de sesión.
- Allowlist por variable `ADMIN_EMAIL` o `ADMIN_EMAILS`.
- API privada para CRUD de proyectos.
- API privada para CRUD de servicios.
- API privada para editar perfil público.
- API privada para ver, cambiar estado y eliminar mensajes de contacto.
- Dashboard admin.
- Listado de proyectos.
- Crear proyecto.
- Editar proyecto.
- Eliminar proyecto.
- Listado de servicios.
- Crear servicio.
- Editar servicio.
- Eliminar servicio.
- Editar perfil.
- Revisar mensajes.
- Secciones preparadas para Home, Media y Configuración.
- Separación de layout público y layout admin usando route group `(site)`.

## No incluye todavía

- Upload real de imágenes a Supabase Storage.
- Editor visual avanzado para home sections.
- Gestión avanzada de skills y educación desde admin.
- Reordenamiento drag-and-drop.

Estas partes quedan para Sprint 04.
