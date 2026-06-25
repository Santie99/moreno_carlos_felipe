import type { Profile, Project, Service } from "@/types";

export const profile: Profile = {
  name: "Santie Bernal",
  headline: "Product builder · Web tools · AI applied systems",
  shortBio:
    "Construyo herramientas web e IA para convertir procesos complejos en sistemas simples, medibles y accionables.",
  longBio:
    "Soy un builder técnico en etapa temprana enfocado en crear productos digitales funcionales: dashboards, PWAs, extensiones y automatizaciones para nichos concretos. Trabajo especialmente en problemas donde la información está dispersa y necesita convertirse en una herramienta clara, medible y fácil de usar.",
  profileImageUrl: "/profile/santie-profile.jpeg",
  location: "Colombia",
  email: "sociosylm@gmail.com",
  githubUrl: "https://github.com/Santie99",
  linkedinUrl: "#",
  xUrl: "#",
  whatsappUrl: "#",
  skills: [
    { name: "Next.js", category: "Frontend", level: "Aplicado en proyectos" },
    { name: "TypeScript", category: "Frontend", level: "Base aplicada" },
    { name: "Tailwind CSS", category: "Frontend", level: "Intermedio" },
    { name: "Supabase", category: "Backend/DB", level: "Aplicado en proyectos" },
    { name: "Git & GitHub", category: "Dev workflow", level: "Intermedio" },
    { name: "Vercel", category: "Deploy", level: "Intermedio" },
    { name: "Prompt Engineering", category: "AI", level: "Intermedio" },
    { name: "LLMs", category: "AI", level: "Base aplicada" },
    { name: "Dashboards", category: "Product", level: "Intermedio" },
    { name: "MVP Design", category: "Product", level: "Aplicado en proyectos" }
  ],
  education: [
    {
      title: "Fundamentos de programación e ingeniería de software",
      provider: "Platzi",
      description: "Base conceptual para estructurar proyectos, pensar en lógica y construir software mantenible.",
      category: "Software"
    },
    {
      title: "Python, Git, GitHub y Supabase",
      provider: "Platzi",
      description: "Herramientas técnicas para construir, versionar y conectar productos web con datos reales.",
      category: "Development"
    },
    {
      title: "Prompt Engineering, LLMs, Claude AI, Windsurf AI y AI Academy",
      provider: "Platzi",
      description: "Formación enfocada en IA aplicada, flujos asistidos y herramientas modernas de construcción.",
      category: "AI"
    }
  ]
};

export const projects: Project[] = [
  {
    id: "funded-os",
    title: "FundedOS · Gestión para traders de fondeo",
    slug: "funded-os-traders-fondeo",
    shortDescription:
      "Dashboard para centralizar cuentas de fondeo, métricas, riesgo, retiros y análisis post-trade.",
    longDescription:
      "Aplicativo web para traders que operan cuentas de fondeo y necesitan visualizar su desempeño global, controlar reglas, registrar trades y tomar mejores decisiones sobre riesgo y reinversión.",
    problem:
      "Los traders de fondeo suelen manejar cuentas, reglas, retiros, métricas y estados en herramientas dispersas. Esto dificulta ver el riesgo real y la evolución del negocio de trading.",
    solution:
      "Un sistema centralizado con dashboard, gestión de cuentas, calendario de resultados, registro manual de trades, debriefing asistido por IA, playbook de reglas, reportes y planeación de retiros/reinversión.",
    targetUser: "Traders intradía que operan cuentas de fondeo en futuros, especialmente Nasdaq y otros activos líquidos.",
    category: "SaaS / Trading Dashboard",
    status: "MVP",
    tags: ["Trading", "Dashboard", "SaaS", "IA", "Finanzas"],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel", "Tailwind CSS", "AI-assisted flows"],
    features: [
      "Dashboard global de cuentas",
      "PYG diario, semanal, mensual y acumulado",
      "Win rate global",
      "Calendario de resultados",
      "Registro manual de trades",
      "Debriefing post-trade con IA",
      "Playbook de reglas",
      "Planeación de retiros y reinversión"
    ],
    productDecisions: [
      "Priorizar métricas accionables sobre visualizaciones decorativas.",
      "Separar cuentas, trades y reportes para permitir análisis por activo y periodo.",
      "Usar IA como apoyo de reflexión post-trade, no como sistema de señales."
    ],
    technicalChallenges: [
      "Modelar datos de cuentas, trades, activos y reportes sin perder claridad.",
      "Diseñar una experiencia útil para desktop y móvil.",
      "Preparar el sistema para alertas y reglas por cuenta."
    ],
    learnings: [
      "Un producto financiero necesita claridad antes que complejidad.",
      "Las métricas deben responder preguntas operativas concretas.",
      "El trading puede convertirse en un sistema de gestión, no solo en operaciones aisladas."
    ],
    potential: ["SaaS vertical", "Contenido para traders", "Caso de estudio técnico", "Servicio de dashboard especializado"],
    coverImageUrl: "/projects/funded-os.svg",
    seoTitle: "FundedOS · Dashboard para traders de cuentas de fondeo",
    seoDescription:
      "Proyecto de dashboard para traders de fondeo con métricas, riesgo, retiros, cuentas, trades y debriefing post-trade con IA.",
    isPublished: true,
    isFeatured: true,
    featuredOrder: 1,
    highlightLevel: "principal"
  },
  {
    id: "hogar-cfo",
    title: "Hogar CFO · Finanzas domésticas medibles",
    slug: "hogar-cfo-finanzas-domesticas",
    shortDescription:
      "PWA para gestionar gastos, mercado, presupuestos, históricos de precios y proyectos financieros del hogar.",
    longDescription:
      "Sistema tipo CFO doméstico para convertir las finanzas del hogar en un proceso más claro, medible y planificado.",
    problem:
      "Las familias suelen tomar decisiones financieras con datos dispersos: recibos, mercado, presupuestos, deudas, gastos y proyectos sin una vista centralizada.",
    solution:
      "Una PWA con registros, presupuestos, histórico de precios, comparativos, métricas y planificación de proyectos grandes del hogar.",
    targetUser: "Hogares, parejas o familias que quieren controlar mejor mercado, gastos, presupuestos y decisiones financieras.",
    category: "PWA / Finance Dashboard",
    status: "MVP",
    tags: ["Finanzas", "PWA", "Dashboard", "Hogar", "Supabase"],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel", "Tailwind CSS"],
    features: [
      "Registro de compras y gastos",
      "Presupuestos mensuales",
      "Histórico de precios por producto",
      "Comparativos de mercado",
      "Métricas del hogar",
      "Planeación de proyectos financieros",
      "Acceso por usuario"
    ],
    productDecisions: [
      "Pensar el hogar como una unidad financiera con métricas propias.",
      "Diseñar el registro de mercado como fuente de datos, no solo como lista.",
      "Separar gastos cotidianos de decisiones financieras grandes."
    ],
    technicalChallenges: [
      "Evitar cálculos inconsistentes por fechas o periodos.",
      "Diseñar flujos simples para usuarios no técnicos.",
      "Crear estructuras reutilizables para presupuestos y categorías."
    ],
    learnings: [
      "La gestión doméstica puede beneficiarse de conceptos de análisis financiero.",
      "El histórico de precios convierte compras rutinarias en información estratégica.",
      "Un buen dashboard debe reducir ansiedad, no aumentarla."
    ],
    potential: ["Freelance", "SaaS familiar", "Contenido financiero", "Caso de estudio de producto"],
    coverImageUrl: "/projects/hogar-cfo.svg",
    seoTitle: "Hogar CFO · PWA para finanzas domésticas",
    seoDescription:
      "Proyecto PWA para gestionar gastos del hogar, mercado, presupuestos, histórico de precios y decisiones financieras familiares.",
    isPublished: true,
    isFeatured: true,
    featuredOrder: 2,
    highlightLevel: "principal"
  },
  {
    id: "wat-latam",
    title: "W&T Hub Latam · Comunidad Work and Travel",
    slug: "work-and-travel-hub-latam",
    shortDescription:
      "Plataforma comunitaria para latinos que hacen Work and Travel USA, con destinos, planes, grupos, hacks y pauta.",
    longDescription:
      "Web comunitaria enfocada en resolver necesidades de información, conexión y descubrimiento para participantes latinos de Work and Travel USA.",
    problem:
      "La información sobre destinos, grupos, agencias, planes y hacks de Work and Travel está fragmentada en chats, redes y recomendaciones informales.",
    solution:
      "Una plataforma con reseñas de destinos, planes por ciudad, grupos de WhatsApp, hacks, parches, perfiles, admin de moderación y espacios de pauta para agencias.",
    targetUser: "Participantes o aspirantes de Work and Travel USA de Colombia, Ecuador y México.",
    category: "Community Platform",
    status: "En validación",
    tags: ["Comunidad", "Marketplace", "SEO", "Work and Travel", "UGC"],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel", "Tailwind CSS"],
    features: [
      "Destinos con reseñas",
      "Planes por zona",
      "Grupos de WhatsApp",
      "Hacks de usuarios",
      "Parches post-trabajo",
      "Perfil de usuario",
      "Panel admin de aprobación",
      "Sección de pauta/agencias"
    ],
    productDecisions: [
      "Diseñar la plataforma alrededor de contenido generado por usuarios.",
      "Incluir moderación para mantener calidad y seguridad.",
      "Separar comunidad y monetización desde la arquitectura inicial."
    ],
    technicalChallenges: [
      "Gestionar contenido público creado por usuarios.",
      "Estructurar permisos entre usuarios y administrador.",
      "Pensar en SEO para destinos y necesidades específicas."
    ],
    learnings: [
      "Una comunidad necesita flujos de confianza y moderación.",
      "El contenido útil puede convertirse en adquisición orgánica.",
      "Los nichos con dolor informativo tienen potencial de plataforma."
    ],
    potential: ["SEO", "Comunidad", "Pauta", "Caso de estudio full-stack"],
    coverImageUrl: "/projects/wat-hub.svg",
    seoTitle: "W&T Hub Latam · Plataforma Work and Travel para latinos",
    seoDescription:
      "Proyecto de plataforma comunitaria para Work and Travel USA con reseñas, grupos, hacks, planes y oportunidades para latinos.",
    isPublished: true,
    isFeatured: true,
    featuredOrder: 3,
    highlightLevel: "principal"
  },
  {
    id: "personal-crm",
    title: "Personal CRM · Relaciones gestionadas con intención",
    slug: "personal-crm-relaciones",
    shortDescription:
      "PWA para registrar relaciones, fechas importantes, interacciones y oportunidades de conexión.",
    longDescription:
      "Herramienta personal para gestionar relaciones importantes con seguimiento, recordatorios y oportunidades de generar valor.",
    problem:
      "Las relaciones importantes suelen depender de memoria, chats dispersos o recordatorios informales. Eso hace que se olviden fechas, compromisos y oportunidades.",
    solution:
      "Un CRM personal con contactos, fechas, acciones, interacciones, oportunidades y sugerencias para conectar personas.",
    targetUser: "Personas que quieren cultivar relaciones personales, networking o vínculos profesionales de forma intencional.",
    category: "PWA / Personal Productivity",
    status: "MVP",
    tags: ["Productividad", "CRM", "PWA", "Relaciones", "IA"],
    stack: ["Next.js", "Supabase", "Vercel", "Tailwind CSS"],
    features: [
      "Contactos y relaciones",
      "Fechas importantes",
      "Acciones prioritarias",
      "Interacciones recientes",
      "Oportunidades de conexión",
      "Dashboard personal"
    ],
    productDecisions: [
      "Enfocar el producto en acciones y oportunidades, no solo en contactos.",
      "Diseñar para uso móvil frecuente.",
      "Preparar la lógica para sugerencias asistidas por IA."
    ],
    technicalChallenges: [
      "Crear una experiencia simple para registrar información sensible.",
      "Organizar datos personales sin hacer la app pesada.",
      "Priorizar acciones útiles en el dashboard."
    ],
    learnings: [
      "La productividad personal también puede diseñarse como sistema.",
      "Un buen producto de relaciones debe sentirse humano y no mecánico.",
      "Las sugerencias deben ser discretas y contextuales."
    ],
    potential: ["Productividad personal", "SaaS ligero", "Caso de estudio móvil"],
    coverImageUrl: "/projects/personal-crm.svg",
    seoTitle: "Personal CRM · PWA para gestionar relaciones personales",
    seoDescription:
      "Proyecto de PWA para gestionar relaciones personales, fechas importantes, interacciones y oportunidades de conexión.",
    isPublished: true,
    isFeatured: false,
    featuredOrder: 4,
    highlightLevel: "secundario"
  },
  {
    id: "futures-risk-calculator",
    title: "Futures Risk Voice Calculator",
    slug: "futures-risk-voice-calculator",
    shortDescription:
      "Extensión Chrome para calcular contratos de futuros con entrada por voz y respuesta auditiva.",
    longDescription:
      "Microherramienta para traders que necesitan calcular contratos de forma rápida durante la operativa, usando texto o dictado por voz.",
    problem:
      "Durante una sesión de trading, calcular contratos manualmente puede generar fricción, errores o pérdida de tiempo.",
    solution:
      "Una extensión Chrome que recibe datos escritos o dictados, calcula contratos y entrega respuesta escrita y auditiva.",
    targetUser: "Traders intradía de futuros, especialmente operadores de microcontratos.",
    category: "Chrome Extension",
    status: "Prototipo",
    tags: ["Chrome Extension", "Trading", "Voz", "Productividad"],
    stack: ["JavaScript", "Chrome Extensions", "Web Speech API", "HTML", "CSS"],
    features: ["Entrada por voz", "Cálculo de contratos", "Respuesta escrita", "Respuesta por audio", "Flujo rápido de uso"],
    productDecisions: [
      "Reducir la cantidad de clics necesarios durante una operación.",
      "Usar voz como forma de entrada rápida.",
      "Priorizar claridad numérica sobre diseño complejo."
    ],
    technicalChallenges: [
      "Manejar dictado con palabras variables.",
      "Estandarizar cálculos por contrato.",
      "Crear una experiencia usable desde extensión."
    ],
    learnings: [
      "Las mejores microherramientas resuelven un problema muy específico.",
      "La voz puede reducir fricción en contextos de alta atención.",
      "Una extensión puede ser un buen MVP antes de construir un SaaS."
    ],
    potential: ["Micro-SaaS", "Demo técnica", "Contenido para traders"],
    coverImageUrl: "/projects/futures-calculator.svg",
    seoTitle: "Futures Risk Voice Calculator · Extensión Chrome para traders",
    seoDescription:
      "Extensión Chrome para calcular contratos de futuros con entrada por voz y respuesta auditiva.",
    isPublished: true,
    isFeatured: false,
    featuredOrder: 5,
    highlightLevel: "experimento"
  },
  {
    id: "daily-thinker-ai",
    title: "Daily Thinker AI · Reflexión contextual",
    slug: "daily-thinker-ai-reflexion-contextual",
    shortDescription:
      "Extensión Chrome que adapta enseñanzas de pensadores al contexto, profesión o mood del usuario.",
    longDescription:
      "Experimento de IA y productividad personal que convierte citas o ideas de pensadores en reflexiones accionables para la vida cotidiana.",
    problem:
      "Las frases motivacionales suelen ser genéricas y no conectan con el contexto real del usuario.",
    solution:
      "Una extensión que toma profesión, mood o contexto y adapta una enseñanza relevante a la situación del usuario.",
    targetUser: "Personas interesadas en aprendizaje, reflexión, productividad y desarrollo personal con IA.",
    category: "Chrome Extension / AI",
    status: "Idea",
    tags: ["IA", "Chrome Extension", "Productividad", "Prompt Engineering"],
    stack: ["JavaScript", "Chrome Extensions", "LLMs", "Prompt Engineering"],
    features: ["Citas de pensadores", "Contexto del usuario", "Adaptación con IA", "Reflexión accionable", "Experiencia ligera"],
    productDecisions: [
      "Evitar contenido motivacional genérico.",
      "Usar IA para contextualizar, no para producir texto vacío.",
      "Mantener una experiencia rápida tipo extensión."
    ],
    technicalChallenges: [
      "Crear prompts consistentes.",
      "Evitar respuestas repetitivas o exageradas.",
      "Diseñar una UI mínima pero útil."
    ],
    learnings: [
      "La personalización es el valor diferencial en contenido asistido por IA.",
      "Un microproducto puede probar una hipótesis de comportamiento.",
      "La utilidad importa más que la cantidad de texto generado."
    ],
    potential: ["Experimento de IA", "Contenido", "Productividad personal"],
    coverImageUrl: "/projects/daily-thinker.svg",
    seoTitle: "Daily Thinker AI · Extensión de reflexión personalizada con IA",
    seoDescription:
      "Extensión Chrome experimental que adapta enseñanzas de pensadores al contexto y mood del usuario con IA.",
    isPublished: true,
    isFeatured: false,
    featuredOrder: 6,
    highlightLevel: "experimento"
  }
];

export const services: Service[] = [
  {
    id: "mvp-web",
    title: "MVP web con login y base de datos",
    slug: "mvp-web-login-base-datos",
    shortDescription: "Primera versión funcional de una idea digital con usuarios, datos y dashboard básico.",
    idealClient: "Emprendedores, traders, profesionales independientes o comunidades que quieren validar una idea.",
    problem: "Hay una idea clara, pero todavía no existe una herramienta funcional que pueda probarse con usuarios reales.",
    deliverables: ["Arquitectura inicial", "Flujo principal", "Login", "Base de datos", "Dashboard básico", "Deploy"],
    scope: ["MVP acotado", "1 a 3 flujos principales", "Diseño responsive", "Documentación de uso"],
    exclusions: ["Apps móviles nativas", "IA avanzada personalizada", "Integraciones enterprise complejas"],
    priceFrom: "Desde 2.5M COP",
    priceNote: "El precio depende de alcance, número de flujos y complejidad de datos.",
    ctaText: "Construir un MVP",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "dashboard-operativo",
    title: "Dashboard operativo",
    slug: "dashboard-operativo",
    shortDescription: "Sistema visual para convertir registros dispersos en métricas claras y accionables.",
    idealClient: "Negocios o personas que manejan datos en Excel, Notion, WhatsApp o registros manuales.",
    problem: "Los datos existen, pero no hay visibilidad clara para tomar decisiones.",
    deliverables: ["Modelo de datos", "Pantalla de registros", "Métricas clave", "Filtros", "Visualización responsive"],
    scope: ["Dashboard básico o medio", "Indicadores priorizados", "Carga manual de datos", "Deploy web"],
    exclusions: ["BI corporativo avanzado", "Integraciones masivas", "Migraciones complejas"],
    priceFrom: "Desde 1.2M COP",
    priceNote: "Ideal para una primera versión de control interno.",
    ctaText: "Diseñar un dashboard",
    isActive: true,
    sortOrder: 2
  },
  {
    id: "landing-estrategica",
    title: "Landing page estratégica",
    slug: "landing-page-estrategica",
    shortDescription: "Página comercial clara para explicar, vender o validar una oferta.",
    idealClient: "Profesionales, marcas personales, productos en validación o servicios especializados.",
    problem: "La oferta existe, pero no está comunicada de forma clara ni orientada a conversión.",
    deliverables: ["Estructura comercial", "Copy base", "Diseño responsive", "Formulario/contacto", "SEO inicial"],
    scope: ["Landing de 1 página", "Secciones clave", "Optimización mobile", "Deploy"],
    exclusions: ["E-commerce completo", "CMS complejo", "Branding visual completo"],
    priceFrom: "Desde 700k COP",
    priceNote: "Puede escalar si incluye copy avanzado, múltiples páginas o integraciones.",
    ctaText: "Crear una landing",
    isActive: true,
    sortOrder: 3
  },
  {
    id: "automatizacion-ia",
    title: "Automatización simple con IA",
    slug: "automatizacion-simple-ia",
    shortDescription: "Flujos asistidos por IA para reducir tareas repetitivas de texto, análisis o clasificación.",
    idealClient: "Profesionales o equipos pequeños que repiten tareas manuales y quieren sistematizarlas.",
    problem: "Hay procesos que consumen tiempo y podrían resolverse con formularios, prompts, plantillas o IA aplicada.",
    deliverables: ["Diagnóstico de flujo", "Prompt system", "Interfaz simple", "Documentación", "Prueba de uso"],
    scope: ["Automatización acotada", "Un flujo principal", "Uso de herramientas existentes o integración simple"],
    exclusions: ["Modelos entrenados desde cero", "Agentes autónomos críticos", "Procesos legales/médicos sin revisión humana"],
    priceFrom: "Desde 600k COP",
    priceNote: "El alcance se define por número de pasos y sensibilidad del proceso.",
    ctaText: "Automatizar un flujo",
    isActive: true,
    sortOrder: 4
  }
];

export const capabilities = [
  "PWAs con login y datos",
  "Dashboards accionables",
  "MVPs con Supabase y Vercel",
  "Extensiones Chrome",
  "IA aplicada a flujos reales",
  "SEO y páginas de producto"
];
