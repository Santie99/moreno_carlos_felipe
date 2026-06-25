import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    title: "Entender el problema",
    description: "Defino usuario, contexto, datos disponibles, fricción actual y resultado esperado."
  },
  {
    title: "Diseñar el flujo",
    description: "Convierto la idea en pantallas, estados, entidades y acciones claras para el usuario."
  },
  {
    title: "Construir MVP",
    description: "Desarrollo una primera versión funcional con foco en utilidad, velocidad y claridad."
  },
  {
    title: "Medir y mejorar",
    description: "Reviso uso, feedback y oportunidades de mejora para convertir el prototipo en producto."
  }
];

export function Process() {
  return (
    <section className="container-page py-20">
      <SectionHeader
        eyebrow="Proceso"
        title="Trabajo como builder: problema, flujo, sistema y mejora."
        description="Mi enfoque no empieza por pantallas bonitas. Empieza por entender qué decisión, registro o acción necesita volverse más simple."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.title} className="glass-card rounded-[2rem] p-6">
            <div className="grid size-12 place-items-center rounded-2xl bg-cyan-300 text-lg font-black text-slate-950">{index + 1}</div>
            <h3 className="mt-5 text-xl font-black text-white">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
