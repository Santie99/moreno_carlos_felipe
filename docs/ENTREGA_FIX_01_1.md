# Fix Sprint 01.1 — Menú móvil, foto, stack y botones de servicios

## Cambios incluidos

1. Se agregó menú móvil funcional en el navbar.
   - Botón `Menú` visible en pantallas pequeñas.
   - Despliega enlaces a Proyectos, Servicios, Sobre mí y Contacto.
   - Cierra el menú al seleccionar una ruta.
   - Marca visualmente la ruta activa.

2. Se cambió la ruta de la foto principal.
   - Antes: `/profile/santie-profile-placeholder.svg`.
   - Ahora: `/profile/santie-profile.jpg`.
   - Esto permite que se muestre tu foto real si el archivo está ubicado en `public/profile/santie-profile.jpg`.

3. Se ajustó la sección “Habilidades y stack”.
   - Ya no muestra el texto “En progreso”.
   - Ahora muestra habilidad + categoría, por ejemplo: `Next.js · Frontend`.

4. Se corrigió la legibilidad de los botones en `/servicios`.
   - Los CTAs de las tarjetas ahora usan botón cyan con texto oscuro, más legible.
   - El botón ocupa ancho completo dentro de la tarjeta para mejorar mobile.

## Validaciones realizadas

Se ejecutaron correctamente:

```bash
npm run typecheck
npm run build
```

Resultado: build exitoso.
