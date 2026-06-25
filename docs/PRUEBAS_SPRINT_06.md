# Pruebas Sprint 06

## Pruebas locales

Ejecuta:

```powershell
npm install
npm run typecheck
npm run build
npm run dev
```

## Pruebas de rutas públicas

Revisa:

```txt
/
/proyectos
/proyectos/[slug]
/servicios
/contacto
/api/health
```

## Pruebas admin

Revisa:

```txt
/admin/login
/admin/media
/admin/perfil
/admin/proyectos
/admin/guia
```

## Pruebas Supabase Storage

1. Ejecuta `supabase/sprint-06-storage.sql`.
2. Entra a `/admin/media`.
3. Sube imagen.
4. Copia URL.
5. Abre URL.
6. Elimina imagen de prueba.

## Prueba foto de perfil

1. Entra a `/admin/perfil`.
2. Sube una foto.
3. Guarda perfil.
4. Revisa home y sobre mí.

## Prueba portada de proyecto

1. Edita un proyecto.
2. Sube `Imagen principal`.
3. Guarda.
4. Revisa `/proyectos`.
5. Revisa `/proyectos/[slug]`.

## Prueba galería de proyecto

1. Edita un proyecto existente.
2. Sube una imagen adicional.
3. Revisa que aparezca en la página individual.
4. Elimínala desde el manager del proyecto.

## Prueba WhatsApp

Con WhatsApp configurado en `/admin/perfil`:

- Home > `Hablemos de una idea` debe abrir WhatsApp.
- `/servicios` > cada CTA debe abrir WhatsApp con `Hola, quiero [CTA]`.
- `/contacto` debe mostrar botón WhatsApp.
- Proyecto individual debe abrir WhatsApp con mensaje contextual.

Luego borra temporalmente WhatsApp en `/admin/perfil`, guarda y prueba:

- Los CTAs deben enviar a `/contacto`.
