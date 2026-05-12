"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Resizable } from "re-resizable";

import { GlassPanel } from "@/components/ui/glass-panel";
import { useWorkspaceStore } from "@/store/workspace-store";
import { WorkspaceWindow } from "@/types/window";
import { rafThrottle } from "@/lib/throttle";

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

const MIN_VISIBLE = 60; // Min pixels visible for window interaction

export function Window({
  window,
}: WindowProps) {
  const {
    closeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    windows,
  } = useWorkspaceStore();

  const [bounds, setBounds] = useState({
    width: 1920,
    height: 1080,
  });

  // Update bounds on resize
  useEffect(() => {
    const handleResize = () => {
      setBounds({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener(
        "resize",
        handleResize,
      );
      return () =>
        window.removeEventListener(
          "resize",
          handleResize,
        );
    }
  }, []);

  const resizeThrottleRef = useRef(
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
    window.zIndex === highestZ;

  const constrainPosition = useCallback(
    (x: number, y: number) => {
      const minX = -(
        window.width - MIN_VISIBLE
      );
      const maxX =
        bounds.width - MIN_VISIBLE;
      const minY = -(
        window.height - MIN_VISIBLE
      );
      const maxY =
        bounds.height - MIN_VISIBLE;

      return {
        x: Math.max(
          minX,
          Math.min(x, maxX),
        ),
        y: Math.max(
          minY,
          Math.min(y, maxY),
        ),
      };
    },
    [bounds.width, bounds.height, window.width, window.height],
  );

  const handleResize = useCallback(
    (
      _event: any,
      _direction: any,
      ref: HTMLElement,
    ) => {
      resizeThrottleRef.current(
        window.id,
        ref.offsetWidth,
        ref.offsetHeight,
      );
    },
    [window.id],
  );

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.15}
      onPointerDown={() =>
        focusWindow(window.id)
      }
      onDragEnd={(_, info) => {
        const newX =
          window.x + info.offset.x;
        const newY =
          window.y + info.offset.y;

        const {
          x: constrainedX,
          y: constrainedY,
        } = constrainPosition(
          newX,
          newY,
        );

        updateWindowPosition(
          window.id,
          constrainedX,
          constrainedY,
        );
      }}
      initial={{
        opacity: 0,
        scale: 0.96,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
        y: 10,
      }}
      transition={{
        duration: 0.22,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        x: window.x,
        y: window.y,
        zIndex: window.zIndex,
      }}
      className="absolute left-0 top-0 cursor-grab active:cursor-grabbing"
    >
      <Resizable
        defaultSize={{
          width: window.width,
          height: window.height,
        }}
        size={{
          width: window.width,
          height: window.height,
        }}
        minWidth={RESIZE_MIN.width}
        maxWidth={RESIZE_MAX.width}
        minHeight={RESIZE_MIN.height}
        maxHeight={RESIZE_MAX.height}
        enable={{
          bottomRight: true,
          bottom: false,
          right: false,
          top: false,
          left: false,
          topLeft: false,
          topRight: false,
          bottomLeft: false,
        }}
        handleStyles={{
          bottomRight: {
            width: "20px",
            height: "20px",
            right: "0",
            bottom: "0",
            cursor: "nwse-resize",
            background:
              "transparent",
            zIndex: 40,
          },
        }}
        handleClasses={{
          bottomRight:
            "group relative transition-opacity hover:opacity-100",
        }}
        onResize={handleResize}
      >
        <GlassPanel
          className={`relative h-full w-full overflow-hidden transition-all duration-300 ${
            isFocused
              ? "brightness-100 opacity-100"
              : "brightness-[0.72] opacity-70"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_38%)]" />

          <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onMouseDown={(event) => {
                  event.stopPropagation();

                  closeWindow(window.id);
                }}
                className="relative z-50 h-3 w-3 rounded-full bg-red-400/90 shadow-[0_0_0px_rgba(248,113,113,0)] transition-all duration-200 hover:scale-125 hover:bg-red-300 hover:shadow-[0_0_12px_rgba(248,113,113,0.45)]"
              />

              <div className="h-3 w-3 rounded-full bg-amber-300/90" />

              <div className="h-3 w-3 rounded-full bg-emerald-400/90" />
            </div>

            <p className="text-[11px] tracking-[0.22em] text-zinc-600">
              {window.type.toUpperCase()}
            </p>

            <div className="w-10" />
          </div>

          <div className="flex h-[calc(100%-57px)] flex-col justify-between px-[clamp(1.5rem,2cqi,3rem)] pb-[clamp(1.5rem,2cqi,3rem)] pt-[clamp(2rem,3cqi,4rem)]">
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-zinc-600">
                SYSTEM WORKSPACE
              </p>

              <h1 className="max-w-[16ch] text-[clamp(2.8rem,6cqi,5rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-zinc-100">
                {window.type === "about" &&
                  "Engineering systems with calm precision."}

                {window.type === "projects" &&
                  "Building immersive software products end-to-end."}

                {window.type === "experience" &&
                  "Designing scalable systems with product thinking."}

                {window.type === "terminal" &&
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

              <p className="font-[var(--font-handwritten)] text-[clamp(1.8rem,2cqi,2.6rem)] text-zinc-500">
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
}