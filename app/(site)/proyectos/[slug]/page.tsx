import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getProfile, getProjectBySlug, getProjectImages, getPublishedProjects } from "@/lib/data";
import { breadcrumbSchema, buildMetadata, projectSchema } from "@/lib/seo";
import { getContactHref, PROJECT_WHATSAPP_MESSAGE_PREFIX } from "@/lib/whatsapp";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado"
    };
  }

  return buildMetadata({
    title: project.seoTitle,
    description: project.seoDescription,
    path: `/proyectos/${project.slug}`,
    image: project.ogImageUrl || project.coverImageUrl,
    keywords: [...project.tags, ...project.stack, project.category]
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const [profile, projectImages] = await Promise.all([
    getProfile(),
    getProjectImages(project.id)
  ]);
  const projectContactHref = getContactHref(profile, `${PROJECT_WHATSAPP_MESSAGE_PREFIX} ${project.title} y quiero hablar de algo parecido`);

  const sections = [
    { title: "Problema", content: project.problem },
    { title: "Solución", content: project.solution },
    { title: "Usuario objetivo", content: project.targetUser }
  ];

  const lists = [
    { title: "Funcionalidades", items: project.features },
    { title: "Decisiones de producto", items: project.productDecisions },
    { title: "Retos técnicos", items: project.technicalChallenges },
    { title: "Aprendizajes", items: project.learnings },
    { title: "Potencial", items: project.potential }
  ];

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            projectSchema(project),
            breadcrumbSchema([
              { name: "Inicio", path: "/" },
              { name: "Proyectos", path: "/proyectos" },
              { name: project.title, path: `/proyectos/${project.slug}` }
            ])
          ])
        }}
      />
      <section className="container-page py-12 md:py-20">
        <Link href="/proyectos" className="focus-ring rounded-full text-sm font-bold text-cyan-300 hover:text-cyan-100">
          ← Volver a proyectos
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>{project.category}</Badge>
              <Badge>{project.status}</Badge>
              <Badge>{project.highlightLevel}</Badge>
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-[-0.03em] text-white md:text-6xl">{project.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">{project.longDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={projectContactHref}>Hablar sobre este enfoque</ButtonLink>
              {project.demoUrl ? <ButtonLink href={project.demoUrl} variant="secondary">Ver demo</ButtonLink> : null}
            </div>
          </div>
          <div className="glass-card overflow-hidden rounded-[2.25rem] p-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-slate-900">
              <Image src={project.coverImageUrl} alt={`Mockup del proyecto ${project.title}`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-6 pb-10 md:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title} className="glass-card rounded-[2rem] p-6">
            <h2 className="text-xl font-black text-white">{section.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{section.content}</p>
          </div>
        ))}
      </section>

      <section className="container-page grid gap-6 py-10 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="glass-card h-fit rounded-[2rem] p-6">
          <h2 className="text-xl font-black text-white">Stack y tags</h2>
          <div className="mt-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full bg-white/8 px-3 py-1 text-xs font-semibold text-slate-300">{item}</span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Tags</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((item) => (
                <span key={item} className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{item}</span>
              ))}
            </div>
          </div>
        </aside>

        <div className="grid gap-6">
          {lists.map((list) => (
            <section key={list.title} className="glass-card rounded-[2rem] p-6">
              <h2 className="text-2xl font-black text-white">{list.title}</h2>
              <ul className="mt-5 grid gap-3">
                {list.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-cyan-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
      {projectImages.length > 0 ? (
        <section className="container-page py-10">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Galería</p>
            <h2 className="mt-3 text-3xl font-black text-white">Capturas y material visual</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {projectImages.map((image) => (
              <div key={image.id} className="glass-card overflow-hidden rounded-[2rem] p-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-slate-900">
                  <Image src={image.imageUrl} alt={image.altText} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" unoptimized={image.imageUrl.endsWith(".svg")} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="container-page pb-20 pt-8">
        <div className="glass-card grid gap-6 rounded-[2rem] p-8 md:grid-cols-[1.3fr_0.7fr] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Siguiente paso</p>
            <h2 className="mt-3 text-3xl font-black text-white">¿Quieres construir algo parecido?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">Puedo ayudarte a convertir una idea, proceso o necesidad de nicho en una primera versión funcional.</p>
          </div>
          <div className="md:text-right">
            <ButtonLink href={projectContactHref}>Hablemos por WhatsApp</ButtonLink>
          </div>
        </div>
      </section>

    </article>
  );
}
