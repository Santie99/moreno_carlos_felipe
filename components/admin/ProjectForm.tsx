"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ProjectImagesManager } from "@/components/admin/ProjectImagesManager";
import type { Project } from "@/types";

const statuses = ["Idea", "Prototipo", "MVP", "En producción", "En validación", "Pausado"];
const highlightLevels = ["principal", "secundario", "experimento"];

const joinList = (items?: string[]) => (items || []).join("\n");

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(project?.title || "");
  const [slug, setSlug] = useState(project?.slug || "");
  const [shortDescription, setShortDescription] = useState(project?.shortDescription || "");
  const [longDescription, setLongDescription] = useState(project?.longDescription || "");
  const [problem, setProblem] = useState(project?.problem || "");
  const [solution, setSolution] = useState(project?.solution || "");
  const [targetUser, setTargetUser] = useState(project?.targetUser || "");
  const [category, setCategory] = useState(project?.category || "Proyecto web");
  const [status, setStatus] = useState(project?.status || "MVP");
  const [tags, setTags] = useState(joinList(project?.tags));
  const [stack, setStack] = useState(joinList(project?.stack));
  const [features, setFeatures] = useState(joinList(project?.features));
  const [productDecisions, setProductDecisions] = useState(joinList(project?.productDecisions));
  const [technicalChallenges, setTechnicalChallenges] = useState(joinList(project?.technicalChallenges));
  const [learnings, setLearnings] = useState(joinList(project?.learnings));
  const [potential, setPotential] = useState(joinList(project?.potential));
  const [demoUrl, setDemoUrl] = useState(project?.demoUrl || "");
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || "");
  const [videoUrl, setVideoUrl] = useState(project?.videoUrl || "");
  const [coverImageUrl, setCoverImageUrl] = useState(project?.coverImageUrl || "/projects/funded-os.svg");
  const [ogImageUrl, setOgImageUrl] = useState(project?.ogImageUrl || "");
  const [seoTitle, setSeoTitle] = useState(project?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(project?.seoDescription || "");
  const [isPublished, setIsPublished] = useState(project?.isPublished ?? true);
  const [isFeatured, setIsFeatured] = useState(project?.isFeatured ?? false);
  const [featuredOrder, setFeaturedOrder] = useState(project?.featuredOrder || 100);
  const [highlightLevel, setHighlightLevel] = useState(project?.highlightLevel || "secundario");

  const endpoint = project ? `/api/admin/projects/${project.id}` : "/api/admin/projects";
  const method = project ? "PATCH" : "POST";

  const previewSlug = useMemo(() => slug || slugify(title), [slug, title]);

  const publicUrl = previewSlug ? `/proyectos/${previewSlug}` : "/proyectos";
  const warnings = [
    isFeatured && !isPublished ? "Este proyecto está destacado, pero no aparecerá en la home porque no está publicado." : "",
    isFeatured && featuredOrder > 3 ? "Está destacado, pero el orden es mayor a 3. La home solo muestra los 3 primeros destacados." : "",
    !seoDescription && shortDescription ? "SEO description vacío: se usará la descripción corta al guardar." : "",
    !coverImageUrl ? "Falta imagen principal." : ""
  ].filter(Boolean);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      id: project?.id || previewSlug,
      title,
      slug: previewSlug,
      shortDescription,
      longDescription,
      problem,
      solution,
      targetUser,
      category,
      status,
      tags,
      stack,
      features,
      productDecisions,
      technicalChallenges,
      learnings,
      potential,
      demoUrl,
      githubUrl,
      videoUrl,
      coverImageUrl,
      ogImageUrl,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || shortDescription,
      isPublished,
      isFeatured,
      featuredOrder,
      highlightLevel
    };

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.message || "No se pudo guardar el proyecto.");
      return;
    }

    router.push("/admin/proyectos");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {error ? <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div> : null}

      <section className="glass-card rounded-3xl p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Preview y control</p>
            <p className="mt-2 text-sm text-slate-300">URL pública estimada: <span className="font-mono text-cyan-100">{publicUrl}</span></p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={publicUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-white/10">Ver preview</a>
          </div>
        </div>
        {warnings.length ? <div className="mt-4 grid gap-2">{warnings.map((warning) => <p key={warning} className="rounded-2xl border border-amber-300/30 bg-amber-400/10 p-3 text-sm text-amber-100">{warning}</p>)}</div> : null}
      </section>

      <section className="glass-card rounded-3xl p-5">
        <h2 className="text-lg font-black text-white">Información base</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Título" value={title} onChange={setTitle} required />
          <Field label="Slug" value={previewSlug} onChange={setSlug} helper="URL pública del proyecto." />
          <Textarea label="Descripción corta" value={shortDescription} onChange={setShortDescription} required />
          <Textarea label="Descripción larga" value={longDescription} onChange={setLongDescription} required />
          <Field label="Categoría" value={category} onChange={setCategory} />
          <Select label="Estado" value={status} onChange={(value) => setStatus(value as typeof status)} options={statuses} />
          <Textarea label="Problema" value={problem} onChange={setProblem} required />
          <Textarea label="Solución" value={solution} onChange={setSolution} required />
          <Textarea label="Usuario objetivo" value={targetUser} onChange={setTargetUser} />
        </div>
      </section>

      <section className="glass-card rounded-3xl p-5">
        <h2 className="text-lg font-black text-white">Contenido estructurado</h2>
        <p className="mt-2 text-sm text-slate-400">Escribe un elemento por línea o separado por comas.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Textarea label="Tags" value={tags} onChange={setTags} />
          <Textarea label="Stack" value={stack} onChange={setStack} />
          <Textarea label="Funcionalidades" value={features} onChange={setFeatures} />
          <Textarea label="Decisiones de producto" value={productDecisions} onChange={setProductDecisions} />
          <Textarea label="Retos técnicos" value={technicalChallenges} onChange={setTechnicalChallenges} />
          <Textarea label="Aprendizajes" value={learnings} onChange={setLearnings} />
          <Textarea label="Potencial" value={potential} onChange={setPotential} />
        </div>
      </section>

      <section className="glass-card rounded-3xl p-5">
        <h2 className="text-lg font-black text-white">Visibilidad, links y SEO</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ImageUploadField label="Imagen principal" value={coverImageUrl} onChange={setCoverImageUrl} folder="projects" helper="Se usa como portada pública del proyecto." />
          <ImageUploadField label="OG image" value={ogImageUrl} onChange={setOgImageUrl} folder="og" helper="Imagen para compartir en redes. Puede ser igual a la portada." />
          <Field label="Demo URL" value={demoUrl} onChange={setDemoUrl} />
          <Field label="GitHub URL" value={githubUrl} onChange={setGithubUrl} />
          <Field label="Video URL" value={videoUrl} onChange={setVideoUrl} />
          <Field label="Orden destacado" type="number" value={String(featuredOrder)} onChange={(value) => setFeaturedOrder(Number(value))} />
          <Select label="Nivel visual" value={highlightLevel} onChange={(value) => setHighlightLevel(value as typeof highlightLevel)} options={highlightLevels} />
          <Field label="SEO title" value={seoTitle} onChange={setSeoTitle} />
          <Textarea label="SEO description" value={seoDescription} onChange={setSeoDescription} />
        </div>

        <div className="mt-5 flex flex-wrap gap-4">
          <Checkbox label="Publicado" checked={isPublished} onChange={setIsPublished} />
          <Checkbox label="Destacado en home" checked={isFeatured} onChange={setIsFeatured} />
        </div>
      </section>

      {project ? <ProjectImagesManager projectId={project.id} /> : (
        <section className="glass-card rounded-3xl p-5 text-sm leading-7 text-slate-300">
          Guarda primero el proyecto para poder agregar imágenes adicionales a su galería.
        </section>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-2xl bg-cyan-300 px-6 py-3 font-black text-slate-950 hover:bg-cyan-200 disabled:opacity-60">
          {saving ? "Guardando..." : "Guardar proyecto"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, helper, required, type = "text" }: { label: string; value: string; onChange: (value: string) => void; helper?: string; required?: boolean; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300" />
      {helper ? <span className="mt-1 block text-xs text-slate-500">{helper}</span> : null}
    </label>
  );
}

function Textarea({ label, value, onChange, required }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} required={required} rows={5} className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-cyan-300" />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-cyan-300" />
      {label}
    </label>
  );
}
