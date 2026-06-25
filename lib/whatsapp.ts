import type { Profile } from "@/types";

const CONTACT_FALLBACK = "/contacto";

export function normalizeWhatsAppNumber(value?: string | null) {
  if (!value) return "";

  const trimmed = value.trim();
  if (!trimmed || trimmed === "#") return "";

  try {
    const url = new URL(trimmed);
    const waPathMatch = url.hostname.includes("wa.me") ? url.pathname.replace(/^\//, "") : "";
    const phoneParam = url.searchParams.get("phone") || "";
    const candidate = waPathMatch || phoneParam;
    return candidate.replace(/\D/g, "");
  } catch {
    return trimmed.replace(/\D/g, "");
  }
}

export function buildWhatsAppUrl(whatsappValue: string | null | undefined, message: string) {
  const phone = normalizeWhatsAppNumber(whatsappValue);
  if (!phone) return CONTACT_FALLBACK;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getContactHref(profile: Pick<Profile, "whatsappUrl"> | null | undefined, message: string) {
  return buildWhatsAppUrl(profile?.whatsappUrl, message);
}

export function hasWhatsApp(profile: Pick<Profile, "whatsappUrl"> | null | undefined) {
  return Boolean(normalizeWhatsAppNumber(profile?.whatsappUrl));
}

export function serviceWhatsAppMessage(ctaText: string) {
  return `Hola, quiero ${ctaText.trim() || "hablar de un servicio"}`;
}

export const HERO_WHATSAPP_MESSAGE = "Hola, quiero hablarte de una idea";
export const PROJECT_WHATSAPP_MESSAGE_PREFIX = "Hola, vi tu proyecto";
export const CONTACT_WHATSAPP_MESSAGE = "Hola, vi tu web y quiero hablar contigo sobre un proyecto";
