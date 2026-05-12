import { WindowManager } from "./window-manager";

export function Desktop() {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="absolute left-[58%] top-[44%] h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-white/[0.025] bg-white/[0.01] opacity-30" />

      <div className="absolute left-[54%] top-[48%] h-[560px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-[36px] border border-white/[0.02] bg-white/[0.01] opacity-20" />

      <WindowManager />
    </section>
  );
}