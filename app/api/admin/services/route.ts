import { NextResponse } from "next/server";
import { getAdminServices } from "@/lib/admin-data";
import { servicePayload } from "@/lib/admin-payloads";
import { adminSupabaseRest } from "@/lib/admin-supabase";

export async function GET() {
  try {
    return NextResponse.json({ services: await getAdminServices() });
  } catch (error) {
    console.error("[admin services GET]", error);
    return NextResponse.json({ message: "No se pudieron cargar los servicios." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const payload = servicePayload(body);
    await adminSupabaseRest("services", { method: "POST", body: payload, prefer: "return=minimal" });
    return NextResponse.json({ ok: true, id: payload.id });
  } catch (error) {
    console.error("[admin services POST]", error);
    return NextResponse.json({ message: "No se pudo crear el servicio." }, { status: 500 });
  }
}
