import { NextResponse } from "next/server";
import { getAdminProject } from "@/lib/admin-data";
import { projectPayload } from "@/lib/admin-payloads";
import { adminSupabaseRest } from "@/lib/admin-supabase";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const project = await getAdminProject(id);
    if (!project) return NextResponse.json({ message: "Proyecto no encontrado." }, { status: 404 });
    return NextResponse.json({ project });
  } catch (error) {
    console.error("[admin project GET]", error);
    return NextResponse.json({ message: "No se pudo cargar el proyecto." }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json() as Record<string, unknown>;
    const { id: _ignored, ...payload } = projectPayload({ ...body, id });
    await adminSupabaseRest("projects", {
      method: "PATCH",
      query: `id=eq.${encodeURIComponent(id)}`,
      body: payload,
      prefer: "return=minimal"
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin project PATCH]", error);
    return NextResponse.json({ message: "No se pudo actualizar el proyecto." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await adminSupabaseRest("projects", {
      method: "DELETE",
      query: `id=eq.${encodeURIComponent(id)}`,
      prefer: "return=minimal"
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin project DELETE]", error);
    return NextResponse.json({ message: "No se pudo eliminar el proyecto." }, { status: 500 });
  }
}
