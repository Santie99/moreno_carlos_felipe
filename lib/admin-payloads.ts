import type { ProjectHighlightLevel, ProjectStatus } from "@/types";

const statuses: ProjectStatus[] = ["Idea", "Prototipo", "MVP", "En producción", "En validación", "Pausado"];
const highlightLevels: ProjectHighlightLevel[] = ["principal", "secundario", "experimento"];

export function cleanString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

export function cleanNullableString(value: unknown) {
  const cleaned = cleanString(value);
  return cleaned ? cleaned : null;
}

export function cleanBoolean(value: unknown) {
  return value === true || value === "true";
}

export function cleanNumber(value: unknown, fallback = 100) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function cleanArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function makeSlug(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function projectPayload(body: Record<string, unknown>) {
  const title = cleanString(body.title, "Proyecto sin título");
  const slug = cleanString(body.slug) || makeSlug(title);
  const statusCandidate = cleanString(body.status, "MVP") as ProjectStatus;
  const highlightCandidate = cleanString(body.highlightLevel || body.highlight_level, "secundario") as ProjectHighlightLevel;

  return {
    id: cleanString(body.id) || slug || crypto.randomUUID(),
    title,
    slug,
    short_description: cleanString(body.shortDescription || body.short_description),
    long_description: cleanString(body.longDescription || body.long_description),
    problem: cleanString(body.problem),
    solution: cleanString(body.solution),
    target_user: cleanString(body.targetUser || body.target_user),
    category: cleanString(body.category, "Proyecto web"),
    status: statuses.includes(statusCandidate) ? statusCandidate : "MVP",
    tags: cleanArray(body.tags),
    stack: cleanArray(body.stack),
    features: cleanArray(body.features),
    product_decisions: cleanArray(body.productDecisions || body.product_decisions),
    technical_challenges: cleanArray(body.technicalChallenges || body.technical_challenges),
    learnings: cleanArray(body.learnings),
    potential: cleanArray(body.potential),
    demo_url: cleanNullableString(body.demoUrl || body.demo_url),
    github_url: cleanNullableString(body.githubUrl || body.github_url),
    video_url: cleanNullableString(body.videoUrl || body.video_url),
    cover_image_url: cleanString(body.coverImageUrl || body.cover_image_url, "/projects/funded-os.svg"),
    og_image_url: cleanNullableString(body.ogImageUrl || body.og_image_url),
    seo_title: cleanString(body.seoTitle || body.seo_title, title),
    seo_description: cleanString(body.seoDescription || body.seo_description),
    is_published: cleanBoolean(body.isPublished || body.is_published),
    is_featured: cleanBoolean(body.isFeatured || body.is_featured),
    featured_order: cleanNumber(body.featuredOrder || body.featured_order, 100),
    highlight_level: highlightLevels.includes(highlightCandidate) ? highlightCandidate : "secundario",
    updated_at: new Date().toISOString()
  };
}

export function servicePayload(body: Record<string, unknown>) {
  const title = cleanString(body.title, "Servicio sin título");
  const slug = cleanString(body.slug) || makeSlug(title);

  return {
    id: cleanString(body.id) || slug || crypto.randomUUID(),
    title,
    slug,
    short_description: cleanString(body.shortDescription || body.short_description),
    ideal_client: cleanString(body.idealClient || body.ideal_client),
    problem: cleanString(body.problem),
    deliverables: cleanArray(body.deliverables),
    scope: cleanArray(body.scope),
    exclusions: cleanArray(body.exclusions),
    price_from: cleanString(body.priceFrom || body.price_from),
    price_note: cleanString(body.priceNote || body.price_note),
    cta_text: cleanString(body.ctaText || body.cta_text, "Hablemos"),
    whatsapp_message: cleanNullableString(body.whatsappMessage || body.whatsapp_message),
    is_active: cleanBoolean(body.isActive || body.is_active),
    sort_order: cleanNumber(body.sortOrder || body.sort_order, 100),
    updated_at: new Date().toISOString()
  };
}
