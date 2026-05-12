import { cn } from "@/lib/utils";

type GlassPanelProps = React.HTMLAttributes<HTMLDivElement>;

export function GlassPanel({
  className,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px]",
        "border border-white/[0.06]",
        "bg-[#121214]/80",
        "backdrop-blur-xl",
        "shadow-[0_20px_80px_rgba(0,0,0,0.42)]",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_26%)]" />

      {children}
    </div>
  );
}