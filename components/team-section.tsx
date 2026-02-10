import { Twitter, Globe, Github } from "lucide-react";

const teamMembers = [
  {
    name: "Mel Carl Chacon",
    role: "Founder & CEO",
    description:
      "Visionary leader driving ARK's mission forward. Building the future of gaming.",
    expertise: "Leadership & Strategy",
    socials: {
      twitter: "#",
      website: "#",
    },
  },
  {
    name: "Joshua Kurt Manzano",
    role: "Chief Internal Officer",
    description:
      "Keeping the engine running smooth. Internal operations mastermind.",
    expertise: "Internal Operations",
    socials: {
      twitter: "#",
    },
  },
  {
    name: "Salvador Vincent Javier",
    role: "Chief External Officer",
    description:
      "Building bridges and expanding horizons. Partnerships & outreach.",
    expertise: "External Relations",
    socials: {
      twitter: "#",
      website: "#",
    },
  },
  {
    name: "Dean Benedict Gomez",
    role: "Chief Finance Officer",
    description:
      "Crunching numbers and managing resources. Financial strategist.",
    expertise: "Finance & Resources",
    socials: {
      website: "#",
    },
  },
  {
    name: "Christian Joseph Delos Santos",
    role: "Chief Operations Officer",
    description:
      "Orchestrating events and day-to-day excellence. Operations guru.",
    expertise: "Operations & Events",
    socials: {
      twitter: "#",
    },
  },
  {
    name: "Miguel Nacubuan",
    role: "Chief Technology Officer",
    description:
      "Tech wizard and innovation driver. Making the impossible possible.",
    expertise: "Technology & Dev",
    socials: {
      github: "#",
      website: "#",
    },
  },
];

export function TeamSection() {
  return (
    <section id="team" className="relative px-6 py-32">
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
          The Miners
        </p>

        <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          <span className="text-balance">
            Meet the crew digging deep to bring you the best gaming experiences
          </span>
        </h2>

        <p className="mb-16 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Our leadership team combines passion, expertise, and vision to forge the future
        </p>

        {/* Team Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Avatar Placeholder */}
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-border/60 bg-card">
                  <span className="font-display text-2xl font-bold text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="mb-1 font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {member.name}
                </h3>
                <p className="mb-3 text-sm font-medium text-primary">
                  {member.role}
                </p>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  {member.description}
                </p>
              </div>

              {/* Expertise Tag */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  {member.expertise}
                </span>
              </div>

              {/* Social Links */}
              <div className="flex gap-2">
                {member.socials.twitter && (
                  <a
                    href={member.socials.twitter}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <Twitter size={16} />
                  </a>
                )}
                {member.socials.website && (
                  <a
                    href={member.socials.website}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    aria-label={`${member.name}'s website`}
                  >
                    <Globe size={16} />
                  </a>
                )}
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    aria-label={`${member.name}'s GitHub`}
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>

              {/* Decorative gradient */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
