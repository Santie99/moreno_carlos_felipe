import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getActiveServices, getProfile } from "@/lib/data";
import { buildMetadata, servicesSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Servicios",
  description:
    "Servicios de Santie Bernal: MVP web, dashboards, landing pages estratégicas y automatizaciones simples con IA.",
  path: "/servicios",
  keywords: ["MVP web Colombia", "dashboard operativo", "landing page estratégica", "automatización con IA"]
});

export default async function ServicesPage() {
  const [activeServices, profile] = await Promise.all([getActiveServices(), getProfile()]);

  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeader
        eyebrow="Servicios"
        title="Ofertas claras para convertir una idea o proceso en una herramienta funcional."
        description="Servicios acotados para construir, validar y ordenar productos digitales sin caer en proyectos infinitos."
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema(activeServices)) }} />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {activeServices.map((service) => (
          <ServiceCard key={service.id} service={service} profile={profile} />
        ))}
      </div>

      <div className="glass-card mt-12 rounded-[2rem] p-8">
        <h2 className="text-2xl font-black text-white">Cómo defino el alcance</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          Antes de construir, reduzco la idea a un flujo principal, entidades de datos, pantallas necesarias, restricciones y criterio de éxito. El objetivo de una primera versión no es tener todo, sino tener lo suficiente para validar utilidad real.
        </p>
      </div>
    </section>
  );
}
