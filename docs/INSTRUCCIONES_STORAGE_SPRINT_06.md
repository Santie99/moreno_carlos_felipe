# Instrucciones Supabase Storage · Sprint 06

## 1. Ejecutar SQL

En Supabase:

1. Abre tu proyecto.
2. Ve a `SQL Editor`.
3. Copia y ejecuta:

```txt
supabase/sprint-06-storage.sql
```

Esto crea/configura el bucket:

```txt
portfolio-media
```

## 2. Verificar bucket

En Supabase:

```txt
Storage > Buckets > portfolio-media
```

Debe quedar como bucket público para lectura.

## 3. Variables de entorno

No es obligatorio agregar esta variable porque el sistema usa `portfolio-media` por defecto:

```env
SUPABASE_STORAGE_BUCKET=portfolio-media
```

Si decides usar otro bucket, agrega esa variable tanto en `.env.local` como en Vercel.

## 4. Probar subida desde admin

1. Entra a `/admin/login`.
2. Ve a `/admin/media`.
3. Sube una imagen de prueba.
4. Copia la URL.
5. Abre la URL en otra pestaña.

## 5. Cambiar foto principal

1. Ve a `/admin/perfil`.
2. En `Foto principal`, haz clic en `Subir imagen`.
3. Guarda perfil.
4. Revisa `/` y `/sobre-mi`.

## 6. Cambiar portada de proyecto

1. Ve a `/admin/proyectos`.
2. Edita un proyecto.
3. En `Imagen principal`, sube una imagen.
4. Guarda proyecto.
5. Revisa `/proyectos` y la página individual.

## 7. Agregar galería de proyecto

1. Edita un proyecto existente.
2. Baja a `Imágenes adicionales`.
3. Define alt text y orden.
4. Sube imagen.
5. Revisa la página pública del proyecto.

## 8. Nota importante

Si eliminas una imagen desde `/admin/media` y esa imagen está siendo usada por un proyecto o perfil, dejará de verse. Primero verifica si está en uso.
