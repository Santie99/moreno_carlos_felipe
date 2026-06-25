# Instrucciones Supabase · Sprint 02

## 1. Crear proyecto

Crea un proyecto nuevo en Supabase.

## 2. Ejecutar SQL

En Supabase > SQL Editor:

1. Ejecuta `supabase/schema.sql`.
2. Ejecuta `supabase/seed.sql`.

## 3. Variables de entorno locales

Crea `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY
ADMIN_EMAIL=somossantie@gmail.com
```

No uses comillas.

## 4. Reiniciar servidor

```bash
Ctrl + C
npm run dev
```

## 5. Verificar lectura desde Supabase

Cambia temporalmente en Supabase algún texto de la tabla `profile`, por ejemplo `headline`, y recarga `/sobre-mi`.

Si cambia, la conexión está funcionando.

## 6. Verificar formulario

Entra a `/contacto`, envía un mensaje y revisa la tabla `contact_messages` en Supabase.

## 7. Importante

Sin `/admin`, cualquier cambio de contenido se hace directamente en tablas de Supabase. En el próximo sprint se hará desde una interfaz privada.
