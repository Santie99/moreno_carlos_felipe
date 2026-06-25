export type ProjectStatus = "Idea" | "Prototipo" | "MVP" | "En producción" | "En validación" | "Pausado";

export type ProjectHighlightLevel = "principal" | "secundario" | "experimento";

export type ProjectImage = {
  id: string;
  projectId: string;
  imageUrl: string;
  altText: string;
  sortOrder: number;
  createdAt?: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  problem: string;
  solution: string;
  targetUser: string;
  category: string;
  status: ProjectStatus;
  tags: string[];
  stack: string[];
  features: string[];
  productDecisions: string[];
  technicalChallenges: string[];
  learnings: string[];
  potential: string[];
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  coverImageUrl: string;
  ogImageUrl?: string;
  seoTitle: string;
  seoDescription: string;
  isPublished: boolean;
  isFeatured: boolean;
  featuredOrder: number;
  highlightLevel: ProjectHighlightLevel;
  images?: ProjectImage[];
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  idealClient: string;
  problem: string;
  deliverables: string[];
  scope: string[];
  exclusions: string[];
  priceFrom: string;
  priceNote: string;
  ctaText: string;
  whatsappMessage?: string;
  isActive: boolean;
  sortOrder: number;
};

export type Profile = {
  name: string;
  headline: string;
  shortBio: string;
  longBio: string;
  profileImageUrl: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  xUrl: string;
  whatsappUrl: string;
  skills: Array<{ name: string; category: string; level: "Base" | "Base aplicada" | "Intermedio" | "Aplicado en proyectos" }>;
  education: Array<{ title: string; provider: string; description: string; category: string }>;
};

export type HomeSection = {
  key: string;
  title: string;
  subtitle?: string;
  content?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  isActive: boolean;
  sortOrder: number;
};

export type HomeVisibility = {
  hero: boolean;
  featuredProjects: boolean;
  services: boolean;
  process: boolean;
  about: boolean;
  finalCta: boolean;
};

export type HomeContent = {
  hero: HomeSection;
  aboutPreview: HomeSection;
  finalCta: HomeSection;
  capabilities: string[];
  visibility: HomeVisibility;
};

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  ogImageUrl: string;
  canonicalUrl: string;
  notesEnabled: boolean;
  freelanceAvailable: boolean;
  whatsappFallbackToContact: boolean;
};

export type ContactMessageInput = {
  name: string;
  email: string;
  company?: string;
  opportunityType: string;
  budget?: string;
  link?: string;
  message: string;
};

export type ContactMessageStatus = "Nuevo" | "Leído" | "Respondido" | "En conversación" | "Cerrado";

export type ContactMessage = ContactMessageInput & {
  id: string;
  status: ContactMessageStatus;
  createdAt: string;
};

export type NavItem = {
  href: string;
  label: string;
};
