import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return <><AdminPageHeader title="Nuevo proyecto" description="Crea un proyecto editable desde Supabase. Puedes dejarlo como borrador o publicarlo de inmediato." /><ProjectForm /></>;
}
