"use client";

import { memo, useCallback, useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Resizable } from "re-resizable";

import { GlassPanel } from "@/components/ui/glass-panel";
import { useWorkspaceStore } from "@/store/workspace-store";
import { WorkspaceWindow } from "@/types/window";
import { rafThrottle } from "@/lib/throttle";

type WindowProps = {
  window: WorkspaceWindow;
};

// Resize constraints
const RESIZE_MIN = {
  width: 520,
  height: 420,
};

const RESIZE_MAX = {
  width: 1100,
  height: 760,
};

// Viewport constraints for bouncing back
const BOUNCE_DISTANCE = 60; // Min pixels visible

export const Window = memo(function Window({
  window: windowData,
}: WindowProps) {
  const {
    closeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    windows,
  } = useWorkspaceStore();

  // Track if currently resizing to disable drag
  const [isResizing, setIsResizing] = useState(false);
  const resizeUpdateRef = useRef(
    rafThrottle((
      id: string,
      width: number,
      height: number,
    ) => {
      updateWindowSize(id, width, height);
    }),
  );

  const highestZ = Math.max(
    0,
    ...windows.map(
      (item) => item.zIndex,
    ),
  );

  const isFocused =
    windowData.zIndex === highestZ;

  // Get viewport dimensions
  const getViewportDims = useCallback(
    () => {
      if (typeof globalThis ===
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
    },
    [],
  );

  // Calculate if window is out of bounds and return bounce target
  const calculateBounceTarget = useCallback(
    (
      x: number,
      y: number,
      width: number,
      height: number,
    ): { x: number; y: number } => {
      const viewport =
        getViewportDims();

      let bounceX = x;
      let bounceY = y;

      // Check horizontal bounds
      if (
        x + width <
        BOUNCE_DISTANCE
      ) {
        // Too far left
        bounceX =
          BOUNCE_DISTANCE -
          width;
      } else if (
        x >
        viewport.width -
          BOUNCE_DISTANCE
      ) {
        // Too far right
        bounceX =
          viewport.width -
          BOUNCE_DISTANCE;
      }

      // Check vertical bounds
      if (
        y + height <
        BOUNCE_DISTANCE
      ) {
        // Too far up
        bounceY =
          BOUNCE_DISTANCE -
          height;
      } else if (
        y >
        viewport.height -
          BOUNCE_DISTANCE
      ) {
        // Too far down
        bounceY =
          viewport.height -
          BOUNCE_DISTANCE;
      }

      return { x: bounceX, y: bounceY };
    },
    [getViewportDims],
  );

  // Monitor position and trigger bounce if out of bounds
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
      dragMomentum={false}
      dragElastic={0.15}
      suppressHydrationWarning
      onPointerDown={() => {
        if (!isResizing) {
          focusWindow(windowData.id);
        }
      }}
      onDragEnd={(_, info) => {
        if (isResizing) return;

        const newX =
          windowData.x + info.offset.x;
        const newY =
          windowData.y + info.offset.y;

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
          ease: [0.16, 1, 0.3, 1],
        },
        scale: {
          duration: 0.22,
          ease: [0.16, 1, 0.3, 1],
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
        zIndex: windowData.zIndex,
        cursor: "grab",
        willChange: "transform",
      }}
      className="absolute left-0 top-0 active:cursor-grabbing"
    >
      <Resizable
        defaultSize={{
          width: windowData.width,
          height: windowData.height,
        }}
        size={{
          width: windowData.width,
          height: windowData.height,
        }}
        minWidth={RESIZE_MIN.width}
        maxWidth={RESIZE_MAX.width}
        minHeight={RESIZE_MIN.height}
        maxHeight={RESIZE_MAX.height}
        enable={{
          bottomRight: true,
          top: false,
          left: false,
          topLeft: false,
          topRight: false,
          bottomLeft: false,
        }}
        handleStyles={{
          bottomRight: {
            width: "24px",
            height: "24px",
            right: "-2px",
            bottom: "-2px",
            cursor: "nwse-resize",
            background:
              "transparent",
            zIndex: 50,
          },
        }}
        handleClasses={{
          bottomRight:
            "group relative hover:opacity-100",
        }}
        onResizeStart={() => {
          setIsResizing(true);
        }}
        onResizeStop={() => {
          setIsResizing(false);
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
          className={`relative h-full w-full overflow-hidden transition-all duration-300 ${
            isFocused
              ? "brightness-100 opacity-100"
              : "brightness-100 opacity-100 ring-1 ring-white/5"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_38%)]" />

          <div
            data-drag-handle
            className="flex cursor-grab items-center justify-between border-b border-white/5 px-6 py-4 active:cursor-grabbing"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onMouseDown={(event) => {
                  event.stopPropagation();

                  closeWindow(windowData.id);
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

          <div className="flex h-[calc(100%-57px)] flex-col justify-between px-[clamp(1.5rem,2cqi,3rem)] pb-[clamp(1.5rem,2cqi,3rem)] pt-[clamp(2rem,3cqi,4rem)]">
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-zinc-600">
                SYSTEM WORKSPACE
              </p>

              <h1 className="max-w-[16ch] text-[clamp(2.8rem,6cqi,5rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-zinc-100">
                {windowData.type === "about" &&
                  "Engineering systems with calm precision."}

                {windowData.type === "projects" &&
                  "Building immersive software products end-to-end."}

                {windowData.type === "experience" &&
                  "Designing scalable systems with product thinking."}

                {windowData.type === "terminal" &&
                  "Command-driven interaction for intelligent workflows."}
              </h1>

              <p className="mt-10 max-w-[60ch] text-[clamp(0.92rem,1.1cqi,1rem)] leading-[1.9] text-zinc-400">
                Building premium software experiences across frontend systems,
                AI tooling, infrastructure, product engineering, and immersive
                interaction design.
              </p>
            </div>

            <div className="flex items-end justify-between gap-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-600">
                  CURRENT FOCUS
                </p>

                <p className="mt-3 max-w-[34ch] text-[clamp(0.82rem,1cqi,0.95rem)] leading-7 text-zinc-300">
                  Full-stack systems, AI engineering, spatial interfaces,
                  scalable architecture, and product-focused engineering.
                </p>
              </div>

              <p className="font-(--font-handwritten) text-[clamp(1.8rem,2cqi,2.6rem)] text-zinc-500">
                built with intent
              </p>
            </div>
          </div>

          {/* Resize handle indicator */}
          <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="h-1 w-3 rounded-full bg-white/30" />
            <div className="-ml-1.5 h-3 w-1 rounded-full bg-white/30" />
          </div>
        </GlassPanel>
      </Resizable>
    </motion.div>
  );
});