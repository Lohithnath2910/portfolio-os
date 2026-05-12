import { ProjectCard } from "@/types/project";

export const projectRegistry: ProjectCard[] = [
  {
    slug: "platform-foundation",
    title: "Platform Foundation",
    summary:
      "An operating layer for premium portfolio experiences, built to support spatial windows, content hubs, and future case-study depth.",
    phase: "architecture",
    stack: ["Next.js", "React", "TypeScript", "Zustand", "Motion"],
    sections: [
      {
        title: "System Role",
        description:
          "Defines the core desktop semantics, window behavior, and orchestration patterns that every future project window will reuse.",
      },
      {
        title: "Scaling Path",
        description:
          "Gives the Projects hub a typed source of truth so it can grow into screenshot galleries, architecture maps, and deep-dive views without rewriting layout logic.",
      },
    ],
  },
  {
    slug: "case-study-shell",
    title: "Case Study Shell",
    summary:
      "A reusable project presentation shell for immersive engineering writeups, release notes, and visual evidence.",
    phase: "build",
    stack: ["Data-driven layout", "Responsive typography", "Glass surfaces"],
    sections: [
      {
        title: "Presentation Model",
        description:
          "Separates overview, architecture, outcomes, and supporting media so each case study can expand independently.",
      },
      {
        title: "Future Input",
        description:
          "Ready for screenshots, metrics, diagrams, and link-outs once real project content is connected.",
      },
    ],
  },
  {
    slug: "ambient-workspace",
    title: "Ambient Workspace",
    summary:
      "A restrained motion and lighting layer that supports spatial depth without overwhelming the content.",
    phase: "scale",
    stack: ["Motion", "Glassmorphism", "GPU-friendly transforms"],
    sections: [
      {
        title: "Visual Intent",
        description:
          "Keeps the interface calm while still giving windows and metadata a premium sense of atmosphere.",
      },
      {
        title: "Performance Bias",
        description:
          "Limits the system to light ambient drift and composited motion so interaction stays native-feeling at high refresh rates.",
      },
    ],
  },
  {
    slug: "terminal-engine",
    title: "Terminal Engine",
    summary:
      "A command-driven surface for real parser logic, curated outputs, and progressively richer workflow actions.",
    phase: "research",
    stack: ["Parser", "Command registry", "History"],
    sections: [
      {
        title: "Core Loop",
        description:
          "Accepts typed commands, routes them through a registry, and renders context-aware responses with consistent motion and spacing.",
      },
      {
        title: "Expansion Path",
        description:
          "Future commands can connect to project data, workspace state, and contact actions without changing the terminal shell model.",
      },
    ],
  },
  {
    slug: "workspace-persistence",
    title: "Workspace Persistence",
    summary:
      "A session-aware layer that will save window state, restore layouts, and keep the workspace feeling continuous.",
    phase: "scale",
    stack: ["Zustand", "Local storage", "Layout restoration"],
    sections: [
      {
        title: "State Model",
        description:
          "Persists open windows, focus order, and spatial coordinates so the desktop can return exactly as the user left it.",
      },
      {
        title: "Product Goal",
        description:
          "Turns the workspace into a durable environment rather than a one-time showcase.",
      },
    ],
  },
  {
    slug: "ambient-top-bar",
    title: "Ambient Top Bar",
    summary:
      "A restrained status layer for time, mode, and workspace metadata with subtle environmental presence.",
    phase: "architecture",
    stack: ["Metadata", "Environment", "Layout restraint"],
    sections: [
      {
        title: "Role",
        description:
          "Carries minimal operational context without competing with the workspace content.",
      },
      {
        title: "Design Constraint",
        description:
          "Stays visually light so it can live above the desktop without feeling like a dashboard strip.",
      },
    ],
  },
  {
    slug: "content-architecture",
    title: "Content Architecture",
    summary:
      "A layered content model that keeps recruiter readability first while preserving engineering depth on demand.",
    phase: "research",
    stack: ["Layering", "Narrative system", "Expandable depth"],
    sections: [
      {
        title: "Layer One",
        description:
          "Immediate project summary, intent, and outcome framing for fast scanning.",
      },
      {
        title: "Layer Two",
        description:
          "Expandable technical sections for architecture, tradeoffs, and systems thinking.",
      },
    ],
  },
];