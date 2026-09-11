"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface ProjectItem {
  title: string | null;
  slug: string | null;
  tagline: string | null;
  category: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  coverUrl: string | null;
  technologies: string[];
}

function Card({ p }: { p: ProjectItem }) {
  return (
    <div className="@container/card group bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {p.coverUrl ? (
          <Image
            src={p.coverUrl}
            alt={p.title || "Project image"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        )}
      </div>
      <div className="p-4 @md/card:p-6 space-y-3 @md/card:space-y-4">
        <div>
          {p.category && (
            <span className="mb-2 inline-block text-xs px-2 py-0.5 @md/card:py-1 rounded-full bg-primary/10 text-primary">
              {p.category}
            </span>
          )}
          <h3 className="text-lg @md/card:text-xl font-semibold mb-2 line-clamp-2">
            {p.title || "Untitled Project"}
          </h3>
          <p className="text-muted-foreground text-xs @md/card:text-sm line-clamp-2">
            {p.tagline}
          </p>
        </div>

        {p.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 @md/card:gap-2">
            {p.technologies.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted"
              >
                {t}
              </span>
            ))}
            {p.technologies.length > 4 && (
              <span className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted">
                +{p.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col @xs/card:flex-row gap-2 @xs/card:gap-3 pt-2">
          {p.liveUrl && (
            <Link
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-2 @md/card:px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs @md/card:text-sm"
            >
              Live Demo
            </Link>
          )}
          {p.githubUrl && (
            <Link
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 @md/card:px-4 rounded-lg border hover:bg-accent transition-colors text-xs @md/card:text-sm text-center"
            >
              GitHub
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  const [showAll, setShowAll] = useState(false);
  const top = projects.slice(0, 3);
  const rest = projects.slice(3);

  return (
    <div className="@container">
      <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8">
        {top.map((p) => (
          <Card key={p.slug ?? p.title} p={p} />
        ))}
      </div>

      <AnimatePresence initial={false}>
        {showAll && rest.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8 pt-8">
              {rest.map((p) => (
                <Card key={p.slug ?? p.title} p={p} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {rest.length > 0 && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/5 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            {showAll ? "Show less" : `Show ${rest.length} more projects`}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
