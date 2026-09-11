"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface ExpSection {
  title: string;
  icon: string | null;
  bullets: string[];
}

export function ExperienceTabs({ sections }: { sections: ExpSection[] }) {
  const [active, setActive] = useState(0);
  const sec = sections[active] ?? sections[0];
  if (!sec) return null;

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {sections.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              active === i
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {s.icon ? `${s.icon} ` : ""}
            {s.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="space-y-2.5"
        >
          {sec.bullets.map((b, i) => (
            <li
              key={`${sec.title}-${i}`}
              className="flex gap-2.5 text-sm @md/card:text-base leading-relaxed text-muted-foreground"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{b}</span>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
