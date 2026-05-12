export type WindowType =
  | "about"
  | "projects"
  | "experience"
  | "terminal";

export type WorkspaceWindow = {
  id: string;
  type: WindowType;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
};