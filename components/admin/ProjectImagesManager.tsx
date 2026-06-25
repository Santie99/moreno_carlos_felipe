"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/types";

export function ProjectImagesManager({ projectId }: { projectId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [altText, setAltText] = useState("Imagen del proyecto");
  const [sortOrder, setSortOrder] = useState(100);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadImages() {
    setLoading(true);
    setError("");
    const response = await fetch(`/api/admin/projects/${projectId}/images`);
    const data = await response.json().catch(() => ({}));
    setLoading(false);

    if (!response.ok) {
      setError(data.message || "No se pudieron cargar las imágenes.");
      return;
    }

    setImages(data.images || []);
  }

  useEffect(() => {
    loadImages();
  }, [projectId]);

  async function upload(file?: File) {
    if (!file) return;
    setUploading(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", altText);
    formData.append("sortOrder", String(sortOrder));

    const response = await fetch(`/api/admin/projects/${projectId}/images`, { method: "POST", body: formData });
    const data = await response.json().catch(() => ({}));
    setUploading(false);

    if (!response.ok) {
      setError(data.message || "No se pudo subir la imagen.");
      return;
    }

    setMessage("Imagen agregada al proyecto.");
    await loadImages();
  }

  async function remove(imageId: string) {
    if (!confirm("¿Eliminar esta imagen del proyecto y de Storage?")) return;
    setError("");
    setMessage("");

    const response = await fetch(`/api/admin/project-images/${imageId}`, { method: "DELETE" });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.message || "No se pudo eliminar la imagen.");
      return;
    }

    setMessage("Imagen eliminada.");
    await loadImages();
  }

  return (
    <section className="glass-card rounded-3xl p-5">
      <h2 className="text-lg font-black text-white">Imágenes adicionales</h2>
      <p className="mt-2 text-sm text-slate-400">Estas imágenes aparecen como galería dentro de la página pública del proyecto.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_160px_auto] md:items-end">
        <label className="block">
          <span className="text-sm font-bold text-white">Alt text</span>
          <input value={altText} onChange={(event) => setAltText(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300" />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-white">Orden</span>
          <input type="number" value={sortOrder} onChange={(event) => setSortOrder(Number(event.target.value))} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300" />
        </label>
        <div>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif" className="hidden" onChange={(event) => upload(event.target.files?.[0])} />
          <button type="button" disabled={uploading} onClick={() => inputRef.current?.click()} className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 hover:bg-cyan-200 disabled:opacity-60">
            {uploading ? "Subiendo..." : "Subir imagen"}
          </button>
        </div>
      </div>

      {message ? <p className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-sm text-emerald-100">{message}</p> : null}
      {error ? <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">{error}</p> : null}

      {loading ? <p className="mt-6 text-sm text-slate-400">Cargando imágenes...</p> : null}
      {!loading && images.length === 0 ? <p className="mt-6 text-sm text-slate-400">Este proyecto aún no tiene imágenes adicionales.</p> : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {images.map((image) => (
          <article key={image.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="relative aspect-video bg-slate-950">
              <Image src={image.imageUrl} alt={image.altText} fill sizes="360px" className="object-cover" unoptimized={image.imageUrl.endsWith(".svg")} />
            </div>
            <div className="space-y-3 p-4">
              <div>
                <p className="text-sm font-black text-white">Orden {image.sortOrder}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{image.altText}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={image.imageUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-slate-200 hover:border-cyan-300/50">Abrir</a>
                <button type="button" onClick={() => remove(image.id)} className="rounded-full border border-red-400/30 px-3 py-2 text-xs font-bold text-red-100 hover:bg-red-500/10">Eliminar</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
