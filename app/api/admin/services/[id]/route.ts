import { NextResponse } from "next/server";
import { getAdminService } from "@/lib/admin-data";
import { servicePayload } from "@/lib/admin-payloads";
import { adminSupabaseRest } from "@/lib/admin-supabase";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const service = await getAdminService(id);
    if (!service) return NextResponse.json({ message: "Servicio no encontrado." }, { status: 404 });
    return NextResponse.json({ service });
  } catch (error) {
    console.error("[admin service GET]", error);
    return NextResponse.json({ message: "No se pudo cargar el servicio." }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json() as Record<string, unknown>;
    const { id: _ignored, ...payload } = servicePayload({ ...body, id });
    await adminSupabaseRest("services", { method: "PATCH", query: `id=eq.${encodeURIComponent(id)}`, body: payload, prefer: "return=minimal" });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin service PATCH]", error);
    return NextResponse.json({ message: "No se pudo actualizar el servicio." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await adminSupabaseRest("services", { method: "DELETE", query: `id=eq.${encodeURIComponent(id)}`, prefer: "return=minimal" });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin service DELETE]", error);
    return NextResponse.json({ message: "No se pudo eliminar el servicio." }, { status: 500 });
  }
}
