"use client";

import { useEffect, useState } from "react";
import { ProjectForm } from "@/components/admin/ProjectForm";
import type { Project } from "@/types";

export function ProjectEditLoader({ id }: { id: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/projects/${id}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Proyecto no encontrado.");
        setProject(data.project);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="glass-card rounded-3xl p-8 text-slate-300">Cargando proyecto...</div>;
  if (error || !project) return <div className="glass-card rounded-3xl p-8 text-red-100">{error || "Proyecto no encontrado."}</div>;
  return <ProjectForm project={project} />;
}
