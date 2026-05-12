"use client";

import { useEffect, useRef, useState } from "react";

export function TopBar() {
  const [fps, setFps] = useState(0);
  const frameCountRef = useRef(0);
  const lastSampleRef = useRef(
    performance.now(),
  );

  useEffect(() => {
    let animationFrameId = 0;

    const sample = (now: number) => {
      frameCountRef.current += 1;

      const elapsed =
        now - lastSampleRef.current;

      if (elapsed >= 1000) {
        setFps(
          Math.round(
            (frameCountRef.current * 1000) /
              elapsed,
          ),
        );

        frameCountRef.current = 0;
        lastSampleRef.current = now;
      }

      animationFrameId =
        window.requestAnimationFrame(sample);
    };

    animationFrameId =
      window.requestAnimationFrame(sample);

    return () =>
      window.cancelAnimationFrame(
        animationFrameId,
      );
  }, []);

  return (
    <header className="pointer-events-none absolute left-0 top-0 z-50 w-full px-8 py-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 rounded-full border border-white/5 bg-black/30 px-3 py-1.5 backdrop-blur-md">
          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.6)]" />

          <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-300">
            fps {fps || "--"}
          </p>
        </div>

        <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-700">
          workspace active
        </p>
      </div>
    </header>
  );
}