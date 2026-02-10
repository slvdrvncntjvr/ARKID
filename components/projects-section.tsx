import { Star, Calendar, Users } from "lucide-react";

const projects = [
  {
    title: "SHADOW REALM",
    type: "Action RPG",
    description:
      "Descend into darkness and battle ancient creatures in this cooperative dungeon crawler.",
    players: "1-4 Players",
    year: "2025",
    tags: ["Featured", "Multiplayer"],
    featured: true,
  },
  {
    title: "NEON DRIFT",
    type: "Racing",
    description:
      "High-speed cyberpunk racing through procedurally generated tracks.",
    players: "1-8 Players",
    year: "2024",
    tags: ["Racing", "Multiplayer"],
    featured: false,
  },
  {
    title: "TERRA TACTICS",
    type: "Strategy",
    description:
      "Turn-based tactical warfare with pixel-art armies and destructible terrain.",
    players: "2 Players",
    year: "2024",
    tags: ["Strategy", "PvP"],
    featured: false,
  },
  {
    title: "VOID WALKER",
    type: "Metroidvania",
    description:
      "Explore an interconnected world, gain abilities, and uncover cosmic secrets.",
    players: "1 Player",
    year: "2023",
    tags: ["Singleplayer", "Adventure"],
    featured: false,
  },
  {
    title: "FORGE MASTERS",
    type: "Crafting Sim",
    description:
      "Mine resources, forge legendary weapons, and become the ultimate blacksmith.",
    players: "1-2 Players",
    year: "2023",
    tags: ["Crafting", "Simulation"],
    featured: false,
  },
  {
    title: "PIXEL ARENA",
    type: "Fighting",
    description:
      "Fast-paced fighting game with unique characters and combo systems.",
    players: "1-4 Players",
    year: "2022",
    tags: ["Fighting", "Multiplayer"],
    featured: false,
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative px-6 py-32">
      {/* Subtle divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(180 20% 25% / 0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Our Games
        </p>

        <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          <span className="text-balance">
            Discover the treasures we've mined from the depths of creativity
          </span>
        </h2>

        <p className="mb-16 max-w-xl text-lg leading-relaxed text-muted-foreground">
          From dungeon crawlers to racing games, experience our diverse game library
        </p>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute right-4 top-4 z-10">
                  <span className="flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </span>
                </div>
              )}

              {/* Image Placeholder */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-secondary/60 to-secondary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/20 bg-card/60 backdrop-blur-sm">
                    <span className="font-display text-2xl font-bold text-primary">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                </div>
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.3), transparent 70%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Type Badge */}
                <div className="mb-3">
                  <span className="rounded-full border border-border/60 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {project.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {project.players}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {project.year}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary/60 px-2 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Play Button */}
                <button className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-primary/20">
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
