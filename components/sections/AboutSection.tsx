import { PortableText } from "@portabletext/react";
import { Cpu, GraduationCap, MapPin, Rocket, Sparkles } from "lucide-react";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

const ABOUT_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  fullBio,
  stats,
  location
}`);

const bioComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-3 leading-relaxed text-muted-foreground">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium text-foreground">{children}</strong>
    ),
  },
};

export async function AboutSection() {
  const { data: profile } = await sanityFetch({ query: ABOUT_QUERY });
  if (!profile) return null;

  const stats = profile.stats ?? [];

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground">Get to know me better</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:auto-rows-[minmax(0,1fr)]">
          {/* Bio - large tile */}
          <div className="col-span-2 md:row-span-2 flex flex-col rounded-2xl border border-border bg-card/50 p-6 md:p-8">
            <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
              <Sparkles className="h-4 w-4" /> Who I am
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {profile.fullBio && (
                <PortableText value={profile.fullBio} components={bioComponents} />
              )}
            </div>
          </div>

          {/* First two stats (right column on desktop) */}
          {stats.slice(0, 2).map((s) => (
            <div
              key={s.label}
              className="flex flex-col justify-center rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-6"
            >
              <div className="text-3xl font-bold text-primary">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}

          {/* Currently */}
          <div className="col-span-2 rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              <span className="font-semibold">Currently</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Building at the intersection of AI, embedded systems, and
              full-stack web - and open to co-op and new-grad opportunities.
            </p>
          </div>

          {/* Remaining stats */}
          {stats.slice(2).map((s) => (
            <div
              key={s.label}
              className="flex flex-col justify-center rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-6"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}

          {/* Quick facts */}
          <div className="col-span-2 md:col-span-3 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-border bg-card/50 px-6 py-5 text-sm text-muted-foreground">
            {profile.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> {profile.location}
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" /> McMaster
              University - Computer Engineering (Co-op)
            </span>
            <span className="inline-flex items-center gap-2">
              <Cpu className="h-4 w-4 text-primary" /> AI · Embedded · Web
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
