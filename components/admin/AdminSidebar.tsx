"use client";

import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/proyectos", label: "Proyectos" },
  { href: "/admin/servicios", label: "Servicios" },
  { href: "/admin/perfil", label: "Perfil" },
  { href: "/admin/mensajes", label: "Mensajes" },
  { href: "/admin/home", label: "Home" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/configuracion", label: "Configuración" },
  { href: "/admin/guia", label: "Guía" }
];

export function AdminSidebar() {
  return (
    <aside className="border-b border-white/10 bg-slate-950/95 px-4 py-4 lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-b-0 lg:border-r lg:px-6">
      <div className="flex items-center justify-between gap-4 lg:block">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-300 text-sm font-black text-slate-950">SB</span>
          <span>
            <span className="block text-sm font-black text-white">Santie Admin</span>
            <span className="block text-xs text-slate-400">Panel privado</span>
          </span>
        </Link>
        <div className="lg:hidden"><LogoutButton /></div>
      </div>

      <nav className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 lg:block"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 hidden lg:block">
        <LogoutButton />
        <Link href="/" className="mt-4 block text-sm font-bold text-cyan-300 hover:text-cyan-200">Ver sitio público →</Link>
      </div>
    </aside>
  );
}
