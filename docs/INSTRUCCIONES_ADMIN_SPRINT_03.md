# Instrucciones Sprint 03 · Configurar /admin

## 1. Actualiza `.env.local`

Agrega o confirma estas variables:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY
ADMIN_EMAIL=tu-correo-admin@email.com
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
```

`SUPABASE_SERVICE_ROLE_KEY` es privada. No debe empezar con `NEXT_PUBLIC`. No la subas a GitHub.

## 2. Ejecuta SQL de Sprint 03

Si ya ejecutaste `schema.sql` y `seed.sql` en Sprint 02, ejecuta ahora:

```txt
supabase/sprint-03-admin.sql
```

Antes de ejecutarlo, cambia este correo dentro del SQL si usarás otro admin:

```sql
values ('somossantie@gmail.com', 'owner', true)
```

por:

```sql
values ('tu-correo-admin@email.com', 'owner', true)
```

## 3. Crea el usuario en Supabase Auth

En Supabase:

1. Ve a Authentication.
2. Users.
3. Add user.
4. Crea un usuario con el mismo correo de `ADMIN_EMAIL`.
5. Asigna una contraseña.
6. Marca el usuario como confirmado si Supabase te da esa opción.

## 4. Reinicia local

```powershell
Ctrl + C
npm run dev
```

## 5. Entra al admin

```txt
http://localhost:3000/admin/login
```

Usa el correo y contraseña creados en Supabase Auth.
