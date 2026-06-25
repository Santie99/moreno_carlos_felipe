import { NextResponse } from "next/server";
import { getAdminProjects } from "@/lib/admin-data";
import { projectPayload } from "@/lib/admin-payloads";
import { adminSupabaseRest } from "@/lib/admin-supabase";

export async function GET() {
  try {
    return NextResponse.json({ projects: await getAdminProjects() });
  } catch (error) {
    console.error("[admin projects GET]", error);
    return NextResponse.json({ message: "No se pudieron cargar los proyectos." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const payload = projectPayload(body);
    await adminSupabaseRest("projects", { method: "POST", body: payload, prefer: "return=minimal" });
    return NextResponse.json({ ok: true, id: payload.id });
  } catch (error) {
    console.error("[admin projects POST]", error);
    return NextResponse.json({ message: "No se pudo crear el proyecto." }, { status: 500 });
  }
}
