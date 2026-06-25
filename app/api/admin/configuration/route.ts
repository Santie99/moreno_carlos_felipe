import { NextResponse } from "next/server";
import { getAdminSiteSettings } from "@/lib/admin-data";
import { cleanArray, cleanBoolean, cleanString } from "@/lib/admin-payloads";
import { adminSupabaseRest } from "@/lib/admin-supabase";

export async function GET() {
  try {
    return NextResponse.json({ settings: await getAdminSiteSettings() });
  } catch (error) {
    console.error("[admin configuration GET]", error);
    return NextResponse.json({ message: "No se pudo cargar la configuración." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const value = {
      siteTitle: cleanString(body.siteTitle),
      siteDescription: cleanString(body.siteDescription),
      keywords: cleanArray(body.keywords),
      ogImageUrl: cleanString(body.ogImageUrl, "/projects/funded-os.svg"),
      canonicalUrl: cleanString(body.canonicalUrl, process.env.NEXT_PUBLIC_SITE_URL || ""),
      notesEnabled: cleanBoolean(body.notesEnabled),
      freelanceAvailable: cleanBoolean(body.freelanceAvailable),
      whatsappFallbackToContact: cleanBoolean(body.whatsappFallbackToContact)
    };

    await adminSupabaseRest("site_settings", {
      method: "POST",
      query: "on_conflict=key",
      body: { key: "global_config", value, updated_at: new Date().toISOString() },
      prefer: "resolution=merge-duplicates,return=minimal"
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin configuration PATCH]", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "No se pudo actualizar la configuración." }, { status: 500 });
  }
}
