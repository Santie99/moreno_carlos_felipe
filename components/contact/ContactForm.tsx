"use client";

import { useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "mock" | "error";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  return (
    <form
      className="glass-card rounded-[2rem] p-6 md:p-8"
      onSubmit={async (event) => {
        event.preventDefault();
        setSubmitState("loading");
        setFeedback("");

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.get("name"),
              email: formData.get("email"),
              company: formData.get("company"),
              opportunityType: formData.get("opportunityType"),
              budget: formData.get("budget"),
              link: formData.get("link"),
              message: formData.get("message")
            })
          });

          const result = (await response.json()) as { ok?: boolean; saved?: boolean; message?: string };

          if (!response.ok || !result.ok) {
            throw new Error(result.message || "No se pudo enviar el mensaje.");
          }

          form.reset();
          setSubmitState(result.saved ? "success" : "mock");
          setFeedback(result.message || "Mensaje enviado correctamente.");
        } catch (error) {
          setSubmitState("error");
          setFeedback(error instanceof Error ? error.message : "No se pudo enviar el mensaje.");
        }
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Nombre
          <input name="name" className="focus-ring rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Email
          <input name="email" type="email" className="focus-ring rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100" required />
        </label>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Empresa o proyecto
          <input name="company" className="focus-ring rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100" placeholder="Opcional" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Tipo de oportunidad
          <select name="opportunityType" className="focus-ring rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100">
            <option>Freelance</option>
            <option>Empleo</option>
            <option>Proyecto web</option>
            <option>SaaS / alianza</option>
            <option>Consultoría</option>
            <option>Otro</option>
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Presupuesto aproximado
          <input name="budget" className="focus-ring rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100" placeholder="Opcional" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Link externo
          <input name="link" type="url" className="focus-ring rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100" placeholder="Opcional" />
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-bold text-slate-200">
        Mensaje
        <textarea
          name="message"
          className="focus-ring min-h-40 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100"
          placeholder="Cuéntame qué quieres construir, validar o mejorar."
          required
        />
      </label>

      <button
        type="submit"
        disabled={submitState === "loading"}
        className="focus-ring mt-6 rounded-full bg-cyan-300 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitState === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>

      {feedback ? (
        <p
          className={`mt-4 rounded-2xl border p-4 text-sm ${
            submitState === "error"
              ? "border-red-300/20 bg-red-300/10 text-red-100"
              : "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
          }`}
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
