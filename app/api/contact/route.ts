import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseRest } from "@/lib/supabase-rest";
import type { ContactMessageInput } from "@/types";

const normalize = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactMessageInput>;

    const name = normalize(body.name);
    const email = normalize(body.email);
    const company = normalize(body.company);
    const opportunityType = normalize(body.opportunityType) || "Otro";
    const budget = normalize(body.budget);
    const link = normalize(body.link);
    const message = normalize(body.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, message: "Nombre, email y mensaje son obligatorios." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Ingresa un email válido." },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        ok: true,
        saved: false,
        message: "Formulario validado. Supabase aún no está configurado, así que el mensaje no se guardó en base de datos."
      });
    }

    await supabaseRest("contact_messages", {
      method: "POST",
      prefer: "return=minimal",
      body: {
        name,
        email,
        company: company || null,
        opportunity_type: opportunityType,
        budget: budget || null,
        link: link || null,
        message,
        status: "Nuevo"
      }
    });

    return NextResponse.json({
      ok: true,
      saved: true,
      message: "Mensaje guardado correctamente en Supabase."
    });
  } catch (error) {
    console.error("[contact] error", error);
    return NextResponse.json(
      { ok: false, message: "No se pudo procesar el mensaje. Revisa la consola del servidor." },
      { status: 500 }
    );
  }
}
