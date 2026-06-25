"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ServiceDeleteButton } from "@/components/admin/ServiceActions";
import type { Service } from "@/types";

export function ServicesAdminClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((response) => response.json())
      .then((data) => setServices(data.services || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <AdminPageHeader title="Servicios" description="Edita los servicios comerciales que aparecen en la página pública." actionHref="/admin/servicios/nuevo" actionLabel="Nuevo servicio" />
      {loading ? <div className="glass-card rounded-3xl p-8 text-slate-300">Cargando servicios...</div> : (
        <div className="space-y-3">
          {services.map((service) => (
            <article key={service.id} className="glass-card rounded-3xl p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {service.isActive ? <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">Activo</span> : <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200">Oculto</span>}
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">Orden {service.sortOrder}</span>
                    {service.whatsappMessage ? <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">Mensaje WA custom</span> : null}
                  </div>
                  <h2 className="mt-3 text-xl font-black text-white">{service.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{service.shortDescription}</p>
                  <p className="mt-2 text-xs text-slate-500">CTA: {service.ctaText}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/servicios#${service.slug}`} className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-white/10">Ver</Link>
                  <Link href={`/admin/servicios/${service.id}/editar`} className="rounded-xl bg-cyan-300 px-3 py-2 text-xs font-black text-slate-950 hover:bg-cyan-200">Editar</Link>
                  <ServiceDeleteButton id={service.id} title={service.title} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
