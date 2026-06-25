# Entrega Sprint 01 · Fase 1 + Fase 2

## Objetivo

Construir la primera versión completa del portafolio profesional con datos mock, diseño llamativo, rutas públicas y base preparada para Supabase + `/admin` en futuras fases.

## Cambios realizados

### Base técnica

- Proyecto Next.js con App Router.
- TypeScript configurado.
- Tailwind CSS v4 configurado.
- Estructura de carpetas limpia.
- Alias `@/*` configurado.
- `.env.example` agregado.
- `.gitignore` agregado.

### Diseño público

- Diseño oscuro premium, tecnológico y responsive.
- Hero profesional con espacio para foto.
- Tarjetas de capacidades.
- Sección de proyectos destacados.
- Sección de servicios.
- Sección de proceso de trabajo.
- Sección sobre mí.
- CTA final de contacto.

### Rutas públicas

- Home `/`.
- Proyectos `/proyectos`.
- Detalle de proyecto `/proyectos/[slug]`.
- Servicios `/servicios`.
- Sobre mí `/sobre-mi`.
- Contacto `/contacto`.
- Notas `/notas` como base futura de blog.

### Datos mock

Se crearon datos iniciales para:

1. FundedOS · Gestión para traders de fondeo.
2. Hogar CFO · Finanzas domésticas medibles.
3. W&T Hub Latam · Comunidad Work and Travel.
4. Personal CRM.
5. Futures Risk Voice Calculator.
6. Daily Thinker AI.

### SEO base

- Metadata global.
- Metadata por rutas principales.
- Metadata dinámica para páginas de proyectos.
- `sitemap.xml` dinámico.
- `robots.txt`.
- JSON-LD tipo Person.
- Open Graph base.

### Componentes creados

- Navbar.
- Footer.
- Hero.
- FeaturedProjects.
- ProjectCard.
- ProjectFilters.
- ServiceCard.
- ServicesPreview.
- Process.
- AboutPreview.
- FinalCTA.
- ContactForm mock.
- UI: ButtonLink, Badge, SectionHeader.

## Validaciones ejecutadas

```bash
npm run typecheck
npm run build
```

Ambas pasaron correctamente.
