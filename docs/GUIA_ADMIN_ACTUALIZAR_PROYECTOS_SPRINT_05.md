# Guía para actualizar proyectos desde `/admin`

## Conceptos clave

### Publicado

Controla si el proyecto aparece en la web pública.

- `Publicado = Sí`: aparece en `/proyectos` y puede tener página individual.
- `Publicado = No`: queda como borrador interno.

### Destacado en home

Controla si el proyecto puede aparecer en la sección principal de proyectos de la home.

- Para aparecer en home debe estar publicado y destacado.
- La home muestra máximo 3 destacados.
- Si destacas 4 o más, solo entran los 3 con mejor orden.

### Orden destacado

Controla la prioridad entre destacados.

- `1`: aparece primero.
- `2`: aparece segundo.
- `3`: aparece tercero.
- Números altos quedan después.

## Crear un proyecto nuevo

1. Entra a `/admin/login`.
2. Inicia sesión.
3. Ve a `/admin/proyectos`.
4. Clic en crear proyecto.
5. Llena los campos mínimos:
   - Título.
   - Slug.
   - Categoría.
   - Estado.
   - Resumen corto.
   - Descripción larga.
   - Problema.
   - Solución.
   - Usuario objetivo.
   - Funcionalidades.
   - Stack.
   - SEO title.
   - SEO description.
6. Decide si será publicado.
7. Guarda.

## Publicar sin destacar

Usa esta configuración:

```txt
Publicado: Sí
Destacado en home: No
```

Resultado:

- Aparece en `/proyectos`.
- No aparece en la home.

## Publicar y destacar

Usa esta configuración:

```txt
Publicado: Sí
Destacado en home: Sí
Orden destacado: 1, 2 o 3
```

Resultado:

- Aparece arriba en `/proyectos`.
- Puede aparecer en la home si está dentro de los 3 primeros destacados.

## Cambiar los 3 proyectos principales de la home

1. Ve a `/admin/proyectos`.
2. Edita el proyecto que quieres subir.
3. Marca:

```txt
Publicado: Sí
Destacado en home: Sí
Orden destacado: 1
```

4. Edita los demás destacados y ajusta:

```txt
Orden destacado: 2
Orden destacado: 3
```

5. Desmarca destacados que ya no quieras en la home.

## Crear borrador

Usa:

```txt
Publicado: No
Destacado en home: No
```

Resultado:

- Solo aparece en el admin.
- No aparece en la web pública.

## Editar SEO de un proyecto

En el formulario del proyecto revisa:

- SEO title.
- SEO description.
- Imagen OG si está disponible.
- Slug.

Recomendación:

- El SEO title debe explicar el proyecto en menos de 60 caracteres si es posible.
- La SEO description debe explicar problema, solución y nicho en una frase clara.

## Pruebas después de editar un proyecto

Después de guardar:

1. Abre `/proyectos`.
2. Confirma que el proyecto aparece si está publicado.
3. Abre `/proyectos/slug-del-proyecto`.
4. Confirma que el texto no se rompe.
5. Si está destacado, abre `/` y valida la home.
6. Si no aparece, espera 60 segundos o refresca con `Ctrl + F5`.

## Errores frecuentes

### Lo creé, pero no aparece en `/proyectos`

Causa probable: `Publicado = No`.

### Lo destaqué, pero no aparece en home

Causas probables:

- No está publicado.
- Ya hay 3 destacados con mejor orden.
- Tiene un orden destacado alto.

### Sale en `/proyectos`, pero no en home

Eso es correcto si no está destacado.

### Cambié algo y no lo veo inmediatamente

Puede ser revalidación/caché. Espera 60 segundos o usa `Ctrl + F5`.
