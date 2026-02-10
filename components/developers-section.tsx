import { developersConfig } from "@/lib/site-config";
import { Twitter, Globe, Github } from "lucide-react";

export function DevelopersSection() {
  return (
    <section className="relative px-6 py-20 border-t border-border/40">
      {/* Subtle divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.15), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Website Credits
        </p>

        <h2 className="mb-3 text-center font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          <span className="text-balance">{developersConfig.title}</span>
        </h2>

        <p className="mb-12 text-center text-sm text-muted-foreground">
          {developersConfig.description}
        </p>

        {/* Developers Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {developersConfig.developers.map((dev) => (
            <div
              key={dev.name}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Avatar Placeholder */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border/60 bg-card">
                  <span className="font-display text-lg font-bold text-primary">
                    {dev.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="mb-1 font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  {dev.name}
                </h3>
                <p className="mb-2 text-sm font-medium text-primary">
                  {dev.role}
                </p>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  {dev.description}
                </p>
              </div>

              {/* Expertise Tag */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  {dev.expertise}
                </span>
              </div>

              {/* Social Links */}
              <div className="flex gap-2">
                {dev.socials.twitter && (
                  <a
                    href={dev.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    aria-label={`${dev.name}'s Twitter`}
                  >
                    <Twitter size={16} />
                  </a>
                )}
                {dev.socials.website && (
                  <a
                    href={dev.socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    aria-label={`${dev.name}'s website`}
                  >
                    <Globe size={16} />
                  </a>
                )}
                {dev.socials.github && (
                  <a
                    href={dev.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    aria-label={`${dev.name}'s GitHub`}
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Want to contribute message */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Want to contribute to this project?{" "}
            <a
              href="https://github.com/arkgaming"
              className="font-medium text-primary hover:underline"
            >
              Join us on GitHub
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
