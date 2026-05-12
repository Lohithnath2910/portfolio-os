import { create } from "zustand";

import {
  WindowType,
  WorkspaceWindow,
} from "@/types/window";

const MIN_VISIBLE = 60; // Minimum pixels visible for window dragging

const getViewportBounds = () => {
  if (typeof window === "undefined") {
    return {
      width: 1920,
      height: 1080,
    };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

/**
 * Constrains window position within viewport bounds
 * Ensures window can always be dragged/interacted with
 */
const constrainPosition = (
  x: number,
  y: number,
  width: number,
  height: number,
): { x: number; y: number } => {
  const bounds = getViewportBounds();
  const minX = -(width - MIN_VISIBLE);
  const maxX = bounds.width - MIN_VISIBLE;
  const minY = -(height - MIN_VISIBLE);
  const maxY = bounds.height - MIN_VISIBLE;

  return {
    x: Math.max(minX, Math.min(x, maxX)),
    y: Math.max(minY, Math.min(y, maxY)),
  };
};

type WorkspaceState = {
  windows: WorkspaceWindow[];

  openWindow: (
    type: WindowType,
  ) => void;

  closeWindow: (
    id: string,
  ) => void;

  focusWindow: (
    id: string,
  ) => void;

  updateWindowPosition: (
    id: string,
    x: number,
    y: number,
  ) => void;

  updateWindowSize: (
    id: string,
    width: number,
    height: number,
  ) => void;
};

const getCenteredPosition =
  () => {
    if (
      typeof window ===
      "undefined"
    ) {
      return {
        x: 320,
        y: 120,
      };
    }

    return {
      x:
        window.innerWidth / 2 -
        340,

      y:
        window.innerHeight / 2 -
        260,
    };
  };

const initialPosition =
  getCenteredPosition();

const INITIAL_WINDOW: WorkspaceWindow =
  {
    id: "about-window",
    type: "about",
    x: initialPosition.x,
    y: initialPosition.y,
    width: 680,
    height: 520,
    zIndex: 10,
  };

export const useWorkspaceStore =
  create<WorkspaceState>(
    (set, get) => ({
      windows: [INITIAL_WINDOW],

      openWindow: (type) => {
        const existing =
          get().windows.find(
            (window) =>
              window.type === type,
          );

        const highestZ =
          Math.max(
            0,
            ...get().windows.map(
              (window) =>
                window.zIndex,
            ),
          );

        if (existing) {
          set({
            windows:
              get().windows.map(
                (window) =>
                  window.id ===
                  existing.id
                    ? {
                        ...window,
                        zIndex:
                          highestZ + 1,
                      }
                    : window,
              ),
          });

          return;
        }

        const centered =
          getCenteredPosition();

        const newWindow: WorkspaceWindow =
          {
            id: `${type}-${Date.now()}`,
            type,
            x: centered.x,
            y: centered.y,
            width: 680,
            height: 520,
            zIndex:
              highestZ + 1,
          };

        set({
          windows: [
            ...get().windows,
            newWindow,
          ],
        });
      },

      closeWindow: (id) => {
        set({
          windows:
            get().windows.filter(
              (window) =>
                window.id !== id,
            ),
        });
      },

      focusWindow: (id) => {
        const highestZ =
          Math.max(
            0,
            ...get().windows.map(
              (window) =>
                window.zIndex,
            ),
          );

        set({
          windows:
            get().windows.map(
              (window) =>
                window.id === id
                  ? {
                      ...window,
                      zIndex:
                        highestZ + 1,
                    }
                  : window,
            ),
        });
      },

      updateWindowPosition: (
        id,
        x,
        y,
      ) => {
        const windowToUpdate =
          get().windows.find(
            (w) => w.id === id,
          );

        if (!windowToUpdate) return;

        const {
          x: constrainedX,
          y: constrainedY,
        } = constrainPosition(
          x,
          y,
          windowToUpdate.width,
          windowToUpdate.height,
        );

        set({
          windows:
            get().windows.map(
              (window) =>
                window.id === id
                  ? {
                      ...window,
                      x: constrainedX,
                      y: constrainedY,
                    }
                  : window,
            ),
        });
      },

      updateWindowSize: (
        id,
        width,
        height,
      ) => {
        set({
          windows:
            get().windows.map(
              (window) =>
                window.id === id
                  ? {
                      ...window,
                      width,
                      height,
                    }
                  : window,
            ),
        });
      },
    }),
  );