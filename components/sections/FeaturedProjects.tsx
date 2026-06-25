import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project } from "@/types";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const featuredProjects = projects
    .filter((project) => project.isPublished && project.isFeatured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder)
    .slice(0, 3);

  return (
    <section className="container-page py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Proyectos principales"
          title="Productos que convierten problemas reales en sistemas utilizables."
          description="Estos proyectos muestran mi forma de pensar: entender un nicho, modelar datos, construir flujos y entregar una herramienta funcional."
        />
        <ButtonLink href="/proyectos" variant="secondary" className="w-fit">Ver todos</ButtonLink>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
