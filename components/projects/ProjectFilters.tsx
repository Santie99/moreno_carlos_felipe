"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types";

const filters = ["Todos", "SaaS", "PWA", "Dashboard", "Chrome Extension", "IA", "Comunidad", "Finanzas", "Trading", "Productividad"];

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Todos") return projects;
    const normalized = activeFilter.toLowerCase();
    return projects.filter((project) => {
      const haystack = [project.category, ...project.tags].join(" ").toLowerCase();
      return haystack.includes(normalized) || (activeFilter === "Comunidad" && haystack.includes("community"));
    });
  }, [activeFilter, projects]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`focus-ring rounded-full border px-4 py-2 text-sm font-bold transition ${
              activeFilter === filter
                ? "border-cyan-300 bg-cyan-300 text-slate-950"
                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="glass-card rounded-[2rem] p-8 text-center text-slate-300">No hay proyectos con este filtro.</div>
      ) : null}
    </div>
  );
}
