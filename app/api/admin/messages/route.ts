import { NextResponse } from "next/server";
import { getAdminMessages } from "@/lib/admin-data";

export async function GET() {
  try {
    return NextResponse.json({ messages: await getAdminMessages() });
  } catch (error) {
    console.error("[admin messages GET]", error);
    return NextResponse.json({ message: "No se pudieron cargar los mensajes." }, { status: 500 });
  }
}
