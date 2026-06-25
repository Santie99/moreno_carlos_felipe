# Sprint 03 · Archivos a reemplazar / crear / eliminar

## Recomendación segura

Para este sprint conviene reemplazar la carpeta completa del proyecto por la carpeta del ZIP, manteniendo fuera:

- `node_modules`
- `.next`
- `.env.local`

Si decides copiar archivos encima de la carpeta actual, debes respetar también la lista de archivos a eliminar para evitar rutas duplicadas en Next.js.

## Archivos a reemplazar

```txt
.env.example
README.md
app/layout.tsx
supabase/schema.sql
supabase/seed.sql
types/index.ts
```

## Archivos nuevos a crear

```txt
middleware.ts

app/(site)/layout.tsx
app/(site)/page.tsx
app/(site)/contacto/page.tsx
app/(site)/notas/page.tsx
app/(site)/proyectos/page.tsx
app/(site)/proyectos/[slug]/page.tsx
app/(site)/servicios/page.tsx
app/(site)/sobre-mi/page.tsx

app/admin/(auth)/login/page.tsx
app/admin/(dashboard)/layout.tsx
app/admin/(dashboard)/page.tsx
app/admin/(dashboard)/proyectos/page.tsx
app/admin/(dashboard)/proyectos/nuevo/page.tsx
app/admin/(dashboard)/proyectos/[id]/editar/page.tsx
app/admin/(dashboard)/servicios/page.tsx
app/admin/(dashboard)/servicios/nuevo/page.tsx
app/admin/(dashboard)/servicios/[id]/editar/page.tsx
app/admin/(dashboard)/perfil/page.tsx
app/admin/(dashboard)/mensajes/page.tsx
app/admin/(dashboard)/home/page.tsx
app/admin/(dashboard)/media/page.tsx
app/admin/(dashboard)/configuracion/page.tsx

app/api/admin/auth/login/route.ts
app/api/admin/auth/logout/route.ts
app/api/admin/auth/me/route.ts
app/api/admin/projects/route.ts
app/api/admin/projects/[id]/route.ts
app/api/admin/services/route.ts
app/api/admin/services/[id]/route.ts
app/api/admin/profile/route.ts
app/api/admin/messages/route.ts
app/api/admin/messages/[id]/route.ts

components/admin/AdminDashboardClient.tsx
components/admin/AdminLoginForm.tsx
components/admin/AdminPageHeader.tsx
components/admin/AdminSidebar.tsx
components/admin/LogoutButton.tsx
components/admin/MessageActions.tsx
components/admin/MessagesAdminClient.tsx
components/admin/ProfileAdminClient.tsx
components/admin/ProfileForm.tsx
components/admin/ProjectActions.tsx
components/admin/ProjectEditLoader.tsx
components/admin/ProjectForm.tsx
components/admin/ProjectsAdminClient.tsx
components/admin/ServiceActions.tsx
components/admin/ServiceEditLoader.tsx
components/admin/ServiceForm.tsx
components/admin/ServicesAdminClient.tsx

lib/admin-auth.ts
lib/admin-data.ts
lib/admin-mappers.ts
lib/admin-payloads.ts
lib/admin-supabase.ts

supabase/sprint-03-admin.sql

docs/ENTREGA_SPRINT_03.md
docs/ARCHIVOS_A_REEMPLAZAR_O_CREAR_SPRINT_03.md
docs/INSTRUCCIONES_ADMIN_SPRINT_03.md
docs/PRUEBAS_SPRINT_03.md
```

## Archivos a eliminar si copias manualmente encima del Sprint 02

Estos archivos fueron movidos a `app/(site)/...` para que el admin no herede navbar/footer públicos. Si quedan duplicados, Next.js puede generar conflicto de rutas.

```txt
app/page.tsx
app/contacto/page.tsx
app/notas/page.tsx
app/proyectos/page.tsx
app/proyectos/[slug]/page.tsx
app/servicios/page.tsx
app/sobre-mi/page.tsx
```

También puedes eliminar estas carpetas viejas si quedan vacías:

```txt
app/contacto
app/notas
app/proyectos
app/servicios
app/sobre-mi
```
