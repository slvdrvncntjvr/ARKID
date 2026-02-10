"use client";

import { ArrowUpRight, Calendar, Users, Zap } from "lucide-react";

const projects = [
  {
    title: "ARK Guildforge Game Jam",
    type: "Game Jam",
    description: "Eight Teams battle fliptop zaito",
    tags: ["Hackathon", "Game Jam"],
    year: "2024",
    participants: "40+",
    gradient: "from-violet-500/20 to-fuchsia-500/20",
    accentColor: "violet"
  },
  {
    title: "ARK CCIS Booth",
    type: "Booth",
    description: "CCIS Week Booth",
    tags: ["Community", "Partnership"],
    year: "2024",
    participants: "200+",
    gradient: "from-cyan-500/20 to-blue-500/20",
    accentColor: "cyan"
  },
  {
    title: "tiktok ni viv at marky and friends",
    type: "Content",
    description: "Behind the scenes content creation series",
    tags: ["Social", "Content"],
    year: "2024",
    participants: "15+",
    gradient: "from-pink-500/20 to-rose-500/20",
    accentColor: "pink"
  },
  {
    title: "Advanced Game Workshop",
    type: "Workshop",
    description: "Intensive 3-day game development bootcamp",
    tags: ["Education", "Skills"],
    year: "2024",
    participants: "30+",
    gradient: "from-amber-500/20 to-orange-500/20",
    accentColor: "amber"
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative px-6 py-32 pb-40 overflow-hidden">
      {/* Animated background grid */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Glowing orb background effect */}
      <div className="pointer-events-none absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-1/4 -right-48 h-96 w-96 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />

      {/* Divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.3), transparent)",
          boxShadow: "0 0 20px hsl(42 70% 55% / 0.15)"
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1">
            <Zap size={12} className="text-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Our Work
            </span>
          </div>

          <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">What We've Been Building</span>
          </h2>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            From game jams to community events, explore the projects that bring our guild together.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative animate-in fade-in slide-in-from-bottom-8"
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration: '600ms',
                animationFillMode: 'both'
              }}
            >
              {/* Card with 3D tilt effect on hover */}
              <div 
                className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 hover:scale-[1.02]"
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 20;
                  const rotateY = (centerX - x) / 20;
                  
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                {/* Gradient overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  aria-hidden="true"
                />

                {/* Shimmer effect */}
                <div 
                  className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                  }}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="relative p-8">
                  {/* Header row */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background/50 font-mono text-xs font-bold text-muted-foreground transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full border border-border/60 bg-background/30 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent">
                        {project.type}
                      </span>
                    </div>

                    {/* Hover arrow */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background/30 text-muted-foreground opacity-0 transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 font-display text-2xl font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground/90">
                    {project.description}
                  </p>

                  {/* Stats row */}
                  <div className="mb-6 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-accent" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-accent" />
                      <span>{project.participants} people</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/40 bg-background/40 px-3 py-1 text-[11px] font-medium text-muted-foreground transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-700 group-hover:w-full" />
                </div>

                {/* Corner accent */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/10" aria-hidden="true" />
              </div>

              {/* Floating shadow */}
              <div className="absolute inset-0 -z-10 translate-y-2 rounded-2xl bg-accent/0 blur-xl transition-all duration-500 group-hover:translate-y-4 group-hover:bg-accent/5" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-sm text-muted-foreground">
            Want to see more or collaborate with us?
          </p>
          <button className="group inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-6 py-3 font-medium text-accent transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:shadow-lg hover:shadow-accent/20">
            <span>View All Projects</span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}