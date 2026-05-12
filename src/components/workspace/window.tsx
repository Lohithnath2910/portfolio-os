"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useDragControls,
} from "motion/react";

import { Resizable } from "re-resizable";

import { GlassPanel } from "@/components/ui/glass-panel";
import { ProjectsWindow } from "@/components/workspace/windows/projects-window";

import { rafThrottle } from "@/lib/throttle";

import { useWorkspaceStore } from "@/store/workspace-store";

import { WorkspaceWindow } from "@/types/window";

type WindowProps = {
  window: WorkspaceWindow;
};

const RESIZE_MIN = {
  width: 520,
  height: 420,
};

const RESIZE_MAX = {
  width: 1100,
  height: 760,
};

const BOUNCE_DISTANCE = 60;

export const Window = memo(
  function Window({
    window: windowData,
  }: WindowProps) {
    const {
      closeWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
      windows,
    } = useWorkspaceStore();

    const dragControls =
      useDragControls();

    const [
      isResizing,
      setIsResizing,
    ] = useState(false);

    const resizeUpdateRef =
      useRef(
        rafThrottle(
          (
            id: string,
            width: number,
            height: number,
          ) => {
            updateWindowSize(
              id,
              width,
              height,
            );
          },
        ),
      );

    const highestZ = Math.max(
      0,
      ...windows.map(
        (item) => item.zIndex,
      ),
    );

    const isFocused =
      windowData.zIndex ===
      highestZ;

    const getViewportDims =
      useCallback(() => {
        if (
          typeof globalThis ===
          "undefined"
        ) {
          return {
            width: 1920,
            height: 1080,
          };
        }

        return {
          width:
            globalThis.innerWidth ||
            1920,

          height:
            globalThis.innerHeight ||
            1080,
        };
      }, []);

    const calculateBounceTarget =
      useCallback(
        (
          x: number,
          y: number,
          width: number,
          height: number,
        ) => {
          const viewport =
            getViewportDims();

          let bounceX = x;
          let bounceY = y;

          if (
            x + width <
            BOUNCE_DISTANCE
          ) {
            bounceX =
              BOUNCE_DISTANCE -
              width;
          } else if (
            x >
            viewport.width -
              BOUNCE_DISTANCE
          ) {
            bounceX =
              viewport.width -
              BOUNCE_DISTANCE;
          }

          if (
            y + height <
            BOUNCE_DISTANCE
          ) {
            bounceY =
              BOUNCE_DISTANCE -
              height;
          } else if (
            y >
            viewport.height -
              BOUNCE_DISTANCE
          ) {
            bounceY =
              viewport.height -
              BOUNCE_DISTANCE;
          }

          return {
            x: bounceX,
            y: bounceY,
          };
        },
        [getViewportDims],
      );

    useEffect(() => {
      const target =
        calculateBounceTarget(
          windowData.x,
          windowData.y,
          windowData.width,
          windowData.height,
        );

      const isOutOfBounds =
        target.x !==
          windowData.x ||
        target.y !==
          windowData.y;

      if (isOutOfBounds) {
        updateWindowPosition(
          windowData.id,
          target.x,
          target.y,
        );
      }
    }, [
      windowData.x,
      windowData.y,
      windowData.width,
      windowData.height,
      calculateBounceTarget,
      windowData.id,
      updateWindowPosition,
    ]);

    return (
      <motion.div
        drag={!isResizing}
        dragListener={false}
        dragControls={
          dragControls
        }
        dragMomentum={false}
        dragElastic={0.12}
        dragPropagation={false}
        suppressHydrationWarning
        onPointerDown={() => {
          if (!isResizing) {
            focusWindow(
              windowData.id,
            );
          }
        }}
        onDragEnd={(
          _,
          info,
        ) => {
          if (isResizing)
            return;

          const newX =
            windowData.x +
            info.offset.x;

          const newY =
            windowData.y +
            info.offset.y;

          updateWindowPosition(
            windowData.id,
            newX,
            newY,
          );
        }}
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          x: windowData.x,
          y: windowData.y,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
        }}
        transition={{
          opacity: {
            duration: 0.22,
            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          },

          scale: {
            duration: 0.22,
            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          },

          x: {
            type: "spring",
            stiffness: 340,
            damping: 30,
            mass: 1,
          },

          y: {
            type: "spring",
            stiffness: 340,
            damping: 30,
            mass: 1,
          },
        }}
        style={{
          zIndex:
            windowData.zIndex,
          willChange:
            "transform",
        }}
        className="absolute left-0 top-0"
      >
        <Resizable
          defaultSize={{
            width:
              windowData.width,
            height:
              windowData.height,
          }}
          size={{
            width:
              windowData.width,
            height:
              windowData.height,
          }}
          minWidth={
            RESIZE_MIN.width
          }
          maxWidth={
            RESIZE_MAX.width
          }
          minHeight={
            RESIZE_MIN.height
          }
          maxHeight={
            RESIZE_MAX.height
          }
          enable={{
            right: true,
            bottom: true,
            bottomRight: true,
          }}
          handleStyles={{
            right: {
              width: "10px",
              right: "-5px",
              cursor:
                "ew-resize",
            },

            bottom: {
              height: "10px",
              bottom: "-5px",
              cursor:
                "ns-resize",
            },

            bottomRight: {
              width: "20px",
              height: "20px",
              right: "-3px",
              bottom: "-3px",
              cursor:
                "nwse-resize",
            },
          }}
          onResizeStart={() => {
            setIsResizing(
              true,
            );
          }}
          onResizeStop={() => {
            setIsResizing(
              false,
            );
          }}
          onResize={(
            _event,
            _direction,
            ref,
          ) => {
            resizeUpdateRef.current(
              windowData.id,
              ref.offsetWidth,
              ref.offsetHeight,
            );
          }}
        >
          <GlassPanel
            suppressHydrationWarning
            className={`
              relative h-full w-full overflow-hidden
              transition-all duration-300
              ${
                isFocused
                  ? "opacity-100"
                  : "opacity-[0.82]"
              }
            `}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_38%)]" />

            {!isFocused && (
              <div className="absolute inset-0 bg-black/18 backdrop-blur-[1px]" />
            )}

            <div
              className="relative z-40 flex cursor-grab items-center justify-between border-b border-white/5 px-6 py-4 active:cursor-grabbing"
              onPointerDown={(
                event,
              ) => {
                if (
                  event.target instanceof HTMLElement &&
                  event.target.closest(
                    "button",
                  )
                ) {
                  return;
                }

                dragControls.start(
                  event,
                );
              }}
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onMouseDown={(
                    event,
                  ) => {
                    event.stopPropagation();

                    closeWindow(
                      windowData.id,
                    );
                  }}
                  className="relative z-50 h-3 w-3 rounded-full bg-red-400/90 shadow-[0_0_0px_rgba(248,113,113,0)] transition-all duration-200 hover:scale-125 hover:bg-red-300 hover:shadow-[0_0_12px_rgba(248,113,113,0.45)]"
                />

                <div className="h-3 w-3 rounded-full bg-amber-300/90" />

                <div className="h-3 w-3 rounded-full bg-emerald-400/90" />
              </div>

              <p className="text-[11px] tracking-[0.22em] text-zinc-600">
                {windowData.type.toUpperCase()}
              </p>

              <div className="w-10" />
            </div>

            {windowData.type ===
            "projects" ? (
              <ProjectsWindow />
            ) : (
              <div className="flex h-[calc(100%-57px)] flex-col justify-between px-[clamp(1.5rem,2cqi,3rem)] pb-[clamp(1.5rem,2cqi,3rem)] pt-[clamp(2rem,3cqi,4rem)]">
                <div>
                  <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-zinc-600">
                    SYSTEM
                    WORKSPACE
                  </p>

                  <h1 className="max-w-[16ch] text-[clamp(2.8rem,6cqi,5rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-zinc-100">
                    {windowData.type ===
                      "about" &&
                      "Engineering systems with calm precision."}

                    {windowData.type ===
                      "experience" &&
                      "Designing scalable systems with product thinking."}

                    {windowData.type ===
                      "terminal" &&
                      "Command-driven interaction for intelligent workflows."}
                  </h1>

                  <p className="mt-10 max-w-[60ch] text-[clamp(0.92rem,1.1cqi,1rem)] leading-[1.9] text-zinc-400">
                    Building premium software experiences across frontend
                    systems, AI tooling, infrastructure, product engineering,
                    and immersive interaction design.
                  </p>
                </div>

                <div className="flex items-end justify-between gap-10">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-600">
                      CURRENT
                      FOCUS
                    </p>

                    <p className="mt-3 max-w-[34ch] text-[clamp(0.82rem,1cqi,0.95rem)] leading-7 text-zinc-300">
                      Full-stack systems, AI engineering, spatial interfaces,
                      scalable architecture, and product-focused engineering.
                    </p>
                  </div>

                  <p className="font-[var(--font-handwritten)] text-[clamp(1.8rem,2cqi,2.6rem)] text-zinc-500">
                    built with
                    intent
                  </p>
                </div>
              </div>
            )}
          </GlassPanel>
        </Resizable>
      </motion.div>
    );
  },
);