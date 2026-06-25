"use client";

import { useState } from "react";
import type { HomeContent, HomeSection, HomeVisibility } from "@/types";

const keys: Array<keyof HomeVisibility> = ["hero", "featuredProjects", "services", "process", "about", "finalCta"];
const labels: Record<keyof HomeVisibility, string> = {
  hero: "Hero",
  featuredProjects: "Proyectos destacados",
  services: "Servicios",
  process: "Proceso",
  about: "Sobre mí",
  finalCta: "CTA final"
};

export function HomeAdminClient({ home }: { home: HomeContent }) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [hero, setHero] = useState(home.hero);
  const [aboutPreview, setAboutPreview] = useState(home.aboutPreview);
  const [finalCta, setFinalCta] = useState(home.finalCta);
  const [capabilities, setCapabilities] = useState(home.capabilities.join("\n"));
  const [visibility, setVisibility] = useState(home.visibility);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const response = await fetch("/api/admin/home", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hero, aboutPreview, finalCta, capabilities, visibility })
    });

    setSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.message || "No se pudo guardar la home.");
      return;
    }

    setMessage("Home actualizada. Revisa la página pública y haz Ctrl+F5 si ves caché.");
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {message ? <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">{message}</div> : null}
      {error ? <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div> : null}

      <section className="glass-card rounded-3xl p-5">
        <h2 className="text-lg font-black text-white">Secciones visibles</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {keys.map((key) => (
            <label key={key} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white">
              <input type="checkbox" checked={visibility[key]} onChange={(event) => setVisibility((current) => ({ ...current, [key]: event.target.checked }))} className="h-4 w-4 accent-cyan-300" />
              {labels[key]}
            </label>
          ))}
        </div>
      </section>

      <HomeSectionForm title="Hero" value={hero} onChange={setHero} />
      <HomeSectionForm title="Sobre mí en home" value={aboutPreview} onChange={setAboutPreview} />
      <HomeSectionForm title="CTA final" value={finalCta} onChange={setFinalCta} />

      <section className="glass-card rounded-3xl p-5">
        <h2 className="text-lg font-black text-white">Capacidades del hero</h2>
        <p className="mt-2 text-sm text-slate-400">Escribe una capacidad por línea. En la home se muestran las primeras cuatro.</p>
        <textarea value={capabilities} onChange={(event) => setCapabilities(event.target.value)} rows={8} className="mt-4 w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-cyan-300" />
      </section>

      <button type="submit" disabled={saving} className="rounded-2xl bg-cyan-300 px-6 py-3 font-black text-slate-950 hover:bg-cyan-200 disabled:opacity-60">
        {saving ? "Guardando..." : "Guardar home"}
      </button>
    </form>
  );
}

function HomeSectionForm({ title, value, onChange }: { title: string; value: HomeSection; onChange: (value: HomeSection) => void }) {
  const set = (key: keyof HomeSection, next: string | boolean | number) => onChange({ ...value, [key]: next });

  return (
    <section className="glass-card rounded-3xl p-5">
      <h2 className="text-lg font-black text-white">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Eyebrow / subtítulo superior" value={value.subtitle || ""} onChange={(next) => set("subtitle", next)} />
        <Field label="CTA label" value={value.ctaLabel || ""} onChange={(next) => set("ctaLabel", next)} />
        <Field label="CTA URL" value={value.ctaUrl || ""} onChange={(next) => set("ctaUrl", next)} helper="Usa /proyectos, /contacto o whatsapp para el CTA final." />
        <Field label="Orden interno" value={String(value.sortOrder)} type="number" onChange={(next) => set("sortOrder", Number(next))} />
        <Textarea label="Título" value={value.title} onChange={(next) => set("title", next)} />
        <Textarea label="Texto / descripción" value={value.content || ""} onChange={(next) => set("content", next)} />
      </div>
      <label className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white">
        <input type="checkbox" checked={value.isActive} onChange={(event) => set("isActive", event.target.checked)} className="h-4 w-4 accent-cyan-300" />
        Sección activa en datos
      </label>
    </section>
  );
}

function Field({ label, value, onChange, helper, type = "text" }: { label: string; value: string; onChange: (value: string) => void; helper?: string; type?: string }) {
  return <label className="block"><span className="text-sm font-bold text-white">{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300" />{helper ? <span className="mt-1 block text-xs text-slate-500">{helper}</span> : null}</label>;
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block"><span className="text-sm font-bold text-white">{label}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-cyan-300" /></label>;
}
