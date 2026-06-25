import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { getActiveServices, getFeaturedProjects, getHomeContent, getProfile, getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return buildMetadata({
    path: "/",
    title: settings.siteTitle,
    description: settings.siteDescription,
    image: settings.ogImageUrl,
    keywords: settings.keywords
  });
}

export default async function HomePage() {
  const [profile, home, projects, services] = await Promise.all([
    getProfile(),
    getHomeContent(),
    getFeaturedProjects(),
    getActiveServices()
  ]);

  return (
    <>
      {home.visibility.hero ? <Hero profile={profile} capabilities={home.capabilities} content={home.hero} /> : null}
      {home.visibility.featuredProjects ? <FeaturedProjects projects={projects} /> : null}
      {home.visibility.services ? <ServicesPreview services={services} profile={profile} /> : null}
      {home.visibility.process ? <Process /> : null}
      {home.visibility.about ? <AboutPreview profile={profile} content={home.aboutPreview} /> : null}
      {home.visibility.finalCta ? <FinalCTA profile={profile} content={home.finalCta} /> : null}
    </>
  );
}
