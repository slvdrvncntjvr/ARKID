const projects = [
  {
    title: "ARK Guildforge Game Jam",
    type: "Game Jam",
    description: "Eight Teams battle fliptop zaito",
    tags: ["Hackathon", "Game Jam"],
  },
  {
    title: "ARK CCIS Booth",
    type: "Booth",
    description: "CCIS Week Booth",
    tags: ["Community", "Partnership"],
  },
  {
    title: "tiktok ni viv at marky and friends",
    type: "TYPE",
    description: "DESC",
    tags: ["TAGS"],
  },
  {
    title: "TITLE",
    type: "TYPE",
    description: "DESC",
    tags: ["TAGS"],
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

      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Projects
        </p>

        <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          <span className="text-balance">What we have been building</span>
        </h2>

        <p className="mb-16 max-w-xl text-lg leading-relaxed text-muted-foreground">
          subtitle or description to
        </p>

        {/* Project list - Linear style rows */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group flex flex-col gap-4 border-t border-border/50 py-7 transition-colors md:flex-row md:items-start md:justify-between"
            >
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-border/60 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {project.type}
                  </span>
                </div>
                <h3 className="mb-1.5 font-display text-xl font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:mt-7">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary/60 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-border/50" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
