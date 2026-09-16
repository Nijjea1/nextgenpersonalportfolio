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
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">About Me</h2>
          <p className="text-lg text-muted-foreground">Get to know me better</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-start">
          {/* Bio - left */}
          <div className="flex flex-col rounded-2xl border border-border bg-card/50 p-6">
            <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
              <Sparkles className="h-4 w-4" /> Who I am
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {profile.fullBio && (
                <PortableText value={profile.fullBio} components={bioComponents} />
              )}
            </div>
          </div>

          {/* Right column: stats grid + currently */}
          <div className="flex flex-col gap-4">
            {stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-5"
                  >
                    <div className="text-2xl font-bold text-primary">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3.5">
              <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm leading-snug text-muted-foreground">
                <span className="font-semibold text-foreground">Currently: </span>
                Building at the intersection of AI, embedded systems, and
                full-stack web, and open to co-op and new-grad opportunities.
              </p>
            </div>
          </div>

          {/* Quick facts - full width strip */}
          <div className="md:col-span-2 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-border bg-card/50 px-6 py-4 text-sm text-muted-foreground">
            {profile.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> {profile.location}
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" /> McMaster - Computer
              Engineering (Co-op)
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
