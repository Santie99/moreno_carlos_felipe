import { NextResponse } from "next/server";
import { cleanNumber, cleanString } from "@/lib/admin-payloads";
import { adminSupabaseRest } from "@/lib/admin-supabase";
import { deleteStorageImage, storagePathFromPublicUrl } from "@/lib/storage";
import type { ProjectImage } from "@/types";

type Params = { params: Promise<{ id: string }> };

type DbProjectImage = {
  id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
};

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json() as Partial<ProjectImage>;
    await adminSupabaseRest("project_images", {
      method: "PATCH",
      query: `id=eq.${encodeURIComponent(id)}`,
      body: {
        alt_text: cleanString(body.altText, "Imagen del proyecto"),
        sort_order: cleanNumber(body.sortOrder, 100)
      },
      prefer: "return=minimal"
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin project image PATCH]", error);
    return NextResponse.json({ message: "No se pudo actualizar la imagen." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const existing = await adminSupabaseRest<DbProjectImage[]>("project_images", {
      query: `select=*&id=eq.${encodeURIComponent(id)}&limit=1`
    });
    const image = existing[0];

    if (image?.image_url) {
      const path = storagePathFromPublicUrl(image.image_url);
      if (path) await deleteStorageImage(path);
    }

    await adminSupabaseRest("project_images", {
      method: "DELETE",
      query: `id=eq.${encodeURIComponent(id)}`,
      prefer: "return=minimal"
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin project image DELETE]", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "No se pudo eliminar la imagen." }, { status: 500 });
  }
}
