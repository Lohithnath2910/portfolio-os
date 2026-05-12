"use client";

import { useLayoutEffect, useRef } from "react";

import { Window } from "./window";

import { useWorkspaceStore } from "@/store/workspace-store";

export function WindowManager() {
  const { windows, updateWindowPosition } =
    useWorkspaceStore();
  const hasCenteredInitialWindowRef =
    useRef(false);

  useLayoutEffect(() => {
    if (hasCenteredInitialWindowRef.current) {
      return;
    }

    const initialWindow = windows.find(
      (workspaceWindow) =>
        workspaceWindow.id === "about-window",
    );

    if (!initialWindow || typeof window === "undefined") {
      return;
    }

    const centeredX =
      window.innerWidth / 2 -
      initialWindow.width / 2;
    const centeredY =
      window.innerHeight / 2 -
      initialWindow.height / 2;

    if (
      initialWindow.x !== centeredX ||
      initialWindow.y !== centeredY
    ) {
      updateWindowPosition(
        initialWindow.id,
        centeredX,
        centeredY,
      );
    }

    hasCenteredInitialWindowRef.current = true;
  }, [updateWindowPosition, windows]);

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