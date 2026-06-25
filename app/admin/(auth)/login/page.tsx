import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { buildMetadata } from "@/lib/seo";
import { getAdminEmails, isAdminAuthConfigured } from "@/lib/admin-auth";

export const metadata = buildMetadata({
  title: "Admin",
  description: "Panel privado de administración de Santie Bernal.",
  path: "/admin/login",
  noIndex: true
});

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const configured = isAdminAuthConfigured();
  const adminEmails = getAdminEmails();

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">/admin/login</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">Panel privado para gestionar tu web.</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Desde aquí podrás crear proyectos, publicar o despublicar contenido, cambiar destacados, editar servicios, revisar mensajes y ajustar tu perfil público.
          </p>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
            <strong className="text-white">Estado:</strong> {configured ? "Supabase Auth configurado." : "Falta configurar Supabase en .env.local."}<br />
            <strong className="text-white">Correos autorizados:</strong> {adminEmails.length ? adminEmails.join(", ") : "Sin ADMIN_EMAIL configurado."}
          </div>
        </div>
        <AdminLoginForm />
      </div>
    </main>
  );
}
