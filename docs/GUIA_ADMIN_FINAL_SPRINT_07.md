# Guía final de administración

## Proyectos

Ruta: `/admin/proyectos`

Para que un proyecto aparezca en la web pública:

1. Crear o editar proyecto.
2. Completar título, slug, descripción corta, descripción larga, problema, solución y usuario objetivo.
3. Activar `Publicado`.
4. Guardar.
5. Revisar `/proyectos`.

Para que aparezca en la home:

1. El proyecto debe estar publicado.
2. Activar `Destacado en home`.
3. Asignar `Orden destacado`.
4. La home muestra máximo 3 destacados.

Regla:

- `Publicado = true` → aparece en `/proyectos`.
- `Publicado = true` + `Destacado = true` → puede aparecer en home.
- `Destacado = true` + `Publicado = false` → no aparece en público.

## Servicios

Ruta: `/admin/servicios`

Cada servicio controla:

- título,
- slug,
- descripción,
- cliente ideal,
- problema,
- entregables,
- alcance,
- exclusiones,
- precio,
- CTA,
- mensaje WhatsApp personalizado,
- estado activo,
- orden.

Si el campo `Mensaje WhatsApp personalizado` está vacío, se genera automáticamente:

```txt
Hola, quiero [CTA]
```

## Home

Ruta: `/admin/home`

Permite editar:

- hero,
- capacidades del hero,
- bloque sobre mí,
- CTA final,
- visibilidad de secciones.

Después de guardar, revisar:

```txt
/
```

Si no ves cambios, usa Ctrl+F5 o espera revalidación.

## Configuración

Ruta: `/admin/configuracion`

Permite editar:

- SEO global,
- keywords,
- OG image,
- canonical URL,
- disponibilidad freelance,
- visibilidad de `/notas`.

## Media

Ruta: `/admin/media`

Permite subir y eliminar imágenes en Supabase Storage. También puedes subir imágenes directamente desde `/admin/perfil` y `/admin/proyectos`.
