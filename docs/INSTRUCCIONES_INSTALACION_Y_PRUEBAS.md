# Instrucciones de instalación y pruebas

## 1. Descomprimir ZIP

Descomprime el ZIP en una carpeta, por ejemplo:

```bash
santie-portfolio
```

## 2. Entrar a la carpeta

```bash
cd santie-portfolio
```

## 3. Instalar dependencias

```bash
npm install
```

## 4. Ejecutar en local

```bash
npm run dev
```

Abre:

```bash
http://localhost:3000
```

## 5. Revisar rutas

Prueba manualmente:

- `http://localhost:3000/`
- `http://localhost:3000/proyectos`
- `http://localhost:3000/proyectos/funded-os-traders-fondeo`
- `http://localhost:3000/proyectos/hogar-cfo-finanzas-domesticas`
- `http://localhost:3000/proyectos/work-and-travel-hub-latam`
- `http://localhost:3000/servicios`
- `http://localhost:3000/sobre-mi`
- `http://localhost:3000/contacto`
- `http://localhost:3000/notas`
- `http://localhost:3000/sitemap.xml`
- `http://localhost:3000/robots.txt`

## 6. Pruebas técnicas

Ejecuta:

```bash
npm run typecheck
npm run build
```

Ambas deben finalizar sin errores.

## 7. Pruebas visuales

Revisa:

- Que el hero se vea bien en desktop.
- Que el hero se vea bien en móvil.
- Que la navegación funcione.
- Que las tarjetas de proyectos abran su página individual.
- Que los filtros de `/proyectos` funcionen.
- Que el formulario de contacto muestre el mensaje mock de envío.
- Que la foto placeholder se vea correctamente.

## 8. Cómo cambiar tu foto

Copia tu imagen en:

```bash
public/profile/santie-profile.jpg
```

Luego edita `lib/mock-data.ts`:

```ts
profileImageUrl: "/profile/santie-profile.jpg"
```

Reinicia el servidor si no ves el cambio.
