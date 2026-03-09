"use client";

import { ArrowUpRight, Calendar, Users, Zap, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Global Hackathon",
    type: "Hackathon",
    description: "ARK's inaugural international hackathon participation, showcasing our guild's talent on a global stage.",
    tags: ["International", "Competition"],
    date: "August 2024",
    participants: "4",
    gradient: "from-purple-500/20 to-indigo-500/20",
    accentColor: "purple",
    links: []
  },
  {
    title: "Philippine Tech Career Fest",
    type: "Conference",
    description: "Guild members explored career opportunities and networked with tech industry leaders across the Philippines.",
    tags: ["Career", "Networking"],
    date: "March 29, 2025",
    participants: "10",
    gradient: "from-blue-500/20 to-cyan-500/20",
    accentColor: "blue",
    links: [{ label: "Event Post", url: "https://web.facebook.com/share/p/1AtfZorwAE/" }]
  },
  {
    title: "Interest Check: The Gates Open",
    type: "Recruitment",
    description: "The ARK opened its gates seeking students ready to explore, learn, and build beyond the screen.",
    tags: ["Recruitment", "Community"],
    date: "July 25, 2026",
    participants: "50+",
    gradient: "from-amber-500/20 to-yellow-500/20",
    accentColor: "amber",
    links: [{ label: "Announcement", url: "https://web.facebook.com/share/p/1FbViQv7Jc/" }]
  },
  {
    title: "DEVCON: CHECKMATE",
    type: "Game Jam",
    description: "Team Checkmate's strategic masterpiece created during Game On! Game Jam Manila 2025.",
    tags: ["Game Jam", "DEVCON"],
    date: "August 2025",
    participants: "5",
    gradient: "from-red-500/20 to-orange-500/20",
    accentColor: "red",
    links: [
      { label: "Trailer", url: "https://web.facebook.com/share/v/1CCxJD7oZq/" },
      { label: "Play Game", url: "https://jokumaaa.itch.io/checkmate" }
    ]
  },
  {
    title: "DEVCON: BANGUNGOT",
    type: "Game Jam",
    description: "A haunting Filipino folklore-inspired game showcasing cultural storytelling through interactive media.",
    tags: ["Game Jam", "DEVCON"],
    date: "August 2025",
    participants: "4",
    gradient: "from-violet-500/20 to-purple-500/20",
    accentColor: "violet",
    links: [
      { label: "Trailer", url: "https://web.facebook.com/share/v/1DNbnCA2me/" },
      { label: "Play Game", url: "https://leeprince.itch.io/bangungot" }
    ]
  },
  {
    title: "DOST NCR: POWERUP",
    type: "Workshop",
    description: "Intensive tech skills workshop powered by DOST NCR, elevating our guild's technical capabilities.",
    tags: ["Workshop", "Partnership"],
    date: "Sept. 13-14, 2025",
    participants: "20+",
    gradient: "from-green-500/20 to-teal-500/20",
    accentColor: "green",
    links: [{ label: "Event Recap", url: "https://web.facebook.com/share/p/15d1z5kprSr/" }]
  },
  {
    title: "YGG Play Summit 2025",
    type: "Conference",
    description: "ARK represented at Southeast Asia's premier gaming summit, connecting with industry pioneers.",
    tags: ["Gaming", "Summit"],
    date: "November 2025",
    participants: "10",
    gradient: "from-pink-500/20 to-rose-500/20",
    accentColor: "pink",
    links: [
      { label: "Event Post", url: "https://web.facebook.com/share/p/14TpbwR7xcV/" },
      { label: "Highlights", url: "https://web.facebook.com/share/v/14VAZ1FqqLe/" }
    ]
  },
  {
    title: "ARK Onboarding",
    type: "Workshop",
    description: "New members welcomed into the guild through intensive orientation and team-building activities.",
    tags: ["Community", "Training"],
    date: "November 15, 2025",
    participants: "30+",
    gradient: "from-cyan-500/20 to-blue-500/20",
    accentColor: "cyan",
    links: [
      { label: "Photos", url: "https://web.facebook.com/share/p/1AmtYckJ3c/" },
      { label: "Video", url: "https://web.facebook.com/share/v/171qEFvP3X/" }
    ]
  },
  {
    title: "DEVCON Game Jam Finals",
    type: "Finals",
    description: "Team Bangungot advanced to the national finals, representing ARK among the Philippines' best.",
    tags: ["Competition", "Finals"],
    date: "2025",
    participants: "4",
    gradient: "from-orange-500/20 to-amber-500/20",
    accentColor: "orange",
    links: []
  },
  {
    title: '"Take One, Leave the Rest" Game Jam',
    type: "Game Jam",
    description: "ARK-hosted game jam during CCIS Week challenging students to rapid-prototype creative game concepts.",
    tags: ["Game Jam", "CCIS Week"],
    date: "December 11, 2025",
    participants: "40+",
    gradient: "from-indigo-500/20 to-violet-500/20",
    accentColor: "indigo",
    links: [
      { label: "Event Details", url: "https://web.facebook.com/share/p/1TL7fzL1zo/" },
      { label: "Winners", url: "https://web.facebook.com/share/p/1DX3YrG7jj/" }
    ]
  },
  {
    title: "CCIS Week Booth",
    type: "Booth",
    description: "Interactive booth showcasing ARK's projects, games, and recruitment",
    tags: ["Exhibition", "CCIS Week"],
    date: "December 12, 2025",
    participants: "15+",
    gradient: "from-teal-500/20 to-green-500/20",
    accentColor: "teal",
    links: [{ label: "Booth Photos", url: "https://web.facebook.com/share/p/17ybfTT1iV/" }]
  },
  {
    title: "AWS Partnership",
    type: "Partnership",
    description: "Strategic partnership with Amazon Web Services empowering ARK with cloud infrastructure and resources.",
    tags: ["Partnership", "AWS"],
    date: "2025",
    participants: "Guild",
    gradient: "from-yellow-500/20 to-orange-500/20",
    accentColor: "yellow",
    links: [{ label: "Announcement", url: "https://web.facebook.com/share/p/18Jni3jVmk/" }]
  },
  {
    title: "Technology Workshop Series",
    type: "Workshop",
    description: "Ongoing series of hands-on workshops covering cutting-edge technologies and development practices.",
    tags: ["Workshop", "Education"],
    date: "February 18, 2026 →",
    participants: "Ongoing",
    gradient: "from-blue-500/20 to-purple-500/20",
    accentColor: "blue",
    links: []
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
            <span className="text-balance">The Tower We Raise</span>
          </h2>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We don't settle for 'done.' We aim for 'unforgettable.' Journey through the collection of work that shifted our world's axis.
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
                      <span>{project.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-accent" />
                      <span>{project.participants}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/40 bg-background/40 px-3 py-1 text-[11px] font-medium text-muted-foreground transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  {project.links && project.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
                      {project.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 hover:scale-105"
                        >
                          <ExternalLink size={12} />
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  )}

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