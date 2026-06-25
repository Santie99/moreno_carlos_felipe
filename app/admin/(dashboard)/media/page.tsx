import { MediaAdminClient } from "@/components/admin/MediaAdminClient";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const dynamic = "force-dynamic";

export default function AdminMediaPage() {
  return (
    <>
      <AdminPageHeader
        title="Media"
        description="Sube, consulta y elimina imágenes desde Supabase Storage. Usa esta biblioteca para foto de perfil, portadas de proyectos, galerías y Open Graph."
      />
      <MediaAdminClient />
    </>
  );
}
