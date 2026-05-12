import { AmbientBackground } from "@/components/workspace/ambient-background";
import { Desktop } from "@/components/workspace/desktop";
import { Dock } from "@/components/workspace/dock";
import { TopBar } from "@/components/workspace/top-bar";

export default function HomePage() {
  return (
    <main className="relative h-screen overflow-hidden bg-[#0b0b0c] text-zinc-100">
      <AmbientBackground />

      <TopBar />

      <Desktop />

      <Dock />
    </main>
  );
}