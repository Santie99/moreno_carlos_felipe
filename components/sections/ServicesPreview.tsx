import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Profile, Service } from "@/types";

export function ServicesPreview({ services, profile }: { services: Service[]; profile: Pick<Profile, "whatsappUrl"> }) {
  return (
    <section className="border-y border-white/10 bg-white/[0.03]">
      <div className="container-page py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Servicios"
            title="De una idea o proceso disperso a una primera versión funcional."
            description="Servicios pensados para validar, ordenar y lanzar herramientas digitales con alcance claro."
          />
          <ButtonLink href="/servicios" variant="secondary" className="w-fit">Ver servicios</ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} service={service} profile={profile} />
          ))}
        </div>
      </div>
    </section>
  );
}
