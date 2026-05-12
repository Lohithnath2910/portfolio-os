"use client";

import { Window } from "./window";

import { useWorkspaceStore } from "@/store/workspace-store";

export function WindowManager() {
  const { windows } = useWorkspaceStore();

  return (
    <>
      {windows.map((window) => (
        <Window
          key={window.id}
          window={window}
        />
      ))}
    </>
  );
}