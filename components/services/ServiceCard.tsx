import Link from "next/link";
import { getContactHref, serviceWhatsAppMessage } from "@/lib/whatsapp";
import type { Profile, Service } from "@/types";

export function ServiceCard({ service, profile }: { service: Service; profile: Pick<Profile, "whatsappUrl"> }) {
  const href = getContactHref(profile, service.whatsappMessage || serviceWhatsAppMessage(service.ctaText));
  const isExternal = href.startsWith("http");

  return (
    <article className="glass-card flex h-full flex-col rounded-[2rem] p-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Servicio</p>
        <h3 className="mt-3 text-2xl font-black text-white">{service.title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-300">{service.shortDescription}</p>
      </div>

      <div className="mt-6 space-y-4 text-sm text-slate-300">
        <div>
          <p className="font-bold text-white">Ideal para</p>
          <p className="mt-1 leading-6">{service.idealClient}</p>
        </div>
        <div>
          <p className="font-bold text-white">Entregables</p>
          <ul className="mt-2 grid gap-2">
            {service.deliverables.slice(0, 4).map((item) => (
              <li key={item} className="flex gap-2"><span className="text-cyan-300">•</span>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <p className="text-lg font-black text-cyan-100">{service.priceFrom}</p>
        <Link
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="focus-ring mt-4 inline-flex w-full items-center justify-center rounded-full border border-cyan-200 bg-cyan-300 px-5 py-3 text-center text-sm font-black text-slate-950 shadow-[0_14px_36px_rgba(103,232,249,0.16)] transition hover:bg-cyan-200"
        >
          {service.ctaText}
        </Link>
      </div>
    </article>
  );
}
