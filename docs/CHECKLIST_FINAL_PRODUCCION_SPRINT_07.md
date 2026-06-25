# Checklist final de producción

## Local

- [ ] `npm install` ejecutado.
- [ ] `npm run typecheck` pasa.
- [ ] `npm run build` pasa.
- [ ] `/` carga.
- [ ] `/proyectos` carga.
- [ ] `/servicios` carga.
- [ ] `/contacto` carga.
- [ ] `/admin/login` carga.

## Supabase

- [ ] `schema.sql` ya fue ejecutado alguna vez.
- [ ] `sprint-03-admin.sql` ejecutado.
- [ ] `sprint-06-storage.sql` ejecutado.
- [ ] `sprint-07-final.sql` ejecutado.
- [ ] Bucket `portfolio-media` existe.
- [ ] Usuario admin existe en Auth.
- [ ] Correo admin está en `admin_users`.

## Vercel

- [ ] Variables configuradas en Production.
- [ ] `NEXT_PUBLIC_SITE_URL` usa URL final.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` está sin prefijo `NEXT_PUBLIC_`.
- [ ] Redeploy después de cambiar variables.
- [ ] `/api/health` muestra checks correctos.

## Admin

- [ ] Login funciona.
- [ ] Crear proyecto funciona.
- [ ] Editar proyecto funciona.
- [ ] Subir imagen funciona.
- [ ] Cambiar foto de perfil funciona.
- [ ] Cambiar home funciona.
- [ ] Cambiar configuración funciona.
- [ ] Mensajes de contacto se guardan.

## SEO

- [ ] `/robots.txt` carga.
- [ ] `/sitemap.xml` carga.
- [ ] `/admin` no está indexado.
- [ ] Open Graph muestra imagen correcta.
