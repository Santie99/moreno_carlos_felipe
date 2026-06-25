# Checklist de producción · Sprint 05

## Antes de deploy

- [ ] `npm install` corre sin errores críticos.
- [ ] `npm run typecheck` pasa.
- [ ] `npm run build` pasa.
- [ ] `.env.local` no está en Git.
- [ ] `node_modules` no está en Git.
- [ ] `.next` no está en Git.
- [ ] `.gitignore` está correcto.
- [ ] Supabase tiene las tablas del proyecto.
- [ ] Supabase tiene seed inicial o datos reales.
- [ ] Existe usuario admin en Supabase Auth.
- [ ] El correo admin coincide con `ADMIN_EMAIL` o `ADMIN_EMAILS`.
- [ ] `admin_users` tiene el correo admin activo.

## Variables en Vercel

- [ ] `NEXT_PUBLIC_SITE_URL`.
- [ ] `NEXT_PUBLIC_SUPABASE_URL`.
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] `ADMIN_EMAIL` o `ADMIN_EMAILS`.
- [ ] `SUPABASE_SERVICE_ROLE_KEY`.

## Después de deploy

- [ ] `/` carga.
- [ ] `/proyectos` carga.
- [ ] `/servicios` carga.
- [ ] `/sobre-mi` carga.
- [ ] `/contacto` carga.
- [ ] `/sitemap.xml` carga.
- [ ] `/robots.txt` carga.
- [ ] `/api/health` responde.
- [ ] `/admin/login` carga.
- [ ] Login admin funciona.
- [ ] Crear proyecto funciona.
- [ ] Editar proyecto funciona.
- [ ] Publicar proyecto lo muestra en `/proyectos`.
- [ ] Destacar proyecto lo muestra en home si tiene orden 1, 2 o 3.
- [ ] Formulario de contacto guarda en Supabase.
- [ ] Mensajes aparecen en `/admin/mensajes`.

## SEO

- [ ] `NEXT_PUBLIC_SITE_URL` usa URL final.
- [ ] Canonical usa dominio final.
- [ ] Open Graph usa dominio final.
- [ ] `robots.txt` bloquea `/admin`.
- [ ] `sitemap.xml` muestra páginas públicas.
- [ ] La home tiene title y description correctos.
- [ ] Cada proyecto tiene title y description.

## Seguridad básica

- [ ] `SUPABASE_SERVICE_ROLE_KEY` no está en frontend.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` no está en GitHub.
- [ ] `/admin` no aparece en navbar público.
- [ ] `/admin` redirige a login si no hay sesión.
- [ ] Un correo no autorizado no puede entrar al admin.
