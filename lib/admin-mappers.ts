import type { Project, ProjectHighlightLevel, ProjectImage, ProjectStatus, Service } from "@/types";

export type DbProject = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  problem: string;
  solution: string;
  target_user: string;
  category: string;
  status: ProjectStatus;
  tags: string[] | null;
  stack: string[] | null;
  features: string[] | null;
  product_decisions: string[] | null;
  technical_challenges: string[] | null;
  learnings: string[] | null;
  potential: string[] | null;
  demo_url: string | null;
  github_url: string | null;
  video_url: string | null;
  cover_image_url: string;
  og_image_url: string | null;
  seo_title: string;
  seo_description: string;
  is_published: boolean;
  is_featured: boolean;
  featured_order: number;
  highlight_level: ProjectHighlightLevel;
};

export type DbProjectImage = {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
  created_at?: string;
};

export type DbService = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  ideal_client: string;
  problem: string;
  deliverables: string[] | null;
  scope: string[] | null;
  exclusions: string[] | null;
  price_from: string;
  price_note: string;
  cta_text: string;
  whatsapp_message?: string | null;
  is_active: boolean;
  sort_order: number;
};

export function mapProject(project: DbProject): Project {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    shortDescription: project.short_description,
    longDescription: project.long_description,
    problem: project.problem,
    solution: project.solution,
    targetUser: project.target_user,
    category: project.category,
    status: project.status,
    tags: project.tags || [],
    stack: project.stack || [],
    features: project.features || [],
    productDecisions: project.product_decisions || [],
    technicalChallenges: project.technical_challenges || [],
    learnings: project.learnings || [],
    potential: project.potential || [],
    demoUrl: project.demo_url || undefined,
    githubUrl: project.github_url || undefined,
    videoUrl: project.video_url || undefined,
    coverImageUrl: project.cover_image_url,
    ogImageUrl: project.og_image_url || undefined,
    seoTitle: project.seo_title,
    seoDescription: project.seo_description,
    isPublished: project.is_published,
    isFeatured: project.is_featured,
    featuredOrder: project.featured_order,
    highlightLevel: project.highlight_level
  };
}

export function mapProjectImage(image: DbProjectImage): ProjectImage {
  return {
    id: image.id,
    projectId: image.project_id,
    imageUrl: image.image_url,
    altText: image.alt_text,
    sortOrder: image.sort_order,
    createdAt: image.created_at
  };
}

export function mapService(service: DbService): Service {
  return {
    id: service.id,
    title: service.title,
    slug: service.slug,
    shortDescription: service.short_description,
    idealClient: service.ideal_client,
    problem: service.problem,
    deliverables: service.deliverables || [],
    scope: service.scope || [],
    exclusions: service.exclusions || [],
    priceFrom: service.price_from,
    priceNote: service.price_note,
    ctaText: service.cta_text,
    whatsappMessage: service.whatsapp_message || undefined,
    isActive: service.is_active,
    sortOrder: service.sort_order
  };
}
