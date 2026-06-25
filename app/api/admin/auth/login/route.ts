import { NextResponse } from "next/server";
import { getSupabaseAnonKey, getSupabaseUrl, isAllowedAdminEmail, setAdminCookies } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json() as { email?: string; password?: string };
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return NextResponse.json({ message: "Ingresa correo y contraseña." }, { status: 400 });
    }

    if (!isAllowedAdminEmail(normalizedEmail)) {
      return NextResponse.json({ message: "Este correo no está autorizado como admin." }, { status: 403 });
    }

    const supabaseUrl = getSupabaseUrl();
    const anonKey = getSupabaseAnonKey();

    if (!supabaseUrl || !anonKey) {
      return NextResponse.json({ message: "Supabase no está configurado en .env.local." }, { status: 500 });
    }

    const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: anonKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: normalizedEmail, password }),
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Credenciales inválidas o usuario no creado en Supabase Auth." }, { status: 401 });
    }

    const data = await response.json() as {
      access_token?: string;
      refresh_token?: string;
      user?: { email?: string };
    };

    if (!data.access_token || !data.refresh_token || !isAllowedAdminEmail(data.user?.email)) {
      return NextResponse.json({ message: "No se pudo crear la sesión admin." }, { status: 401 });
    }

    await setAdminCookies(data.access_token, data.refresh_token, normalizedEmail);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin login]", error);
    return NextResponse.json({ message: "Error interno iniciando sesión." }, { status: 500 });
  }
}
