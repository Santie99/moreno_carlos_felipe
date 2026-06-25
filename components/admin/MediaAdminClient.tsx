"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type MediaFile = {
  name: string;
  path: string;
  url: string;
  size?: number;
  mimeType?: string;
  updatedAt?: string;
};

const folders = ["profile", "projects", "og", "uploads"] as const;

function formatBytes(bytes?: number) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaAdminClient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [folder, setFolder] = useState<(typeof folders)[number]>("projects");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadFiles() {
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/media");
    const data = await response.json().catch(() => ({}));
    setLoading(false);

    if (!response.ok) {
      setError(data.message || "No se pudieron cargar las imágenes.");
      return;
    }

    setFiles(data.files || []);
  }

  useEffect(() => {
    loadFiles();
  }, []);

  async function upload(file?: File) {
    if (!file) return;
    setUploading(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch("/api/admin/media", { method: "POST", body: formData });
    const data = await response.json().catch(() => ({}));
    setUploading(false);

    if (!response.ok) {
      setError(data.message || "No se pudo subir la imagen.");
      return;
    }

    setMessage("Imagen subida correctamente.");
    await loadFiles();
  }

  async function deleteFile(path: string) {
    if (!confirm("¿Eliminar esta imagen de Supabase Storage? Si está en uso, dejará de verse.")) return;
    setError("");
    setMessage("");

    const response = await fetch("/api/admin/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.message || "No se pudo eliminar la imagen.");
      return;
    }

    setMessage("Imagen eliminada.");
    await loadFiles();
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setMessage("URL copiada al portapapeles.");
  }

  return (
    <div className="space-y-6">
      <section className="glass-card rounded-3xl p-6">
        <h2 className="text-xl font-black text-white">Subir imagen</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Las imágenes se guardan en el bucket público de lectura <code className="rounded bg-white/10 px-1">portfolio-media</code>. Solo el admin puede subirlas desde esta ruta.</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <select value={folder} onChange={(event) => setFolder(event.target.value as typeof folder)} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300">
            {folders.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif" className="hidden" onChange={(event) => upload(event.target.files?.[0])} />
          <button type="button" disabled={uploading} onClick={() => inputRef.current?.click()} className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 hover:bg-cyan-200 disabled:opacity-60">
            {uploading ? "Subiendo..." : "Elegir y subir imagen"}
          </button>
        </div>
        {message ? <p className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-sm text-emerald-100">{message}</p> : null}
        {error ? <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">{error}</p> : null}
      </section>

      <section className="glass-card rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-white">Biblioteca de imágenes</h2>
            <p className="mt-2 text-sm text-slate-400">Copia una URL para pegarla manualmente o usa los botones de subida dentro de Perfil y Proyectos.</p>
          </div>
          <button type="button" onClick={loadFiles} className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-slate-200 hover:border-cyan-300/50">Actualizar</button>
        </div>

        {loading ? <p className="mt-6 text-sm text-slate-400">Cargando imágenes...</p> : null}
        {!loading && files.length === 0 ? <p className="mt-6 text-sm text-slate-400">No hay imágenes en el bucket todavía.</p> : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {files.map((file) => (
            <article key={file.path} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="relative aspect-video bg-slate-950">
                <Image src={file.url} alt={file.name} fill sizes="360px" className="object-cover" unoptimized={file.url.endsWith(".svg")} />
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <p className="break-all text-sm font-black text-white">{file.path}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatBytes(file.size)} · {file.mimeType || "tipo desconocido"}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => copyUrl(file.url)} className="rounded-full bg-cyan-300 px-3 py-2 text-xs font-black text-slate-950 hover:bg-cyan-200">Copiar URL</button>
                  <a href={file.url} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-slate-200 hover:border-cyan-300/50">Abrir</a>
                  <button type="button" onClick={() => deleteFile(file.path)} className="rounded-full border border-red-400/30 px-3 py-2 text-xs font-bold text-red-100 hover:bg-red-500/10">Eliminar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
