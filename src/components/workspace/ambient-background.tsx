export function AmbientBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[#080809]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_34%)]" />

      <div className="absolute left-[-12%] top-[-10%] h-[720px] w-[720px] rounded-full bg-zinc-400/[0.04] blur-[160px]" />

      <div className="absolute bottom-[-24%] right-[-10%] h-[620px] w-[620px] rounded-full bg-neutral-300/[0.025] blur-[140px]" />

      <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.01] blur-[180px]" />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.48))]" />
    </>
  );
}