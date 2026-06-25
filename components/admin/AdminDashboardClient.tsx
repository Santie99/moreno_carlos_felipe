"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import type { ContactMessage, Project, Service } from "@/types";

type State = {
  projects: Project[];
  services: Service[];
  messages: ContactMessage[];
};

export function AdminDashboardClient() {
  const [state, setState] = useState<State>({ projects: [], services: [], messages: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/projects").then((r) => r.json()),
      fetch("/api/admin/services").then((r) => r.json()),
      fetch("/api/admin/messages").then((r) => r.json())
    ]).then(([projectsData, servicesData, messagesData]) => {
      setState({
        projects: projectsData.projects || [],
        services: servicesData.services || [],
        messages: messagesData.messages || []
      });
    }).finally(() => setLoading(false));
  }, []);

  const featured = state.projects.filter((project) => project.isFeatured).length;
  const unpublished = state.projects.filter((project) => !project.isPublished).length;
  const newMessages = state.messages.filter((message) => message.status === "Nuevo").length;

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Vista rápida del contenido editable de tu web personal." />
      {loading ? <Loading /> : (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <Stat label="Proyectos" value={state.projects.length} />
            <Stat label="Destacados" value={featured} />
            <Stat label="Borradores" value={unpublished} />
            <Stat label="Mensajes nuevos" value={newMessages} />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <QuickAction href="/admin/proyectos/nuevo" title="Crear proyecto" description="Agrega un nuevo caso de estudio o experimento." />
            <QuickAction href="/admin/proyectos" title="Cambiar destacados" description="Activa, desactiva y reordena proyectos principales." />
            <QuickAction href="/admin/home" title="Editar home" description="Ajusta hero, capacidades y CTA final." />
            <QuickAction href="/admin/media" title="Gestionar imágenes" description="Sube fotos, portadas y OG images." />
            <QuickAction href="/admin/mensajes" title="Revisar mensajes" description="Lee contactos recibidos desde la web pública." />
            <QuickAction href="/admin/guia" title="Guía admin" description="Consulta el flujo para publicar, destacar y mantener la web." />
          </div>
        </>
      )}
    </>
  );
}

function Loading() {
  return <div className="glass-card rounded-3xl p-8 text-slate-300">Cargando admin...</div>;
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="glass-card rounded-3xl p-5"><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-3xl font-black text-white">{value}</p></div>;
}

function QuickAction({ href, title, description }: { href: string; title: string; description: string }) {
  return <Link href={href} className="glass-card block rounded-3xl p-5 transition hover:border-cyan-300/50"><h2 className="font-black text-white">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p></Link>;
}
