export type ProjectPhase =
  | "architecture"
  | "build"
  | "scale"
  | "research";

export type ProjectSection = {
  title: string;
  description: string;
};

export type ProjectCard = {
  slug: string;
  title: string;
  summary: string;
  phase: ProjectPhase;
  stack: string[];
  sections: ProjectSection[];
};