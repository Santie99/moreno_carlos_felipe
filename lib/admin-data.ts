import { mapProject, mapProjectImage, mapService, type DbProject, type DbProjectImage, type DbService } from "@/lib/admin-mappers";
import { adminSupabaseRest } from "@/lib/admin-supabase";
import { defaultSiteSettings } from "@/lib/data";
import type { ContactMessage, HomeContent, HomeSection, HomeVisibility, Profile, Project, ProjectImage, Service, SiteSettings } from "@/types";

type DbProfile = {
  id: string;
  name: string;
  headline: string;
  short_bio: string;
  long_bio: string;
  profile_image_url: string;
  location: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  x_url: string;
  whatsapp_url: string;
};

type DbSkill = {
  name: string;
  category: string;
  level: Profile["skills"][number]["level"];
  sort_order: number;
};

type DbEducation = {
  title: string;
  provider: string;
  description: string;
  category: string;
  sort_order: number;
};

type DbContactMessage = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  opportunity_type: string;
  budget: string | null;
  link: string | null;
  message: string;
  status: ContactMessage["status"];
  created_at: string;
};



type DbHomeSection = {
  key: string;
  title: string;
  subtitle: string | null;
  content: string | null;
  cta_label: string | null;
  cta_url: string | null;
  is_active: boolean;
  sort_order: number;
};

type DbSiteSetting = {
  key: string;
  value: unknown;
};

const defaultHomeVisibility: HomeVisibility = {
  hero: true,
  featuredProjects: true,
  services: true,
  process: true,
  about: true,
  finalCta: true
};

const defaultHomeSections: Record<string, HomeSection> = {
  hero: { key: "hero", title: "Construyo herramientas web e IA para convertir procesos complejos en sistemas accionables.", subtitle: "Product builder · Web tools · AI applied systems", content: "Diseño y desarrollo productos digitales, dashboards, PWAs y automatizaciones para nichos específicos como trading, finanzas, comunidades y productividad.", ctaLabel: "Ver proyectos", ctaUrl: "/proyectos", isActive: true, sortOrder: 1 },
  about_preview: { key: "about_preview", title: "Construyo mientras aprendo, documento y convierto ideas en producto.", subtitle: "Sobre mí", content: "Me interesa convertir información dispersa, procesos manuales y decisiones complejas en herramientas claras, medibles y fáciles de usar.", ctaLabel: "Leer más", ctaUrl: "/sobre-mi", isActive: true, sortOrder: 5 },
  final_cta: { key: "final_cta", title: "¿Tienes una idea, proceso o problema que quieres convertir en una herramienta digital?", subtitle: "Contacto", content: "Puedo ayudarte a estructurarlo, diseñar el flujo y construir una primera versión funcional con enfoque de producto.", ctaLabel: "Hablemos por WhatsApp", ctaUrl: "whatsapp", isActive: true, sortOrder: 99 }
};

function mapHomeSection(section: DbHomeSection): HomeSection {
  return {
    key: section.key,
    title: section.title,
    subtitle: section.subtitle || undefined,
    content: section.content || undefined,
    ctaLabel: section.cta_label || undefined,
    ctaUrl: section.cta_url || undefined,
    isActive: section.is_active,
    sortOrder: section.sort_order
  };
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function normalizeVisibility(value: unknown): HomeVisibility {
  if (!value || typeof value !== "object" || Array.isArray(value)) return defaultHomeVisibility;
  const record = value as Record<string, unknown>;
  return {
    hero: record.hero !== false,
    featuredProjects: record.featuredProjects !== false,
    services: record.services !== false,
    process: record.process !== false,
    about: record.about !== false,
    finalCta: record.finalCta !== false
  };
}

function normalizeSiteSettings(value: unknown): SiteSettings {
  if (!value || typeof value !== "object" || Array.isArray(value)) return defaultSiteSettings;
  const record = value as Record<string, unknown>;
  return {
    siteTitle: typeof record.siteTitle === "string" && record.siteTitle.trim() ? record.siteTitle : defaultSiteSettings.siteTitle,
    siteDescription: typeof record.siteDescription === "string" && record.siteDescription.trim() ? record.siteDescription : defaultSiteSettings.siteDescription,
    keywords: isStringArray(record.keywords) ? record.keywords : defaultSiteSettings.keywords,
    ogImageUrl: typeof record.ogImageUrl === "string" && record.ogImageUrl.trim() ? record.ogImageUrl : defaultSiteSettings.ogImageUrl,
    canonicalUrl: typeof record.canonicalUrl === "string" && record.canonicalUrl.trim() ? record.canonicalUrl : defaultSiteSettings.canonicalUrl,
    notesEnabled: record.notesEnabled !== false,
    freelanceAvailable: record.freelanceAvailable !== false,
    whatsappFallbackToContact: record.whatsappFallbackToContact !== false
  };
}

export async function getAdminProjects(): Promise<Project[]> {
  const data = await adminSupabaseRest<DbProject[]>("projects", {
    query: "select=*&order=is_featured.desc&order=featured_order.asc.nullslast&order=title.asc"
  });
  return data.map(mapProject);
}

export async function getAdminProject(id: string): Promise<Project | null> {
  const data = await adminSupabaseRest<DbProject[]>("projects", {
    query: `select=*&id=eq.${encodeURIComponent(id)}&limit=1`
  });
  return data[0] ? mapProject(data[0]) : null;
}

export async function getAdminProjectImages(projectId: string): Promise<ProjectImage[]> {
  const data = await adminSupabaseRest<DbProjectImage[]>("project_images", {
    query: `select=*&project_id=eq.${encodeURIComponent(projectId)}&order=sort_order.asc&order=created_at.asc`
  });
  return data.map(mapProjectImage);
}

export async function getAdminServices(): Promise<Service[]> {
  const data = await adminSupabaseRest<DbService[]>("services", {
    query: "select=*&order=sort_order.asc&order=title.asc"
  });
  return data.map(mapService);
}

export async function getAdminService(id: string): Promise<Service | null> {
  const data = await adminSupabaseRest<DbService[]>("services", {
    query: `select=*&id=eq.${encodeURIComponent(id)}&limit=1`
  });
  return data[0] ? mapService(data[0]) : null;
}

export async function getAdminProfile(): Promise<Profile> {
  const [profiles, skills, education] = await Promise.all([
    adminSupabaseRest<DbProfile[]>("profile", { query: "select=*&id=eq.main&limit=1" }),
    adminSupabaseRest<DbSkill[]>("skills", { query: "select=*&order=sort_order.asc" }),
    adminSupabaseRest<DbEducation[]>("education_items", { query: "select=*&order=sort_order.asc" })
  ]);

  const profile = profiles[0];
  if (!profile) {
    throw new Error("Profile row with id=main does not exist. Run supabase/seed.sql first.");
  }

  return {
    name: profile.name,
    headline: profile.headline,
    shortBio: profile.short_bio,
    longBio: profile.long_bio,
    profileImageUrl: profile.profile_image_url,
    location: profile.location,
    email: profile.email,
    githubUrl: profile.github_url,
    linkedinUrl: profile.linkedin_url,
    xUrl: profile.x_url,
    whatsappUrl: profile.whatsapp_url,
    skills: skills.map((skill) => ({ name: skill.name, category: skill.category, level: skill.level })),
    education: education.map((item) => ({ title: item.title, provider: item.provider, description: item.description, category: item.category }))
  };
}

export async function getAdminMessages(): Promise<ContactMessage[]> {
  const data = await adminSupabaseRest<DbContactMessage[]>("contact_messages", {
    query: "select=*&order=created_at.desc"
  });

  return data.map((message) => ({
    id: message.id,
    name: message.name,
    email: message.email,
    company: message.company || undefined,
    opportunityType: message.opportunity_type,
    budget: message.budget || undefined,
    link: message.link || undefined,
    message: message.message,
    status: message.status,
    createdAt: message.created_at
  }));
}


export async function getAdminHomeContent(): Promise<HomeContent> {
  const [sections, settings] = await Promise.all([
    adminSupabaseRest<DbHomeSection[]>("home_sections", { query: "select=*&order=sort_order.asc" }),
    adminSupabaseRest<DbSiteSetting[]>("site_settings", { query: "select=*&key=in.(capabilities,home_visibility)&order=key.asc" })
  ]);

  const byKey = new Map(sections.map((section) => [section.key, mapHomeSection(section)]));
  const capabilities = settings.find((setting) => setting.key === "capabilities")?.value;
  const visibility = settings.find((setting) => setting.key === "home_visibility")?.value;

  return {
    hero: byKey.get("hero") || defaultHomeSections.hero,
    aboutPreview: byKey.get("about_preview") || defaultHomeSections.about_preview,
    finalCta: byKey.get("final_cta") || defaultHomeSections.final_cta,
    capabilities: isStringArray(capabilities) ? capabilities : [],
    visibility: normalizeVisibility(visibility)
  };
}

export async function getAdminSiteSettings(): Promise<SiteSettings> {
  const data = await adminSupabaseRest<DbSiteSetting[]>("site_settings", { query: "select=*&key=eq.global_config&limit=1" });
  return normalizeSiteSettings(data[0]?.value);
}
