# Sprint 06 · Media real + WhatsApp funnel + limpieza técnica

## Objetivo

Mejorar conversión y operación visual de la web:

- Gestión real de imágenes con Supabase Storage.
- CTAs directos a WhatsApp usando el WhatsApp guardado en `/admin/perfil`.
- Fallback automático a `/contacto` si el WhatsApp está vacío.
- Limpieza del warning de Next.js 16 cambiando `middleware.ts` por `proxy.ts`.
- Galería pública de imágenes por proyecto.

## Cambios principales

### 1. Supabase Storage

Se agregó integración con el bucket `portfolio-media`.

El bucket debe ser:

- Público para lectura.
- Restringido para escritura.
- Usado para foto de perfil, portadas de proyectos, Open Graph y galería de proyectos.

Archivo SQL nuevo:

```txt
supabase/sprint-06-storage.sql
```

### 2. `/admin/media`

La página dejó de ser placeholder. Ahora permite:

- Subir imágenes.
- Listar imágenes.
- Copiar URL.
- Abrir imagen.
- Eliminar imagen de Storage.

### 3. `/admin/perfil`

El campo de foto principal ahora permite subir imagen directamente a Supabase Storage.

### 4. `/admin/proyectos`

El formulario de proyectos ahora permite:

- Subir imagen principal.
- Subir OG image.
- Subir imágenes adicionales para galería del proyecto.
- Eliminar imágenes adicionales.

### 5. WhatsApp funnel

Se agregó helper central:

```txt
lib/whatsapp.ts
```

Reglas:

- Usa `profile.whatsappUrl`.
- Acepta formatos como `573118773089`, `+57 311...`, `https://wa.me/...` o `https://api.whatsapp.com/send?phone=...`.
- Si el WhatsApp está vacío o inválido, manda a `/contacto`.

CTAs ajustados:

- Home: `Hablemos de una idea` → WhatsApp con `Hola, quiero hablarte de una idea`.
- Final CTA de home → WhatsApp.
- Servicios → WhatsApp con `Hola, quiero [texto del botón]`.
- Contacto directo → botón WhatsApp junto al correo.
- Proyecto individual → CTA contextual por proyecto.

### 6. Limpieza Next.js 16

Se eliminó:

```txt
middleware.ts
```

Se creó:

```txt
proxy.ts
```

Esto limpia el warning de deployment sobre la convención `middleware` deprecada.
