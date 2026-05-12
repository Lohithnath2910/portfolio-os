"use client";

import {
  BriefcaseBusiness,
  FolderKanban,
  Terminal,
  User,
} from "lucide-react";

import { motion } from "motion/react";

import { useWorkspaceStore } from "@/store/workspace-store";

const items = [
  {
    icon: User,
    label: "About",
    value: "about",
  },
  {
    icon: FolderKanban,
    label: "Projects",
    value: "projects",
  },
  {
    icon: BriefcaseBusiness,
    label: "Experience",
    value: "experience",
  },
  {
    icon: Terminal,
    label: "Terminal",
    value: "terminal",
  },
] as const;

export function Dock() {
  const { windows, openWindow } =
  useWorkspaceStore();

  return (
    <div className="absolute bottom-10 left-1/2 z-9999 -translate-x-1/2">
      <motion.div
        whileHover={{
          scale: 1.04,
          y: -4,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
        }}
        className="flex items-center gap-4 rounded-4xl border border-white/6 bg-[#111214]/82 px-5 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      >
        {items.map((item) => {
          const Icon = item.icon;

          const existingWindow = windows.find(
            (window) => window.type === item.value,
          );

          const isActive = !!existingWindow;

          return (
            <motion.button
              key={item.label}
              onClick={() =>
                openWindow(item.value)
              }
              whileHover={{
                scale: 1.28,
                y: -10,
              }}
              whileTap={{
                scale: 0.94,
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 14,
                mass: 0.5,
              }}
              className={`group relative flex h-15.5 w-15.5 origin-center items-center justify-center rounded-[20px] border transition-colors duration-200 $
                isActive
                  ? "border-white/8 bg-white/7"
                  : "border-white/3 bg-white/4"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={1.9}
                className={`transition-colors duration-200 ${
                  isActive
                    ? "text-zinc-100"
                    : "text-zinc-400 group-hover:text-zinc-100"
                }`}
              />

              <div className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 rounded-full border border-white/4 bg-black/40 px-3 py-1 text-[10px] tracking-[0.12em] text-zinc-300 opacity-0 backdrop-blur-xl transition-all duration-150 group-hover:opacity-100">
                {item.label}
              </div>

              <div
                className={`absolute -bottom-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "h-1 w-4 bg-zinc-200"
                    : ": opacity-0"
                }`}
              />
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}