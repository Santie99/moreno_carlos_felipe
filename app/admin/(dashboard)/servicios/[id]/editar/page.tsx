import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ServiceEditLoader } from "@/components/admin/ServiceEditLoader";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  return <><AdminPageHeader title="Editar servicio" description="Actualiza alcance, entregables, precio, orden y visibilidad." /><ServiceEditLoader id={id} /></>;
}
