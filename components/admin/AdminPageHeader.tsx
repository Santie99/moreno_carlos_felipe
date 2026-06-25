import Link from "next/link";

export function AdminPageHeader({ title, description, actionHref, actionLabel }: { title: string; description: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">Panel privado</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{description}</p>
      </div>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-black text-slate-950 hover:bg-cyan-200">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
