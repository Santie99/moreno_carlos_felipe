import { getSupabaseServiceRoleKey, getSupabaseUrl, requireAdminSession } from "@/lib/admin-auth";

export type StoredMediaFile = {
  name: string;
  path: string;
  url: string;
  size?: number;
  mimeType?: string;
  updatedAt?: string;
};

const DEFAULT_BUCKET = "portfolio-media";
const MAX_IMAGE_SIZE_BYTES = 6 * 1024 * 1024;
const IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"]);

export function getStorageBucket() {
  return process.env.SUPABASE_STORAGE_BUCKET || DEFAULT_BUCKET;
}

function getStorageAuth() {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase Storage requiere NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY.");
  }

  return { supabaseUrl, serviceRoleKey, bucket: getStorageBucket() };
}

function cleanSegment(value: string, fallback: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90) || fallback;
}

export function cleanStorageFolder(value: string | null | undefined) {
  const folder = cleanSegment(value || "uploads", "uploads");
  const allowed = new Set(["profile", "projects", "og", "uploads"]);
  return allowed.has(folder) ? folder : "uploads";
}

export function publicStorageUrl(path: string) {
  const { supabaseUrl, bucket } = getStorageAuth();
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

export function storagePathFromPublicUrl(url: string | null | undefined) {
  if (!url) return "";
  const { supabaseUrl, bucket } = getStorageAuth();
  const publicPrefix = `${supabaseUrl}/storage/v1/object/public/${bucket}/`;
  if (url.startsWith(publicPrefix)) return decodeURIComponent(url.slice(publicPrefix.length));

  try {
    const parsed = new URL(url);
    const marker = `/storage/v1/object/public/${bucket}/`;
    const index = parsed.pathname.indexOf(marker);
    if (index >= 0) return decodeURIComponent(parsed.pathname.slice(index + marker.length));
  } catch {
    return "";
  }

  return "";
}

export async function uploadImageToStorage(file: File, folderInput?: string) {
  await requireAdminSession();
  const { supabaseUrl, serviceRoleKey, bucket } = getStorageAuth();

  if (!IMAGE_MIME_TYPES.has(file.type)) {
    throw new Error("Formato no permitido. Usa JPG, PNG, WEBP, SVG o GIF.");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("La imagen supera 6 MB. Optimízala antes de subirla.");
  }

  const folder = cleanStorageFolder(folderInput);
  const extension = file.name.includes(".") ? file.name.split(".").pop() || "img" : "img";
  const baseName = cleanSegment(file.name.replace(/\.[^.]+$/, ""), "image");
  const path = `${folder}/${Date.now()}-${baseName}.${cleanSegment(extension, "img")}`;
  const arrayBuffer = await file.arrayBuffer();

  const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": file.type,
      "x-upsert": "false"
    },
    body: Buffer.from(arrayBuffer),
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`No se pudo subir la imagen (${response.status}): ${text}`);
  }

  return {
    path,
    url: publicStorageUrl(path),
    name: file.name,
    size: file.size,
    mimeType: file.type
  };
}

export async function listStorageImages() {
  await requireAdminSession();
  const folders = ["profile", "projects", "og", "uploads"];
  const files = await Promise.all(folders.map((folder) => listStorageFolder(folder)));
  return files.flat().sort((a, b) => a.path.localeCompare(b.path));
}

async function listStorageFolder(folder: string): Promise<StoredMediaFile[]> {
  const { supabaseUrl, serviceRoleKey, bucket } = getStorageAuth();
  const response = await fetch(`${supabaseUrl}/storage/v1/object/list/${bucket}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prefix: folder,
      limit: 100,
      offset: 0,
      sortBy: { column: "updated_at", order: "desc" }
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`No se pudieron listar imágenes (${response.status}): ${text}`);
  }

  const data = await response.json() as Array<{
    name: string;
    id?: string | null;
    updated_at?: string;
    metadata?: { size?: number; mimetype?: string };
  }>;

  return data
    .filter((item) => item.id && item.name)
    .map((item) => {
      const path = `${folder}/${item.name}`;
      return {
        name: item.name,
        path,
        url: publicStorageUrl(path),
        size: item.metadata?.size,
        mimeType: item.metadata?.mimetype,
        updatedAt: item.updated_at
      };
    });
}

export async function deleteStorageImage(path: string) {
  await requireAdminSession();
  const { supabaseUrl, serviceRoleKey, bucket } = getStorageAuth();
  const cleanPath = path.replace(/^\/+/, "");
  if (!cleanPath) throw new Error("Ruta de imagen inválida.");

  const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}`, {
    method: "DELETE",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prefixes: [cleanPath] }),
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`No se pudo eliminar la imagen (${response.status}): ${text}`);
  }
}
