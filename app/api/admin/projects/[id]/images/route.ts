import { NextResponse } from "next/server";
import { getAdminProjectImages } from "@/lib/admin-data";
import { cleanNumber, cleanString } from "@/lib/admin-payloads";
import { adminSupabaseRest } from "@/lib/admin-supabase";
import { uploadImageToStorage } from "@/lib/storage";

type Params = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const images = await getAdminProjectImages(id);
    return NextResponse.json({ images });
  } catch (error) {
    console.error("[admin project images GET]", error);
    return NextResponse.json({ message: "No se pudieron cargar las imágenes del proyecto." }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const file = formData.get("file");
    const altText = cleanString(formData.get("altText"), "Imagen del proyecto");
    const sortOrder = cleanNumber(formData.get("sortOrder"), 100);

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Debes enviar una imagen válida." }, { status: 400 });
    }

    const uploaded = await uploadImageToStorage(file, "projects");
    const payload = {
      project_id: id,
      image_url: uploaded.url,
      alt_text: altText,
      sort_order: sortOrder
    };

    await adminSupabaseRest("project_images", {
      method: "POST",
      body: payload,
      prefer: "return=minimal"
    });

    return NextResponse.json({ ok: true, file: uploaded });
  } catch (error) {
    console.error("[admin project images POST]", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "No se pudo subir la imagen del proyecto." }, { status: 500 });
  }
}
