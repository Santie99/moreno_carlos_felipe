# Pruebas Sprint 07

## 1. Pruebas técnicas

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

## 2. Pruebas de admin

- Entrar a `/admin/login`.
- Entrar a `/admin/home`.
- Cambiar una capacidad del hero.
- Guardar.
- Revisar `/`.
- Entrar a `/admin/configuracion`.
- Desactivar `/notas`.
- Guardar.
- Revisar que `/notas` no aparezca en menú y devuelva 404.
- Reactivar `/notas`.

## 3. Pruebas de proyectos

- Crear proyecto borrador.
- Verificar que no aparece en `/proyectos`.
- Publicarlo.
- Verificar que aparece en `/proyectos`.
- Destacarlo con orden 1.
- Verificar que aparece en home.

## 4. Pruebas de servicios

- Editar servicio.
- Cambiar CTA.
- Dejar mensaje WhatsApp vacío.
- Verificar que el botón genera `Hola, quiero [CTA]`.
- Agregar mensaje personalizado.
- Verificar que usa ese mensaje.

## 5. Pruebas de imágenes

- Subir imagen desde `/admin/media`.
- Subir foto desde `/admin/perfil`.
- Subir portada desde proyecto.
- Revisar carga pública.

## 6. Pruebas de producción

- Subir a GitHub.
- Revisar deploy en Vercel.
- Abrir `/api/health`.
- Abrir `/admin/login`.
- Probar CRUD mínimo.
