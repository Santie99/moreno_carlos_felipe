"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { Profile } from "@/types";

export function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: profile.name,
    headline: profile.headline,
    shortBio: profile.shortBio,
    longBio: profile.longBio,
    profileImageUrl: profile.profileImageUrl,
    location: profile.location,
    email: profile.email,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
    xUrl: profile.xUrl,
    whatsappUrl: profile.whatsappUrl
  });

  function setField(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const response = await fetch("/api/admin/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.message || "No se pudo guardar el perfil.");
      return;
    }

    router.refresh();
  }

  return (
    <form onSubmit={submit} className="glass-card space-y-5 rounded-3xl p-5">
      {error ? <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nombre" value={form.name} onChange={(value) => setField("name", value)} />
        <Field label="Headline" value={form.headline} onChange={(value) => setField("headline", value)} />
        <Textarea label="Bio corta" value={form.shortBio} onChange={(value) => setField("shortBio", value)} />
        <Textarea label="Bio larga" value={form.longBio} onChange={(value) => setField("longBio", value)} />
        <ImageUploadField label="Foto principal" value={form.profileImageUrl} onChange={(value) => setField("profileImageUrl", value)} folder="profile" helper="Sube tu foto al bucket portfolio-media o pega una URL existente." />
        <Field label="Ubicación" value={form.location} onChange={(value) => setField("location", value)} />
        <Field label="Email público" value={form.email} onChange={(value) => setField("email", value)} />
        <Field label="GitHub" value={form.githubUrl} onChange={(value) => setField("githubUrl", value)} />
        <Field label="LinkedIn" value={form.linkedinUrl} onChange={(value) => setField("linkedinUrl", value)} />
        <Field label="X" value={form.xUrl} onChange={(value) => setField("xUrl", value)} />
        <Field label="WhatsApp" value={form.whatsappUrl} onChange={(value) => setField("whatsappUrl", value)} />
      </div>
      <button type="submit" disabled={saving} className="rounded-2xl bg-cyan-300 px-6 py-3 font-black text-slate-950 hover:bg-cyan-200 disabled:opacity-60">
        {saving ? "Guardando..." : "Guardar perfil"}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, helper }: { label: string; value: string; onChange: (value: string) => void; helper?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300" />
      {helper ? <span className="mt-1 block text-xs text-slate-500">{helper}</span> : null}
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={6} className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-cyan-300" />
    </label>
  );
}
