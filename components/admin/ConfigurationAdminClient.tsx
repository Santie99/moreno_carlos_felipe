"use client";

import { useState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { SiteSettings } from "@/types";

export function ConfigurationAdminClient({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState({
    ...settings,
    keywords: settings.keywords.join("\n")
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const response = await fetch("/api/admin/configuration", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.message || "No se pudo guardar la configuración.");
      return;
    }

    setMessage("Configuración guardada. Algunas metadata pueden requerir redeploy o esperar revalidación.");
  }

  return (
    <form onSubmit={submit} className="glass-card space-y-5 rounded-3xl p-5">
      {message ? <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">{message}</div> : null}
      {error ? <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Site title" value={form.siteTitle} onChange={(value) => setField("siteTitle", value)} />
        <Field label="Canonical URL / dominio principal" value={form.canonicalUrl} onChange={(value) => setField("canonicalUrl", value)} />
        <Textarea label="Site description" value={form.siteDescription} onChange={(value) => setField("siteDescription", value)} />
        <Textarea label="Keywords" value={form.keywords} onChange={(value) => setField("keywords", value)} helper="Una keyword por línea o separada por comas." />
        <ImageUploadField label="OG image global" value={form.ogImageUrl} onChange={(value) => setField("ogImageUrl", value)} folder="og" helper="Imagen global para compartir. Recomendado 1200x630." />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Checkbox label="Disponible freelance" checked={form.freelanceAvailable} onChange={(value) => setField("freelanceAvailable", value)} />
        <Checkbox label="Mostrar /notas" checked={form.notesEnabled} onChange={(value) => setField("notesEnabled", value)} />
        <Checkbox label="Fallback WhatsApp a /contacto" checked={form.whatsappFallbackToContact} onChange={(value) => setField("whatsappFallbackToContact", value)} />
      </div>

      <button type="submit" disabled={saving} className="rounded-2xl bg-cyan-300 px-6 py-3 font-black text-slate-950 hover:bg-cyan-200 disabled:opacity-60">
        {saving ? "Guardando..." : "Guardar configuración"}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, helper }: { label: string; value: string; onChange: (value: string) => void; helper?: string }) {
  return <label className="block"><span className="text-sm font-bold text-white">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300" />{helper ? <span className="mt-1 block text-xs text-slate-500">{helper}</span> : null}</label>;
}

function Textarea({ label, value, onChange, helper }: { label: string; value: string; onChange: (value: string) => void; helper?: string }) {
  return <label className="block"><span className="text-sm font-bold text-white">{label}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} rows={6} className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-cyan-300" />{helper ? <span className="mt-1 block text-xs text-slate-500">{helper}</span> : null}</label>;
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-cyan-300" />{label}</label>;
}
