import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ConfigurationAdminClient } from "@/components/admin/ConfigurationAdminClient";
import { getAdminSiteSettings } from "@/lib/admin-data";
import { getAdminEmails, getSupabaseServiceRoleKey } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminConfigPage() {
  const settings = await getAdminSiteSettings();

  return (
    <>
      <AdminPageHeader title="Configuración" description="Edita SEO global, visibilidad de notas y estado comercial del sitio." />
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="glass-card rounded-3xl p-5 text-sm leading-7 text-slate-300">
          <p><strong className="text-white">Correos admin permitidos:</strong> {getAdminEmails().join(", ") || "No configurado"}</p>
          <p><strong className="text-white">Service Role Key:</strong> {getSupabaseServiceRoleKey() ? "Configurada" : "No configurada"}</p>
        </div>
        <div className="glass-card rounded-3xl p-5 text-sm leading-7 text-slate-300">
          <p><strong className="text-white">Regla:</strong> la configuración pública se guarda en <code className="rounded bg-white/10 px-1">site_settings.global_config</code>.</p>
          <p className="text-slate-400">No muestres ni publiques nunca la Service Role Key. Debe quedarse solo en variables privadas.</p>
        </div>
      </div>
      <ConfigurationAdminClient settings={settings} />
    </>
  );
}
