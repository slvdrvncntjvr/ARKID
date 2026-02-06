import { Code2, Palette, Gamepad2, Music } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const disciplines: { title: string; description: string; icon: LucideIcon }[] =
  [
    {
      title: "Programming",
      description:
        "From game logic to shaders, we write the code that brings worlds to life.",
      icon: Code2,
    },
    {
      title: "Art & Design",
      description: "2D sprites, 3D models, UI/UX. Every pixel tells a story.",
      icon: Palette,
    },
    {
      title: "Game Design",
      description:
        "Crafting mechanics, levels, and systems that keep players coming back.",
      icon: Gamepad2,
    },
    {
      title: "Audio",
      description:
        "Sound effects, music, and atmosphere that make games feel real.",
      icon: Music,
    },
  ];

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32">
      {/* Subtle divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.2), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          About
        </p>

        <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          <span className="text-balance">
            founded by carl and vincent the great
          </span>
        </h2>

        <p className="mb-16 max-w-xl text-lg leading-relaxed text-muted-foreground">
          ARK is a student-led guild proving that game development is more than
          just a hobby—it's a path to real skills, creative impact, and future
          opportunities.
        </p>

        {/* Discipline grid */}
        <div className="grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/40 sm:grid-cols-2">
          {disciplines.map((discipline) => {
            const Icon = discipline.icon;
            return (
              <div
                key={discipline.title}
                className="group flex flex-col gap-3 bg-card p-8 transition-colors duration-300 hover:bg-secondary/40"
              >
                <Icon
                  size={20}
                  className="text-accent transition-colors duration-300 group-hover:text-primary"
                />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {discipline.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {discipline.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
