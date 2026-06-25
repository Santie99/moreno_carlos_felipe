import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import type { Profile, Project, Service } from "@/types";

export const siteConfig = {
  name: "Santie Bernal",
  title: "Santie Bernal · Product Builder Web & AI",
  description:
    "Portafolio profesional de Santie Bernal: herramientas web, dashboards, PWAs, automatizaciones e IA aplicada para nichos específicos.",
  locale: "es_CO",
  creator: "Santie Bernal",
  defaultOgImage: "/projects/funded-os.svg",
  keywords: [
    "Santie Bernal",
    "desarrollador web Colombia",
    "product builder Colombia",
    "desarrollador de dashboards",
    "automatizaciones con IA",
    "MVP web con Supabase",
    "desarrollo web con IA",
    "portafolio desarrollador web",
    "Next.js",
    "Supabase",
    "Vercel"
  ]
};

type BuildMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.defaultOgImage,
  type = "website",
  noIndex = false,
  keywords = []
}: BuildMetadataOptions = {}): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false
          }
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        },
    openGraph: {
      title: title || siteConfig.title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 760,
          alt: title || siteConfig.title
        }
      ],
      locale: siteConfig.locale,
      type
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteConfig.title,
      description,
      images: [imageUrl],
      creator: "@somossantie"
    }
  };
}

export function personSchema(profile: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: absoluteUrl("/"),
    image: absoluteUrl(profile.profileImageUrl),
    email: profile.email,
    jobTitle: "Product builder and web developer",
    description: profile.shortBio,
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO"
    },
    knowsAbout: [
      "Web development",
      "Dashboards",
      "Product design",
      "AI tools",
      "Supabase",
      "Next.js",
      "Automation",
      "Progressive Web Apps"
    ],
    sameAs: [profile.githubUrl, profile.linkedinUrl, profile.xUrl].filter((url) => url && url !== "#")
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    inLanguage: "es-CO",
    description: siteConfig.description,
    publisher: {
      "@type": "Person",
      name: siteConfig.name
    }
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    url: absoluteUrl(`/proyectos/${project.slug}`),
    image: absoluteUrl(project.ogImageUrl || project.coverImageUrl),
    description: project.seoDescription || project.shortDescription,
    applicationCategory: project.category,
    operatingSystem: "Web",
    creator: {
      "@type": "Person",
      name: siteConfig.name,
      url: absoluteUrl("/")
    },
    keywords: [...project.tags, ...project.stack].join(", ")
  };
}

export function servicesSchema(services: Service[]) {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    url: absoluteUrl(`/servicios#${service.slug}`),
    description: service.shortDescription,
    provider: {
      "@type": "Person",
      name: siteConfig.name,
      url: absoluteUrl("/")
    },
    areaServed: "CO"
  }));
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
