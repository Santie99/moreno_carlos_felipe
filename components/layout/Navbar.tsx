"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const baseNavItems = [
  { href: "/proyectos", label: "Proyectos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" }
];

export function Navbar({ profileName = "Santie Bernal", showNotes = true }: { profileName?: string; showNotes?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navItems = useMemo(() => showNotes ? [...baseNavItems.slice(0, 2), { href: "/notas", label: "Notas" }, ...baseNavItems.slice(2)] : baseNavItems, [showNotes]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="container-page relative flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" onClick={closeMenu} className="focus-ring flex items-center gap-3 rounded-full">
          <span className="grid size-10 place-items-center rounded-2xl bg-cyan-300 font-black text-slate-950">SB</span>
          <span className="hidden text-sm font-bold text-white sm:inline">{profileName}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring rounded-full px-4 py-2 text-sm font-semibold transition",
                  isActive ? "bg-cyan-300/12 text-cyan-100" : "text-slate-300 hover:bg-white/8 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/contacto" className="focus-ring rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/20">
            Hablemos
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white transition hover:bg-white/[0.1] md:hidden"
        >
          <span>Menú</span>
          <span className="flex size-5 flex-col justify-center gap-1" aria-hidden="true">
            <span className={cn("h-0.5 w-5 rounded-full bg-current transition", isOpen && "translate-y-1.5 rotate-45")} />
            <span className={cn("h-0.5 w-5 rounded-full bg-current transition", isOpen && "opacity-0")} />
            <span className={cn("h-0.5 w-5 rounded-full bg-current transition", isOpen && "-translate-y-1.5 -rotate-45")} />
          </span>
        </button>

        {isOpen ? (
          <div id="mobile-navigation" className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-50 rounded-[1.5rem] border border-white/10 bg-slate-950/96 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "focus-ring rounded-2xl px-4 py-3 text-base font-bold transition",
                      isActive ? "bg-cyan-300 text-slate-950" : "bg-white/[0.04] text-slate-100 hover:bg-white/[0.08]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href="/contacto" onClick={closeMenu} className="focus-ring mt-2 rounded-2xl bg-cyan-300 px-4 py-3 text-center text-base font-black text-slate-950 transition hover:bg-cyan-200">
                Hablemos de una idea
              </Link>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
