import { projectRegistry } from "@/data/projects";

export function ProjectsWindow() {
  return (
    <div className="flex h-[calc(100%-57px)] min-h-0 flex-col overflow-hidden px-[clamp(1.5rem,2.2cqi,3rem)] pt-[clamp(1.5rem,2.2cqi,2.5rem)]">
      <div className="max-w-160 shrink-0 pb-6">
        <p className="text-[11px] uppercase tracking-[0.32em] text-zinc-600">
          PROJECTS HUB
        </p>

        <h2 className="mt-4 text-[clamp(2.2rem,4.8cqi,4.2rem)] font-semibold leading-[0.94] tracking-[-0.08em] text-zinc-100">
          Immersive project windows for case-study driven engineering stories.
        </h2>

        <p className="mt-6 max-w-2xl text-[clamp(0.92rem,1.05cqi,1rem)] leading-[1.85] text-zinc-400">
          The registry below is the first layer of the projects system: typed,
          reusable, and ready to grow into dedicated project windows with
          screenshots, architecture sections, and expandable detail views.
        </p>
      </div>

      <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto overscroll-contain pb-4 pr-2 grid gap-4 lg:grid-cols-2 content-start">
        {projectRegistry.map((project) => (
          <article
            key={project.slug}
            className="group rounded-3xl border border-white/6 bg-white/4 p-5 transition-colors duration-200 hover:border-white/10 hover:bg-white/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-600">
                  {project.phase}
                </p>

                <h3 className="mt-2 text-lg font-medium tracking-[-0.03em] text-zinc-100">
                  {project.title}
                </h3>
              </div>

              <span className="rounded-full border border-white/8 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                registry
              </span>
            </div>

            <p className="mt-4 max-w-136 text-[0.92rem] leading-[1.75] text-zinc-400">
              {project.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/6 bg-white/3 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3 border-t border-white/6 pt-4 sm:grid-cols-2">
              {project.sections.map((section) => (
                <div key={section.title}>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-600">
                    {section.title}
                  </p>

                  <p className="mt-2 text-[0.88rem] leading-[1.7] text-zinc-400">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}