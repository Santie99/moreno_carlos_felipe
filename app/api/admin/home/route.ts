import { NextResponse } from "next/server";
import { getAdminHomeContent } from "@/lib/admin-data";
import { cleanArray, cleanBoolean, cleanNumber, cleanString } from "@/lib/admin-payloads";
import { adminSupabaseRest } from "@/lib/admin-supabase";

type SectionInput = {
  key: string;
  title?: unknown;
  subtitle?: unknown;
  content?: unknown;
  ctaLabel?: unknown;
  ctaUrl?: unknown;
  isActive?: unknown;
  sortOrder?: unknown;
};

export async function GET() {
  try {
    return NextResponse.json({ home: await getAdminHomeContent() });
  } catch (error) {
    console.error("[admin home GET]", error);
    return NextResponse.json({ message: "No se pudo cargar la configuración de home." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const sections = [body.hero, body.aboutPreview, body.finalCta].filter(Boolean) as SectionInput[];

    for (const section of sections) {
      const key = cleanString(section.key);
      if (!key) continue;
      await adminSupabaseRest("home_sections", {
        method: "POST",
        query: "on_conflict=key",
        body: {
          key,
          title: cleanString(section.title),
          subtitle: cleanString(section.subtitle),
          content: cleanString(section.content),
          cta_label: cleanString(section.ctaLabel),
          cta_url: cleanString(section.ctaUrl),
          is_active: cleanBoolean(section.isActive),
          sort_order: cleanNumber(section.sortOrder, 100),
          updated_at: new Date().toISOString()
        },
        prefer: "resolution=merge-duplicates,return=minimal"
      });
    }

    await adminSupabaseRest("site_settings", {
      method: "POST",
      query: "on_conflict=key",
      body: {
        key: "capabilities",
        value: cleanArray(body.capabilities),
        updated_at: new Date().toISOString()
      },
      prefer: "resolution=merge-duplicates,return=minimal"
    });

    await adminSupabaseRest("site_settings", {
      method: "POST",
      query: "on_conflict=key",
      body: {
        key: "home_visibility",
        value: body.visibility || {},
        updated_at: new Date().toISOString()
      },
      prefer: "resolution=merge-duplicates,return=minimal"
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin home PATCH]", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "No se pudo actualizar la home." }, { status: 500 });
  }
}
