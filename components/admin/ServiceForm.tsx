"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Service } from "@/types";

const joinList = (items?: string[]) => (items || []).join("\n");

function slugify(input: string) {
  return input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

export function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(service?.title || "");
  const [slug, setSlug] = useState(service?.slug || "");
  const [shortDescription, setShortDescription] = useState(service?.shortDescription || "");
  const [idealClient, setIdealClient] = useState(service?.idealClient || "");
  const [problem, setProblem] = useState(service?.problem || "");
  const [deliverables, setDeliverables] = useState(joinList(service?.deliverables));
  const [scope, setScope] = useState(joinList(service?.scope));
  const [exclusions, setExclusions] = useState(joinList(service?.exclusions));
  const [priceFrom, setPriceFrom] = useState(service?.priceFrom || "");
  const [priceNote, setPriceNote] = useState(service?.priceNote || "");
  const [ctaText, setCtaText] = useState(service?.ctaText || "Hablemos");
  const [whatsappMessage, setWhatsappMessage] = useState(service?.whatsappMessage || "");
  const [isActive, setIsActive] = useState(service?.isActive ?? true);
  const [sortOrder, setSortOrder] = useState(service?.sortOrder || 100);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const finalSlug = slug || slugify(title);
    const endpoint = service ? `/api/admin/services/${service.id}` : "/api/admin/services";
    const method = service ? "PATCH" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: service?.id || finalSlug, title, slug: finalSlug, shortDescription, idealClient, problem, deliverables, scope, exclusions, priceFrom, priceNote, ctaText, whatsappMessage, isActive, sortOrder })
    });
    setSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.message || "No se pudo guardar el servicio.");
      return;
    }

    router.push("/admin/servicios");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="glass-card space-y-5 rounded-3xl p-5">
      {error ? <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Título" value={title} onChange={setTitle} required />
        <Field label="Slug" value={slug || slugify(title)} onChange={setSlug} />
        <Textarea label="Descripción corta" value={shortDescription} onChange={setShortDescription} />
        <Textarea label="Cliente ideal" value={idealClient} onChange={setIdealClient} />
        <Textarea label="Problema" value={problem} onChange={setProblem} />
        <Textarea label="Entregables" value={deliverables} onChange={setDeliverables} />
        <Textarea label="Alcance" value={scope} onChange={setScope} />
        <Textarea label="Exclusiones" value={exclusions} onChange={setExclusions} />
        <Field label="Precio desde" value={priceFrom} onChange={setPriceFrom} />
        <Field label="Nota de precio" value={priceNote} onChange={setPriceNote} />
        <Field label="CTA" value={ctaText} onChange={setCtaText} />
        <Textarea label="Mensaje WhatsApp personalizado" value={whatsappMessage} onChange={setWhatsappMessage} helper="Opcional. Si queda vacío, se usará: Hola, quiero [CTA]." />
        <Field label="Orden" type="number" value={String(sortOrder)} onChange={(value) => setSortOrder(Number(value))} />
      </div>
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white">
        <input type="checkbox" checked={isActive} onChange={(event) => setIsActive(event.target.checked)} className="h-4 w-4 accent-cyan-300" />
        Servicio activo
      </label>
      <button type="submit" disabled={saving} className="rounded-2xl bg-cyan-300 px-6 py-3 font-black text-slate-950 hover:bg-cyan-200 disabled:opacity-60">
        {saving ? "Guardando..." : "Guardar servicio"}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, required, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) {
  return <label className="block"><span className="text-sm font-bold text-white">{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300" /></label>;
}

function Textarea({ label, value, onChange, helper }: { label: string; value: string; onChange: (value: string) => void; helper?: string }) {
  return <label className="block"><span className="text-sm font-bold text-white">{label}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-cyan-300" />{helper ? <span className="mt-1 block text-xs text-slate-500">{helper}</span> : null}</label>;
}
