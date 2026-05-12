export function TopBar() {
  return (
    <header className="pointer-events-none absolute left-0 top-0 z-50 w-full px-8 py-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/5" />
        </div>

        <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-700">
          workspace active
        </p>
      </div>
    </header>
  );
}