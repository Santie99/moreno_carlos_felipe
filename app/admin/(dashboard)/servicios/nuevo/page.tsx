import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ServiceForm } from "@/components/admin/ServiceForm";

export const dynamic = "force-dynamic";

export default function NewServicePage() {
  return <><AdminPageHeader title="Nuevo servicio" description="Crea un servicio comercial para mostrarlo en la web pública." /><ServiceForm /></>;
}
