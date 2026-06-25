"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProjectDeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function deleteProject() {
    if (!confirm(`¿Eliminar el proyecto "${title}"? Esta acción no se puede deshacer.`)) return;
    setDeleting(true);
    const response = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    setDeleting(false);
    if (!response.ok) {
      alert("No se pudo eliminar el proyecto.");
      return;
    }
    router.refresh();
  }

  return (
    <button type="button" onClick={deleteProject} disabled={deleting} className="rounded-xl border border-red-400/30 px-3 py-2 text-xs font-bold text-red-100 hover:bg-red-500/10 disabled:opacity-60">
      {deleting ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
