import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { HomeSection, Profile } from "@/types";

export function AboutPreview({ profile, content }: { profile: Profile; content: HomeSection }) {
  const skillGroups = profile.skills.reduce<Record<string, string[]>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  return (
    <section className="container-page py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeader
          eyebrow={content.subtitle || "Sobre mí"}
          title={content.title}
          description={content.content || profile.longBio}
        />
        <div className="glass-card rounded-[2rem] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Stack y enfoque</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {Object.entries(skillGroups).map(([category, skills]) => (
              <div key={category} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="font-black text-white">{category}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-slate-300">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <ButtonLink href={content.ctaUrl || "/sobre-mi"} variant="secondary" className="mt-6">{content.ctaLabel || "Leer más"}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
