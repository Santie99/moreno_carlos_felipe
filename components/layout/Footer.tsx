import Link from "next/link";
import type { Profile } from "@/types";

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-black text-white">{profile.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">{profile.shortBio}</p>
        </div>
        <div>
          <p className="font-bold text-white">Navegación</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link href="/proyectos" className="hover:text-white">Proyectos</Link>
            <Link href="/servicios" className="hover:text-white">Servicios</Link>
            <Link href="/sobre-mi" className="hover:text-white">Sobre mí</Link>
            <Link href="/contacto" className="hover:text-white">Contacto</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-white">Contacto</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <a href={`mailto:${profile.email}`} className="hover:text-white">{profile.email}</a>
            <a href={profile.githubUrl} className="hover:text-white">GitHub</a>
          </div>
        </div>
      </div>
      <div className="container-page border-t border-white/10 py-5 text-xs text-slate-500">
        © {new Date().getFullYear()} {profile.name}. Construido con Next.js, TypeScript y Tailwind.
      </div>
    </footer>
  );
}
