import { ButtonLink } from "@/components/ui/ButtonLink";
import { getContactHref, HERO_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import type { HomeSection, Profile } from "@/types";

export function FinalCTA({ profile, content }: { profile: Profile; content: HomeSection }) {
  const href = content.ctaUrl === "whatsapp" ? getContactHref(profile, HERO_WHATSAPP_MESSAGE) : (content.ctaUrl || getContactHref(profile, HERO_WHATSAPP_MESSAGE));

  return (
    <section className="container-page py-20">
      <div className="glass-card grid gap-8 overflow-hidden rounded-[2.5rem] p-8 md:p-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">{content.subtitle || "Contacto"}</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            {content.title}
          </h2>
          {content.content ? <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{content.content}</p> : null}
        </div>
        <div className="flex lg:justify-end">
          <ButtonLink href={href}>{content.ctaLabel || "Hablemos por WhatsApp"}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
