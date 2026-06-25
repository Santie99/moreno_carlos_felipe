import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { HomeAdminClient } from "@/components/admin/HomeAdminClient";
import { getAdminHomeContent } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const home = await getAdminHomeContent();

  return (
    <>
      <AdminPageHeader title="Home" description="Edita textos del hero, capacidades, sobre mí en home, CTA final y visibilidad de secciones sin tocar código." />
      <HomeAdminClient home={home} />
    </>
  );
}
