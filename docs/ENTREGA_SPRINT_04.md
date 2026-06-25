# Entrega Sprint 04 - SEO, polish y orden de proyectos destacados

## Objetivo

Aplicar la fase de SEO/polish inicial y corregir la lógica de orden de proyectos destacados.

## Cambios principales

1. Se agregó `lib/seo.ts` con helpers centralizados para metadata, Open Graph, Twitter cards, canonical URLs y JSON-LD.
2. Se actualizó metadata global en `app/layout.tsx`.
3. Se agregaron metadata/canonical/keywords por página pública:
   - `/`
   - `/proyectos`
   - `/proyectos/[slug]`
   - `/servicios`
   - `/sobre-mi`
   - `/contacto`
   - `/notas`
4. Se mejoró JSON-LD global con `Person` y `WebSite`.
5. Se agregó JSON-LD de `SoftwareApplication` y `BreadcrumbList` en páginas individuales de proyecto.
6. Se agregó JSON-LD de `Service` en `/servicios`.
7. Se mejoró `robots.ts` para bloquear `/admin` y `/api/admin`.
8. Se agregó `noIndex` para layouts/páginas admin.
9. Se corrigió el orden de proyectos publicados:
   - primero destacados,
   - luego por `featured_order`,
   - luego por título.
10. El admin también lista primero los proyectos destacados.
11. La home muestra máximo los primeros 3 destacados para mantener el diseño limpio.
12. Las cards de proyecto ahora muestran una etiqueta clara de `Destacado` cuando aplica.

## Comportamiento esperado del fix de destacados

- Proyecto publicado y no destacado: aparece en `/proyectos`, pero después de los destacados.
- Proyecto publicado y destacado: aparece primero en `/proyectos` según su `featured_order`.
- Proyecto destacado con `featured_order = 1`: debe aparecer antes que destacados con orden 2, 3, 4, etc.
- Home: muestra solo los 3 primeros destacados por orden.

