import { getSupabaseAnonKey, getSupabaseServiceRoleKey, getSupabaseUrl, requireAdminSession } from "@/lib/admin-auth";

type AdminRestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  query?: string;
  prefer?: string;
};

export async function adminSupabaseRest<T>(table: string, options: AdminRestOptions = {}): Promise<T> {
  const session = await requireAdminSession();
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  const anonKey = getSupabaseAnonKey();
  const apiKey = serviceRoleKey || anonKey;
  const bearer = serviceRoleKey || session.accessToken;

  if (!supabaseUrl || !apiKey || !bearer) {
    throw new Error("Supabase admin environment is incomplete. Check .env.local.");
  }

  const query = options.query ? `?${options.query}` : "";
  const response = await fetch(`${supabaseUrl}/rest/v1/${table}${query}`, {
    method: options.method || "GET",
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
      ...(options.prefer ? { Prefer: options.prefer } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Admin Supabase request failed (${response.status}): ${text}`);
  }

  const text = await response.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}
