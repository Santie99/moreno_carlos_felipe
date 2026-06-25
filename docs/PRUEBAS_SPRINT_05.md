# Pruebas Sprint 05

## Local

```powershell
npm install
npm run typecheck
npm run build
npm run dev
```

Abrir:

```txt
http://localhost:3000
http://localhost:3000/api/health
http://localhost:3000/admin/login
http://localhost:3000/admin/guia
```

## Health check esperado

`/api/health` debe responder JSON.

Si todo está configurado:

```json
{
  "ok": true
}
```

Si falta una variable, debe responder `ok: false` y mostrar cuál check está fallando sin exponer llaves.

## Admin guía

1. Entrar a `/admin/login`.
2. Iniciar sesión.
3. Abrir `/admin/guia`.
4. Verificar que aparecen instrucciones de proyectos y deploy.

## Producción

Después del deploy:

```txt
https://TU-URL-FINAL/api/health
https://TU-URL-FINAL/admin/login
https://TU-URL-FINAL/admin/guia
```

Luego prueba CRUD real de proyectos desde `/admin/proyectos`.
