# Pruebas Sprint 04

## 1. Validar instalación

```powershell
npm install
npm run dev
```

Abrir:

```txt
http://localhost:3000
```

## 2. Validar rutas públicas

```txt
/
/proyectos
/servicios
/sobre-mi
/contacto
/notas
/sitemap.xml
/robots.txt
```

## 3. Validar orden de destacados

1. Entra a `/admin/proyectos`.
2. Edita o crea un proyecto.
3. Marca:

```txt
Publicado: Sí
Destacado en home: Sí
Orden destacado: 1
```

4. Entra a `/proyectos`.
5. El proyecto debe aparecer arriba de los no destacados.
6. Si hay varios destacados, deben ordenarse por `Orden destacado`.
7. En la home solo deben aparecer los 3 primeros destacados.

## 4. Validar SEO visualmente

En Chrome DevTools, inspecciona `<head>` y revisa que existan:

- `<title>`
- `<meta name="description">`
- canonical
- Open Graph
- Twitter card
- JSON-LD

## 5. Validar robots

Abrir:

```txt
http://localhost:3000/robots.txt
```

Debe bloquear:

```txt
/admin
/api/admin
```

## 6. Validar typecheck

```powershell
npm run typecheck
```

Debe terminar sin errores.
