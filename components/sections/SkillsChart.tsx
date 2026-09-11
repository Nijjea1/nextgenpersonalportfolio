"use client";

import {
  Accessibility,
  Boxes,
  Braces,
  CircuitBoard,
  Cloud,
  Code2,
  Cpu,
  Database,
  FlaskConical,
  Layout,
  Lightbulb,
  type LucideIcon,
  MessagesSquare,
  Sparkles,
  Users,
  Waypoints,
} from "lucide-react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import {
  siAngular,
  siC,
  siCapacitor,
  siClerk,
  siCplusplus,
  siDocker,
  siFigma,
  siFirebase,
  siFlutter,
  siGit,
  siGithubactions,
  siGooglecloud,
  siGraphql,
  siJavascript,
  siKubernetes,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siReact,
  siRedis,
  siSanity,
  siSupabase,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVercel,
  siVuedotjs,
} from "simple-icons";

interface Skill {
  name: string | null;
  category: string | null;
  color: string | null;
}
interface SkillsChartProps {
  skills: Skill[];
}
type SI = { path: string; hex: string };

const SI_MAP: Record<string, SI> = {
  react: siReact,
  "react native": siReact,
  "next.js": siNextdotjs,
  nextjs: siNextdotjs,
  "node.js": siNodedotjs,
  nodejs: siNodedotjs,
  typescript: siTypescript,
  javascript: siJavascript,
  "tailwind css": siTailwindcss,
  tailwindcss: siTailwindcss,
  postgresql: siPostgresql,
  mongodb: siMongodb,
  docker: siDocker,
  "docker & ecs": siDocker,
  "github actions": siGithubactions,
  git: siGit,
  "git & github": siGit,
  kubernetes: siKubernetes,
  firebase: siFirebase,
  supabase: siSupabase,
  vercel: siVercel,
  figma: siFigma,
  tensorflow: siTensorflow,
  "vue.js": siVuedotjs,
  angular: siAngular,
  flutter: siFlutter,
  "google cloud platform": siGooglecloud,
  java: siOpenjdk,
  redis: siRedis,
  graphql: siGraphql,
  capacitor: siCapacitor,
  c: siC,
  "c++": siCplusplus,
  sanity: siSanity,
  clerk: siClerk,
};

const LUCIDE_MAP: Record<string, LucideIcon> = {
  aws: Cloud,
  azure: Cloud,
  "openai api": Sparkles,
  "rest api design": Braces,
  websockets: Waypoints,
  "responsive design": Layout,
  "web accessibility": Accessibility,
  communication: MessagesSquare,
  "problem solving": Lightbulb,
  "technical leadership": Users,
  "object oriented design": Boxes,
  playwright: FlaskConical,
  matlab: Code2,
  "arm cortex-m4f": Cpu,
  arduino: CircuitBoard,
  verilog: Cpu,
  "html / css": Code2,
  sqlite: Database,
  numpy: Code2,
};

const CATEGORY_LABEL: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  "ai-ml": "AI / ML",
  database: "Databases",
  cloud: "Cloud",
  devops: "DevOps",
  mobile: "Mobile",
  testing: "Testing",
  design: "Design",
  tools: "Tools",
  "soft-skills": "Soft Skills",
  other: "Other",
};
const ORDER = [
  "frontend",
  "backend",
  "ai-ml",
  "database",
  "cloud",
  "devops",
  "mobile",
  "testing",
  "tools",
  "design",
  "soft-skills",
  "other",
];

function labelFor(c: string) {
  return (
    CATEGORY_LABEL[c] ??
    c.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")
  );
}
function safeColor(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b < 55 ? "currentColor" : `#${h}`;
}
// deterministic pseudo-random so SSR and client match (no hydration mismatch)
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function SkillBadge({
  skill,
  seed,
  progress,
  reduced,
}: {
  skill: Skill;
  seed: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const key = (skill.name || "").toLowerCase().trim();
  const si = SI_MAP[key];
  const Fallback = si ? null : (LUCIDE_MAP[key] ?? Code2);

  // scattered start position -> settles to 0 as you scroll
  const sx = (rand(seed) - 0.5) * 460;
  const sy = (rand(seed + 7.3) - 0.5) * 240;
  const srot = (rand(seed + 1.9) - 0.5) * 70;

  const x = useTransform(progress, [0, 0.85], [sx, 0]);
  const y = useTransform(progress, [0, 0.85], [sy, 0]);
  const rotate = useTransform(progress, [0, 0.85], [srot, 0]);
  const opacity = useTransform(progress, [0, 0.35], [0, 1]);

  return (
    <motion.span
      style={reduced ? undefined : { x, y, rotate, opacity }}
      className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm shadow-sm transition-colors hover:border-primary/50"
    >
      {si ? (
        <svg
          role="img"
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-muted-foreground"
          fill={safeColor(si.hex)}
        >
          <path d={si.path} />
        </svg>
      ) : (
        Fallback && (
          <Fallback className="h-4 w-4 shrink-0 text-muted-foreground" />
        )
      )}
      <span className="font-medium whitespace-nowrap">{skill.name}</span>
    </motion.span>
  );
}

export function SkillsChart({ skills }: SkillsChartProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  if (!skills || skills.length === 0) return null;

  const grouped = new Map<string, Skill[]>();
  for (const s of skills) {
    const c = s.category || "other";
    grouped.set(c, [...(grouped.get(c) || []), s]);
  }
  const categories = Array.from(grouped.entries()).sort(
    ([a], [b]) => (ORDER.indexOf(a) + 1 || 99) - (ORDER.indexOf(b) + 1 || 99),
  );

  let seed = 1;
  return (
    <div ref={ref} className="space-y-12">
      {categories.map(([category, list]) => (
        <div key={category}>
          <div className="mb-5 flex items-center gap-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {labelFor(category)}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            <span className="text-xs tabular-nums text-muted-foreground/60">
              {list.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {list.map((s) => {
              seed += 1;
              return (
                <SkillBadge
                  key={s.name}
                  skill={s}
                  seed={seed}
                  progress={scrollYProgress}
                  reduced={reduced}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
