import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProfile } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sobre mí",
  description:
    "Conoce el perfil de Santie Bernal: product builder en etapa temprana enfocado en herramientas web, dashboards, PWAs e IA aplicada.",
  path: "/sobre-mi",
  keywords: ["Santie Bernal perfil", "product builder Colombia", "desarrollador web Colombia"]
});

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="glass-card sticky top-24 overflow-hidden rounded-[2.25rem] p-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-slate-900">
            <Image src={profile.profileImageUrl} alt="Foto profesional de Santie Bernal" fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover object-top" />
          </div>
          <div className="p-4">
            <h1 className="text-3xl font-black text-white">{profile.name}</h1>
            <p className="mt-2 text-sm font-bold text-cyan-300">{profile.headline}</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{profile.shortBio}</p>
            <ButtonLink href="/contacto" className="mt-5">Hablemos</ButtonLink>
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Perfil"
            title="Un perfil técnico en construcción, con foco en producto y problemas reales."
            description={profile.longBio}
          />

          <div className="mt-10 grid gap-6">
            <section className="glass-card rounded-[2rem] p-6">
              <h2 className="text-2xl font-black text-white">Mi enfoque</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                No quiero presentarme como un CV tradicional. Mi trabajo consiste en convertir ideas, registros dispersos y flujos manuales en productos digitales que ayuden a tomar decisiones o ejecutar acciones con más claridad.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Mi ventaja está en combinar aprendizaje técnico, sensibilidad de producto, experiencia en nichos como trading y finanzas, y uso práctico de IA para acelerar análisis, construcción y documentación.
              </p>
            </section>

            <section className="glass-card rounded-[2rem] p-6">
              <h2 className="text-2xl font-black text-white">Formación</h2>
              <div className="mt-5 grid gap-4">
                {profile.education.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">{item.provider} · {item.category}</p>
                    <h3 className="mt-2 text-lg font-black text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-card rounded-[2rem] p-6">
              <h2 className="text-2xl font-black text-white">Habilidades y stack</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill.name} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-slate-200">
                    {skill.name} · {skill.category}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
