import { NextResponse } from "next/server";
import { getAdminProfile } from "@/lib/admin-data";
import { adminSupabaseRest } from "@/lib/admin-supabase";
import { cleanString } from "@/lib/admin-payloads";

export async function GET() {
  try {
    return NextResponse.json({ profile: await getAdminProfile() });
  } catch (error) {
    console.error("[admin profile GET]", error);
    return NextResponse.json({ message: "No se pudo cargar el perfil." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const payload = {
      name: cleanString(body.name),
      headline: cleanString(body.headline),
      short_bio: cleanString(body.shortBio || body.short_bio),
      long_bio: cleanString(body.longBio || body.long_bio),
      profile_image_url: cleanString(body.profileImageUrl || body.profile_image_url),
      location: cleanString(body.location),
      email: cleanString(body.email),
      github_url: cleanString(body.githubUrl || body.github_url, "#"),
      linkedin_url: cleanString(body.linkedinUrl || body.linkedin_url, "#"),
      x_url: cleanString(body.xUrl || body.x_url, "#"),
      whatsapp_url: cleanString(body.whatsappUrl || body.whatsapp_url, "#"),
      updated_at: new Date().toISOString()
    };

    await adminSupabaseRest("profile", {
      method: "PATCH",
      query: "id=eq.main",
      body: payload,
      prefer: "return=minimal"
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin profile PATCH]", error);
    return NextResponse.json({ message: "No se pudo actualizar el perfil." }, { status: 500 });
  }
}
