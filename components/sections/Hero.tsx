import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getContactHref, HERO_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import type { HomeSection, Profile } from "@/types";

type HeroProps = {
  profile: Profile;
  capabilities: string[];
  content: HomeSection;
};

function renderTitle(title: string) {
  const marker = "sistemas accionables";
  if (!title.toLowerCase().includes(marker)) return title;
  const [before] = title.split(/sistemas accionables/i);
  return <>{before}<span className="text-gradient">sistemas accionables.</span></>;
}

export function Hero({ profile, capabilities, content }: HeroProps) {
  const primaryHref = content.ctaUrl || "/proyectos";
  return (
    <section className="grid-bg overflow-hidden border-b border-white/10">
      <div className="container-page grid min-h-[calc(100vh-65px)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
        <div>
          {content.subtitle ? <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">{content.subtitle}</p> : null}
          <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.04em] text-white md:text-7xl">
            {renderTitle(content.title)}
          </h1>
          {content.content ? <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{content.content}</p> : null}
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={primaryHref}>{content.ctaLabel || "Ver proyectos"}</ButtonLink>
            <ButtonLink href={getContactHref(profile, HERO_WHATSAPP_MESSAGE)} variant="secondary">Hablemos de una idea</ButtonLink>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {capabilities.slice(0, 4).map((capability) => (
              <div key={capability} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200">
                {capability}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -left-8 -top-8 size-40 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute -bottom-12 -right-6 size-48 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="glass-card relative overflow-hidden rounded-[2.5rem] p-3 sm:p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-900">
              <Image
                src={profile.profileImageUrl}
                alt="Foto profesional de Santie Bernal como product builder y desarrollador web"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover object-top md:object-center"
              />
            </div>
            <div className="relative mt-3 rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-4 backdrop-blur-xl md:absolute md:bottom-8 md:left-8 md:right-8 md:mt-0 md:bg-slate-950/78 md:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300 md:text-sm">Sistema, producto, datos</p>
              <p className="mt-2 text-xl font-black text-white md:text-2xl">{profile.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{profile.shortBio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
