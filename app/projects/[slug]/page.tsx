import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

export const dynamic = "force-dynamic";

const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  title,
  tagline,
  category,
  overview,
  highlights,
  liveUrl,
  githubUrl,
  coverImage,
  technologies[]->{name}
}`);

const CATEGORY_LABEL: Record<string, string> = {
  "ai-ml": "AI / ML",
  "web-app": "Web App",
  "mobile-app": "Mobile",
  "api-backend": "Backend",
  devops: "DevOps",
  "open-source": "Open Source",
  "cli-tool": "CLI",
  "desktop-app": "Desktop",
  game: "Game",
  other: "Project",
};

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
  });

  if (!project) notFound();

  const cover = project.coverImage
    ? urlFor(project.coverImage).width(1400).height(700).url()
    : null;

  return (
    <main className="min-h-screen px-6 py-16 md:py-24">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>

        <div className="mt-6">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            {CATEGORY_LABEL[project.category ?? "other"] ?? project.category}
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
            {project.title}
          </h1>
          {project.tagline && (
            <p className="mt-3 text-lg text-muted-foreground">
              {project.tagline}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Live Demo <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-accent"
            >
              <Github className="h-4 w-4" /> View Code
            </Link>
          )}
        </div>

        {cover && (
          <div className="relative mt-10 aspect-[2/1] overflow-hidden rounded-2xl border border-border">
            <Image
              src={cover}
              alt={project.title || "Project"}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {project.overview && (
          <section className="mt-10">
            <h2 className="text-sm font-mono uppercase tracking-widest text-primary">
              Overview
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {project.overview}
            </p>
          </section>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-mono uppercase tracking-widest text-primary">
              Highlights
            </h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((h, i) => (
                <li
                  key={`h-${i}`}
                  className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-mono uppercase tracking-widest text-primary">
              Built with
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t?.name}
                  className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground"
                >
                  {t?.name}
                </span>
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 border-t border-border pt-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all projects
          </Link>
        </div>
      </div>
    </main>
  );
}
