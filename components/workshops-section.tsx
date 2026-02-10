import { Palette, Code, Music, Layers, TrendingUp, Zap } from "lucide-react";

const workshops = [
  {
    title: "PIXEL ART FUNDAMENTALS",
    description:
      "Master the art of pixel creation from basic shapes to complex characters and animations.",
    level: "Beginner",
    duration: "4 weeks",
    topics: "120+",
    icon: Palette,
    skills: ["Color Theory", "Dithering", "Animation Basics", "Character Design"],
  },
  {
    title: "GAME DEV WITH GODOT",
    description:
      "Build your first complete game using the Godot engine with hands-on projects.",
    level: "Intermediate",
    duration: "8 weeks",
    topics: "85+",
    icon: Code,
    skills: ["GDScript", "2D Physics", "UI Systems", "Export & Publish"],
  },
  {
    title: "CHIPTUNE COMPOSITION",
    description:
      "Create retro-style music and sound effects for your games using modern tools.",
    level: "Beginner",
    duration: "3 weeks",
    topics: "60+",
    icon: Music,
    skills: ["8-bit Sounds", "Melody Writing", "FamiTracker", "Integration"],
  },
  {
    title: "LEVEL DESIGN MASTERY",
    description:
      "Learn professional techniques for creating engaging and memorable game levels.",
    level: "Advanced",
    duration: "6 weeks",
    topics: "45+",
    icon: Layers,
    skills: ["Flow Theory", "Pacing", "Environmental Storytelling", "Playtesting"],
  },
  {
    title: "INDIE PUBLISHING 101",
    description:
      "Navigate the indie game market from Steam to itch.io with marketing strategies.",
    level: "All Levels",
    duration: "2 weeks",
    topics: "200+",
    icon: TrendingUp,
    skills: ["Store Setup", "Marketing", "Community Building", "Launch Strategy"],
  },
  {
    title: "SHADER MAGIC",
    description:
      "Create stunning visual effects with custom shaders for 2D and 3D games.",
    level: "Advanced",
    duration: "5 weeks",
    topics: "30+",
    icon: Zap,
    skills: ["GLSL Basics", "Post-Processing", "Particles", "Optimization"],
  },
];

export function WorkshopsSection() {
  return (
    <section id="workshops" className="relative px-6 py-32">
      {/* Subtle divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.2), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Workshops
        </p>

        <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          <span className="text-balance">
            Forge your skills in our deep-dive learning experiences
          </span>
        </h2>

        <p className="mb-16 max-w-xl text-lg leading-relaxed text-muted-foreground">
          From pixel art to game publishing, master the craft with hands-on workshops
        </p>

        {/* Workshops Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workshops.map((workshop) => {
            const Icon = workshop.icon;
            return (
              <div
                key={workshop.title}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Level Badge */}
                <div className="absolute right-4 top-4 z-10">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${
                      workshop.level === "Beginner"
                        ? "bg-accent/80 text-white"
                        : workshop.level === "Intermediate"
                          ? "bg-primary/80 text-primary-foreground"
                          : workshop.level === "Advanced"
                            ? "bg-destructive/80 text-white"
                            : "bg-muted/80 text-foreground"
                    }`}
                  >
                    {workshop.level}
                  </span>
                </div>

                {/* Icon Section */}
                <div className="relative overflow-hidden bg-gradient-to-br from-secondary/60 to-secondary/20 p-6">
                  <div className="relative z-10">
                    <div className="inline-flex rounded-lg bg-card/60 p-3 backdrop-blur-sm">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background:
                        "radial-gradient(circle at 70% 30%, hsl(var(--primary) / 0.3), transparent 60%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {workshop.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {workshop.description}
                  </p>

                  {/* Duration & Topics */}
                  <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{workshop.duration}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                    <span>{workshop.topics} Topics Covered</span>
                  </div>

                  {/* Skills Tags */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {workshop.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-secondary/60 px-2 py-1 text-xs text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <button className="mt-6 w-full rounded-lg border border-border/60 bg-secondary/40 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 hover:text-primary">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="rounded-full border border-border/60 bg-card/50 px-8 py-3 font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:text-primary">
            View All Workshops
          </button>
        </div>
      </div>
    </section>
  );
}
