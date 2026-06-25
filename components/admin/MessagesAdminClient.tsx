"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { MessageDeleteButton, MessageStatusSelect } from "@/components/admin/MessageActions";
import type { ContactMessage } from "@/types";

export function MessagesAdminClient() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((response) => response.json())
      .then((data) => setMessages(data.messages || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <AdminPageHeader title="Mensajes" description="Revisa y clasifica los contactos recibidos desde el formulario público." />
      {loading ? <div className="glass-card rounded-3xl p-8 text-slate-300">Cargando mensajes...</div> : (
        <div className="space-y-4">
          {messages.length ? messages.map((message) => (
            <article key={message.id} className="glass-card rounded-3xl p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 text-xs font-bold">
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-cyan-200">{message.opportunityType}</span>
                    {message.budget ? <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">{message.budget}</span> : null}
                    <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">{new Date(message.createdAt).toLocaleString("es-CO")}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-black text-white">{message.name}</h2>
                  <p className="mt-1 text-sm text-cyan-200">{message.email}</p>
                  {message.company ? <p className="mt-1 text-sm text-slate-400">Empresa/proyecto: {message.company}</p> : null}
                  {message.link ? <p className="mt-1 text-sm text-slate-400">Link: {message.link}</p> : null}
                  <p className="mt-4 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-slate-300">{message.message}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <MessageStatusSelect id={message.id} status={message.status} />
                  <MessageDeleteButton id={message.id} />
                </div>
              </div>
            </article>
          )) : <div className="glass-card rounded-3xl p-8 text-slate-300">No hay mensajes todavía.</div>}
        </div>
      )}
    </>
  );
}
