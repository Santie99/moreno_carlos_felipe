"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ImageUploadFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder: "profile" | "projects" | "og" | "uploads";
  helper?: string;
};

export function ImageUploadField({ label, value, onChange, folder, helper }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file?: File) {
    if (!file) return;
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch("/api/admin/media", {
      method: "POST",
      body: formData
    });

    setUploading(false);

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.message || "No se pudo subir la imagen.");
      return;
    }

    if (data.file?.url) onChange(data.file.url);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <label className="block">
        <span className="text-sm font-bold text-white">{label}</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
        />
      </label>

      {value ? (
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
          <div className="relative aspect-[16/9]">
            <Image src={value} alt={`Vista previa de ${label}`} fill sizes="320px" className="object-cover" unoptimized={value.endsWith(".svg")} />
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
          className="hidden"
          onChange={(event) => upload(event.target.files?.[0])}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-full bg-cyan-300 px-4 py-2 text-xs font-black text-slate-950 hover:bg-cyan-200 disabled:opacity-60"
        >
          {uploading ? "Subiendo..." : "Subir imagen"}
        </button>
        {helper ? <span className="text-xs text-slate-500">{helper}</span> : null}
      </div>

      {error ? <p className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-100">{error}</p> : null}
    </div>
  );
}
