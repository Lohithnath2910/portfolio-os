import { WindowManager } from "./window-manager";

export function Desktop() {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-4xl border opacity-30"
        style={{
          left: "58%",
          top: "44%",
          width: "760px",
          height: "520px",
          borderColor: "rgba(255, 255, 255, 0.025)",
          backgroundColor: "rgba(255, 255, 255, 0.01)",
        }}
      />

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-4xl border opacity-20"
        style={{
          left: "54%",
          top: "48%",
          width: "820px",
          height: "560px",
          borderColor: "rgba(255, 255, 255, 0.02)",
          backgroundColor: "rgba(255, 255, 255, 0.01)",
        }}
      />

      <WindowManager />
    </section>
  );
}