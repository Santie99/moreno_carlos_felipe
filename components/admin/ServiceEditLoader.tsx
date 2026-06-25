"use client";

import { useEffect, useState } from "react";
import { ServiceForm } from "@/components/admin/ServiceForm";
import type { Service } from "@/types";

export function ServiceEditLoader({ id }: { id: string }) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/services/${id}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Servicio no encontrado.");
        setService(data.service);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="glass-card rounded-3xl p-8 text-slate-300">Cargando servicio...</div>;
  if (error || !service) return <div className="glass-card rounded-3xl p-8 text-red-100">{error || "Servicio no encontrado."}</div>;
  return <ServiceForm service={service} />;
}
