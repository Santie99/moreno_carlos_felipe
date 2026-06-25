import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPublishedProjects } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Proyectos",
  description:
    "Proyectos de Santie Bernal: dashboards, PWAs, extensiones Chrome, IA aplicada, finanzas, trading y comunidades digitales.",
  path: "/proyectos",
  keywords: ["portfolio desarrollador web", "proyectos Next.js", "dashboards Supabase", "PWAs Colombia"]
});

export default async function ProjectsPage() {
  const publishedProjects = await getPublishedProjects();

  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeader
        eyebrow="Portafolio"
        title="Proyectos construidos alrededor de problemas reales."
        description="Una colección de productos, sistemas y experimentos que muestran cómo convierto procesos dispersos en herramientas digitales funcionales."
      />
      <div className="mt-12">
        <ProjectFilters projects={publishedProjects} />
      </div>
    </section>
  );
}
