import { NextResponse } from "next/server";
import { adminSupabaseRest } from "@/lib/admin-supabase";
import type { ContactMessageStatus } from "@/types";

type Params = { params: Promise<{ id: string }> };

const allowedStatuses: ContactMessageStatus[] = ["Nuevo", "Leído", "Respondido", "En conversación", "Cerrado"];

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json() as { status?: ContactMessageStatus };
    if (!body.status || !allowedStatuses.includes(body.status)) {
      return NextResponse.json({ message: "Estado inválido." }, { status: 400 });
    }

    await adminSupabaseRest("contact_messages", {
      method: "PATCH",
      query: `id=eq.${encodeURIComponent(id)}`,
      body: { status: body.status },
      prefer: "return=minimal"
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin message PATCH]", error);
    return NextResponse.json({ message: "No se pudo actualizar el mensaje." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await adminSupabaseRest("contact_messages", {
      method: "DELETE",
      query: `id=eq.${encodeURIComponent(id)}`,
      prefer: "return=minimal"
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin message DELETE]", error);
    return NextResponse.json({ message: "No se pudo eliminar el mensaje." }, { status: 500 });
  }
}
