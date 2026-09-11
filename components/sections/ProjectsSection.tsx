import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { type ProjectItem, ProjectsGrid } from "./ProjectsGrid";

const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && featured == true] | order(order asc)[0...30]{
  title,
  slug,
  tagline,
  category,
  liveUrl,
  githubUrl,
  coverImage,
  technologies[]->{name, category, color}
}`);

export async function ProjectsSection() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  if (!projects || projects.length === 0) {
    return null;
  }

  const items: ProjectItem[] = projects.map((p) => ({
    title: p.title,
    slug: p.slug?.current ?? null,
    tagline: p.tagline,
    category: p.category,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    coverUrl: p.coverImage
      ? urlFor(p.coverImage).width(700).height(440).url()
      : null,
    technologies: (p.technologies ?? [])
      .map((t) => t?.name)
      .filter((n): n is string => !!n),
  }));

  return (
    <section id="projects" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground">Some of my best work</p>
        </div>

        <ProjectsGrid projects={items} />
      </div>
    </section>
  );
}
