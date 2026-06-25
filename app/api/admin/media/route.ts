import { NextResponse } from "next/server";
import { deleteStorageImage, listStorageImages, uploadImageToStorage } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const files = await listStorageImages();
    return NextResponse.json({ files });
  } catch (error) {
    console.error("[admin media GET]", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "No se pudieron cargar las imágenes." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "uploads");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Debes enviar una imagen válida." }, { status: 400 });
    }

    const uploaded = await uploadImageToStorage(file, folder);
    return NextResponse.json({ ok: true, file: uploaded });
  } catch (error) {
    console.error("[admin media POST]", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "No se pudo subir la imagen." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json() as { path?: string };
    if (!body.path) {
      return NextResponse.json({ message: "Ruta de imagen requerida." }, { status: 400 });
    }

    await deleteStorageImage(body.path);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin media DELETE]", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "No se pudo eliminar la imagen." }, { status: 500 });
  }
}
