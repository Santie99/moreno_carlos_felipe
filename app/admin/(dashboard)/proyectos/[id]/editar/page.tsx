import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectEditLoader } from "@/components/admin/ProjectEditLoader";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  return <><AdminPageHeader title="Editar proyecto" description="Modifica contenido, visibilidad, orden, SEO y nivel visual del proyecto." /><ProjectEditLoader id={id} /></>;
}
