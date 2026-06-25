# Deploy completo en Vercel + Supabase · Sprint 05

Esta guía asume que ya tienes el proyecto funcionando localmente con Supabase y `/admin`.

## 1. Verificación local antes de subir

Desde la raíz del proyecto:

```powershell
npm install
npm run typecheck
npm run build
```

Si `npm run build` falla, no despliegues todavía. Corrige primero el error local.

## 2. Verifica `.gitignore`

Debe excluir:

```txt
node_modules
.next
.env.local
.env
.vercel
```

No subas llaves privadas a GitHub.

## 3. Crear o preparar repositorio en GitHub

Desde VSCode o terminal:

```powershell
git init
git add .
git commit -m "Sprint 05 deploy ready"
```

Luego crea el repo en GitHub y conecta:

```powershell
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

Si el repo ya existe:

```powershell
git add .
git commit -m "Sprint 05 deploy ready"
git push
```

## 4. Importar en Vercel

1. Entra a Vercel.
2. New Project.
3. Importa el repositorio de GitHub.
4. Framework Preset: Next.js.
5. Build Command: dejar por defecto o `npm run build`.
6. Install Command: dejar por defecto o `npm install`.
7. Output Directory: dejar vacío.

## 5. Variables de entorno en Vercel

En Vercel > Project > Settings > Environment Variables, agrega estas variables para Production, Preview y Development si quieres:

```env
NEXT_PUBLIC_SITE_URL=https://TU-DOMINIO-DE-PRODUCCION
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY_O_PUBLISHABLE_KEY
ADMIN_EMAIL=tu-correo-admin@email.com
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY_O_SECRET_KEY 
```

Notas:

- `NEXT_PUBLIC_SITE_URL` debe ser la URL final de producción.
- Si todavía no tienes dominio propio, usa la URL de Vercel, por ejemplo `https://tu-proyecto.vercel.app`.
- `SUPABASE_SERVICE_ROLE_KEY` nunca debe empezar por `NEXT_PUBLIC_`.
- Si usarás varios admins, usa `ADMIN_EMAILS=correo1@email.com,correo2@email.com`.

## 6. Primer deploy

Haz clic en Deploy.

Cuando termine, abre la URL de Vercel y prueba:

```txt
/
/proyectos
/servicios
/sobre-mi
/contacto
/api/health
/admin/login
```

## 7. Ajustar `NEXT_PUBLIC_SITE_URL`

Después de tener la URL final, vuelve a Vercel > Settings > Environment Variables y confirma:

```env
NEXT_PUBLIC_SITE_URL=https://TU-URL-FINAL
```

Luego haz Redeploy para que metadata, canonical, sitemap y robots usen la URL correcta.

## 8. Configurar Supabase Auth para producción

En Supabase:

1. Authentication.
2. URL Configuration.
3. Site URL:

```txt
https://TU-URL-FINAL
```

4. Redirect URLs, agrega:

```txt
https://TU-URL-FINAL/**
http://localhost:3000/**
```

Aunque el login actual usa email/password directo y no magic link, dejar bien estas URLs evita problemas si más adelante agregas flujos con redirects.

## 9. Verificar usuario admin

En Supabase:

1. Authentication > Users.
2. Verifica que exista el usuario con el mismo correo de `ADMIN_EMAIL`.
3. Si no existe, créalo manualmente con contraseña.
4. Activa confirmación del usuario.

En Table Editor > `admin_users`, verifica:

```txt
email = el mismo correo admin
is_active = true
role = owner
```

## 10. Probar admin en producción

Entra a:

```txt
https://TU-URL-FINAL/admin/login
```

Prueba:

1. Login con correo admin.
2. Abrir `/admin`.
3. Crear proyecto de prueba.
4. Publicarlo.
5. Verlo en `/proyectos`.
6. Destacarlo con orden 1.
7. Verlo en la home.
8. Borrarlo o despublicarlo si era prueba.

## 11. Probar formulario de contacto

Entra a:

```txt
https://TU-URL-FINAL/contacto
```

Envía un mensaje de prueba.

Luego verifica:

- Supabase > Table Editor > `contact_messages`.
- `/admin/mensajes` en producción.

## 12. Dominio propio opcional

En Vercel:

1. Project Settings.
2. Domains.
3. Add Domain.
4. Sigue las instrucciones DNS.
5. Cuando el dominio esté activo, cambia `NEXT_PUBLIC_SITE_URL` al dominio propio.
6. Actualiza Supabase Auth Site URL y Redirect URLs.
7. Redeploy.

## 13. Checklist final

Usa también:

```txt
docs/CHECKLIST_PRODUCCION_SPRINT_05.md
```
