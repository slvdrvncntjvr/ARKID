import { Gamepad2, ImagePlus, Rocket } from "lucide-react";

const slots = [
  {
    title: "Game Screenshot Slot 01",
    status: "Coming Soon",
    note: "Reserve this frame for your flagship build showcase.",
  },
  {
    title: "Game Screenshot Slot 02",
    status: "Coming Soon",
    note: "Perfect for gameplay combat, puzzle, or exploration moments.",
  },
  {
    title: "Game Screenshot Slot 03",
    status: "Coming Soon",
    note: "Use this for your clean UI scene or boss-fight highlight.",
  },
];

export function GamesSection() {
  return (
    <section id="games" className="relative overflow-hidden px-6 py-24">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.3), transparent)",
          boxShadow: "0 0 20px hsl(42 70% 55% / 0.15)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            <Gamepad2 size={13} />
            Incoming Playable Showcase
          </div>

          <h2 className="mb-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Games We Are Building
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            This lane is prepared for upcoming game screenshots. Once your
            playable builds are ready, these cards can be replaced with real
            captures and direct play links.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {slots.map((slot, index) => (
            <article
              key={slot.title}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(500px circle at 50% 0%, hsl(42 70% 55% / 0.07), transparent 55%)",
                }}
              />

              <div className="relative mb-4 overflow-hidden rounded-xl border border-border/50 bg-background/50">
                <div
                  className="h-44 w-full"
                  style={{
                    background:
                      "linear-gradient(145deg, hsl(180 18% 12%), hsl(180 24% 8%))",
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <ImagePlus size={22} className="text-accent/80" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Screenshot Placeholder {index + 1}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="mb-2 inline-flex rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                  {slot.status}
                </div>

                <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                  {slot.title}
                </h3>

                <p className="text-sm text-muted-foreground">{slot.note}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 text-xs font-medium text-muted-foreground">
            <Rocket size={14} className="text-primary" />
            Future update: playable demo links and store pages
          </div>
        </div>
      </div>
    </section>
  );
}
