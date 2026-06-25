-- Sprint 07 · Cierre operativo final
-- Ejecuta este archivo después de Sprint 06.

alter table public.services
add column if not exists whatsapp_message text;

-- Configuración global editable desde /admin/configuracion.
insert into public.site_settings (key, value)
values (
  'global_config',
  jsonb_build_object(
    'siteTitle', 'Santie Bernal · Product Builder Web & AI',
    'siteDescription', 'Portafolio profesional de Santie Bernal: herramientas web, dashboards, PWAs, automatizaciones e IA aplicada para nichos específicos.',
    'keywords', jsonb_build_array('Santie Bernal', 'desarrollador web Colombia', 'product builder Colombia', 'desarrollador de dashboards', 'automatizaciones con IA', 'MVP web con Supabase'),
    'ogImageUrl', '/projects/funded-os.svg',
    'canonicalUrl', coalesce(current_setting('request.headers', true)::jsonb ->> 'origin', ''),
    'notesEnabled', true,
    'freelanceAvailable', true,
    'whatsappFallbackToContact', true
  )
)
on conflict (key) do nothing;

-- Visibilidad de secciones editable desde /admin/home.
insert into public.site_settings (key, value)
values (
  'home_visibility',
  jsonb_build_object(
    'hero', true,
    'featuredProjects', true,
    'services', true,
    'process', true,
    'about', true,
    'finalCta', true
  )
)
on conflict (key) do nothing;

-- Secciones editables de home.
insert into public.home_sections (key, title, subtitle, content, cta_label, cta_url, is_active, sort_order)
values
  (
    'about_preview',
    'Construyo mientras aprendo, documento y convierto ideas en producto.',
    'Sobre mí',
    'Me interesa convertir información dispersa, procesos manuales y decisiones complejas en herramientas claras, medibles y fáciles de usar.',
    'Leer más',
    '/sobre-mi',
    true,
    5
  ),
  (
    'final_cta',
    '¿Tienes una idea, proceso o problema que quieres convertir en una herramienta digital?',
    'Contacto',
    'Puedo ayudarte a estructurarlo, diseñar el flujo y construir una primera versión funcional con enfoque de producto.',
    'Hablemos por WhatsApp',
    'whatsapp',
    true,
    99
  )
on conflict (key) do nothing;
