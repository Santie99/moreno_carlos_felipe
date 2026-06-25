"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContactMessageStatus } from "@/types";

const statuses: ContactMessageStatus[] = ["Nuevo", "Leído", "Respondido", "En conversación", "Cerrado"];

export function MessageStatusSelect({ id, status }: { id: string; status: ContactMessageStatus }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  async function updateStatus(nextStatus: ContactMessageStatus) {
    setValue(nextStatus);
    setSaving(true);
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus })
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <select value={value} onChange={(event) => updateStatus(event.target.value as ContactMessageStatus)} disabled={saving} className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs font-bold text-white">
      {statuses.map((statusOption) => <option key={statusOption} value={statusOption}>{statusOption}</option>)}
    </select>
  );
}

export function MessageDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function deleteMessage() {
    if (!confirm("¿Eliminar este mensaje?")) return;
    setDeleting(true);
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setDeleting(false);
    router.refresh();
  }

  return <button type="button" onClick={deleteMessage} disabled={deleting} className="rounded-xl border border-red-400/30 px-3 py-2 text-xs font-bold text-red-100 hover:bg-red-500/10">{deleting ? "Eliminando..." : "Eliminar"}</button>;
}
