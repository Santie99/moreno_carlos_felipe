import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProfile } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { CONTACT_WHATSAPP_MESSAGE, getContactHref, hasWhatsApp } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Contacto",
  description:
    "Contacta a Santie Bernal para oportunidades freelance, empleo, MVPs web, dashboards, automatizaciones o productos digitales.",
  path: "/contacto",
  keywords: ["contactar desarrollador web", "freelance web Colombia", "MVP web", "dashboards"]
});

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <SectionHeader
            eyebrow="Contacto"
            title="Hablemos de una idea, oportunidad o proyecto."
            description="Cuéntame qué quieres construir, validar o mejorar. Si Supabase está configurado, el mensaje quedará guardado en la tabla contact_messages."
          />
          <div className="glass-card mt-8 rounded-[2rem] p-6">
            <p className="font-black text-white">Contacto directo</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="text-cyan-300 hover:text-cyan-100">{profile.email}</a>
              {hasWhatsApp(profile) ? (
                <a
                  href={getContactHref(profile, CONTACT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-100 hover:bg-cyan-300 hover:text-slate-950"
                >
                  WhatsApp
                </a>
              ) : null}
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              Tipos de oportunidad: empleo, freelance, MVP web, dashboard, SaaS, automatización con IA o alianza.
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
