# Guía final de mantenimiento

## Flujo normal para actualizar contenido

1. Entrar a `/admin/login`.
2. Actualizar perfil, proyectos, servicios, home o configuración.
3. Guardar.
4. Revisar la página pública correspondiente.
5. Si el cambio no aparece, hacer Ctrl+F5.

## Flujo para crear un proyecto nuevo

1. `/admin/proyectos/nuevo`.
2. Completar información base.
3. Subir portada.
4. Revisar SEO title y SEO description.
5. Activar `Publicado` si ya debe salir en público.
6. Activar `Destacado` solo si debe competir por home.
7. Guardar.
8. Abrir `/proyectos` y la página individual.

## Flujo para cambiar la foto principal

1. `/admin/perfil`.
2. Campo `Foto principal`.
3. Subir imagen o pegar URL de Storage.
4. Guardar perfil.
5. Revisar home y `/sobre-mi`.

## Flujo para cambiar WhatsApp

1. `/admin/perfil`.
2. Campo `WhatsApp`.
3. Guardar.
4. Probar botón de home, servicios y contacto.

Formato recomendado:

```txt
57XXXXXXXXXX
```

## Flujo de deploy

1. Probar local:

```bash
npm run typecheck
npm run build
```

2. Subir cambios a GitHub.
3. Vercel despliega automáticamente.
4. Revisar `/api/health`.
5. Revisar `/admin/login`.

## Qué no tocar

No subir ni modificar manualmente:

```txt
.env.local
node_modules
.next
.git
```

No exponer:

```txt
SUPABASE_SERVICE_ROLE_KEY
```
