import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className="glass-card group overflow-hidden rounded-4xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35">
      <Link href={`/proyectos/${project.slug}`} className="focus-ring block rounded-4xl" aria-label={`Ver proyecto ${project.title}`}>
        <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
          <Image
            src={project.coverImageUrl}
            alt={`Vista conceptual de ${project.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {project.isFeatured ? <Badge>Destacado</Badge> : null}
            <Badge>{project.status}</Badge>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">{project.category}</p>
          <h3 className="mt-3 text-2xl font-black leading-tight text-white">{project.title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">{project.shortDescription}</p>
          {!compact ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="rounded-full bg-white/8 px-3 py-1 text-xs font-semibold text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
