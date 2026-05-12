import { create } from "zustand";

import {
  WindowType,
  WorkspaceWindow,
} from "@/types/window";

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
        set({
          windows:
            get().windows.map(
              (window) =>
                window.id === id
                  ? {
                      ...window,
                      x,
                      y,
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