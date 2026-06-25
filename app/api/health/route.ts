import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseRest } from "@/lib/supabase-rest";

export const dynamic = "force-dynamic";

type HealthStatus = "ok" | "warning" | "error";

export async function GET() {
  const startedAt = Date.now();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const adminEmails = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "";
  const storageBucket = process.env.SUPABASE_STORAGE_BUCKET || "portfolio-media";

  let supabasePublicRead: HealthStatus = "warning";
  let supabaseMessage = "Supabase no está configurado.";

  if (isSupabaseConfigured()) {
    try {
      await supabaseRest("profile", {
        query: "select=id&limit=1",
        revalidate: 0
      });
      supabasePublicRead = "ok";
      supabaseMessage = "Lectura pública de Supabase OK.";
    } catch (error) {
      supabasePublicRead = "error";
      supabaseMessage = error instanceof Error ? error.message : "Error desconocido leyendo Supabase.";
    }
  }

  const checks = {
    siteUrlConfigured: Boolean(siteUrl),
    supabaseUrlConfigured: Boolean(supabaseUrl),
    supabaseAnonKeyConfigured: Boolean(supabaseAnonKey),
    serviceRoleKeyConfigured: Boolean(serviceRoleKey),
    adminEmailsConfigured: Boolean(adminEmails),
    storageBucketConfigured: Boolean(storageBucket),
    supabasePublicRead
  };

  const requiredOk =
    checks.siteUrlConfigured &&
    checks.supabaseUrlConfigured &&
    checks.supabaseAnonKeyConfigured &&
    checks.serviceRoleKeyConfigured &&
    checks.adminEmailsConfigured &&
    checks.supabasePublicRead === "ok";

  return NextResponse.json({
    ok: requiredOk,
    environment: process.env.NODE_ENV,
    checkedAt: new Date().toISOString(),
    durationMs: Date.now() - startedAt,
    checks,
    notes: {
      supabasePublicRead: supabaseMessage,
      storage: `Bucket esperado: ${storageBucket}.`,
      security: "Esta ruta solo expone estados booleanos; no expone llaves ni secretos."
    }
  });
}
