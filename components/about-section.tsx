import type { LucideIcon } from "lucide-react";
import { Code2, Gamepad2, Music, Palette } from "lucide-react";

const disciplines: { 
  title: string; 
  description: string; 
  icon: LucideIcon;
  level: string;
  stat: string;
}[] = [
  {
    title: "Programming",
    description: "From game logic to shaders, we write the code that brings worlds to life.",
    icon: Code2,
    level: "Core System",
    stat: "Logic + Performance"
  },
  {
    title: "Art & Design",
    description: "2D sprites, 3D models, UI/UX. Every pixel tells a story.",
    icon: Palette,
    level: "Visual Layer",
    stat: "Aesthetics + Clarity"
  },
  {
    title: "Game Design",
    description: "Crafting mechanics, levels, and systems that keep players coming back.",
    icon: Gamepad2,
    level: "Experience Engine",
    stat: "Engagement + Balance"
  },
  {
    title: "Audio",
    description: "Sound effects, music, and atmosphere that make games feel real.",
    icon: Music,
    level: "Immersion Module",
    stat: "Mood + Feedback"
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 pt-24 pb-32 overflow-visible">
      {/* Quest marker glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.3), transparent)",
          boxShadow: "0 0 20px hsl(42 70% 55% / 0.15)"
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        {/* Quest tag */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Guild Info
          </span>
        </div>

        {/* Title with game-style emphasis */}
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          <span className="text-balance">
            Founded By{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Carl
              </span>
              <span 
                className="absolute inset-0 bg-yellow-400/20 blur-xl" 
                aria-hidden="true"
              />
            </span>
            {" "}And{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Vincent The Great
              </span>
              <span 
                className="absolute inset-0 bg-yellow-400/20 blur-xl" 
                aria-hidden="true"
              />
            </span>
          </span>
        </h2>

        {/* Achievement-style subtitle */}
        <div className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 rounded border border-accent/40 bg-accent/10 flex items-center justify-center">
            <div className="h-2 w-2 bg-accent" style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
          </div>
          <span className="font-medium">Guild Founders</span>
        </div>

        <p className="mb-16 max-w-xl text-lg leading-relaxed text-muted-foreground">
          ARK is a student-led guild proving that game development is more than
          just a hobby—it's a path to{" "}
          <span className="font-semibold text-foreground">real skills</span>,{" "}
          <span className="font-semibold text-foreground">creative impact</span>, and{" "}
          <span className="font-semibold text-foreground">future opportunities</span>.
        </p>

        {/* Class selection grid */}
        <div className="relative">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <p className="text-sm font-medium text-muted-foreground">
              → Choose Your Discipline
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          
          <div className="grid gap-4 pb-2 sm:grid-cols-2">
            {disciplines.map((discipline, index) => {
              const Icon = discipline.icon;
              return (
                <div
                  key={discipline.title}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-border/60 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 hover:bg-card/80"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Animated corner accent */}
                  <div className="absolute top-0 right-0 h-16 w-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-bl from-accent/20 to-transparent" />
                  </div>

                  {/* Hover glow effect */}
                  <div 
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: "radial-gradient(600px circle at 50% 50%, hsl(42 70% 55% / 0.08), transparent 50%)"
                    }}
                    aria-hidden="true"
                  />
                  
                  {/* Content */}
                  <div className="relative flex flex-col flex-1">
                    {/* Header with icon and level */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:scale-110 group-hover:rotate-3">
                        <Icon
                          size={22}
                          className="text-accent transition-all duration-300 group-hover:scale-110"
                          strokeWidth={2.5}
                        />
                        {/* Icon glow */}
                        <div className="absolute inset-0 rounded-lg bg-accent/0 blur-md transition-all duration-300 group-hover:bg-accent/20" />
                      </div>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 transition-colors duration-300 group-hover:text-accent/80">
                        {discipline.level}
                      </span>
                    </div>

                    <h3 className="mb-3 font-display text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {discipline.title}
                    </h3>

                    {/* Stat bar with label */}
                    <div className="mb-4 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/80">
                        <span>ATTRIBUTES</span>
                        <span className="text-accent transition-all duration-500 group-hover:text-accent">
                          {discipline.stat}
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-border/40 ring-1 ring-border/20">
                        <div 
                          className="h-full bg-gradient-to-r from-accent/80 to-accent transition-all duration-700 ease-out group-hover:from-accent group-hover:to-primary"
                          style={{ width: "60%" }}
                        />
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground/90 transition-colors duration-300 group-hover:text-muted-foreground">
                      {discipline.description}
                    </p>

                    {/* Unlock indicator with arrow animation */}
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-accent/0 transition-all duration-300 group-hover:gap-2 group-hover:text-accent">
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                      <span>Explore This Path</span>
                    </div>
                  </div>

                  {/* Bottom edge accent line */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transition-all duration-500 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}