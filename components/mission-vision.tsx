export function MissionVisionSection() {
  return (
    <section
      id="mission-vision"
      className="relative overflow-hidden px-6 py-28"
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.5), transparent)",
          boxShadow: "0 0 30px hsl(42 70% 55% / 0.2)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/60" />
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Guild Codex
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
        </div>

        <h2 className="mb-4 font-display text-4xl font-black tracking-tight text-foreground md:text-6xl">
          Our{" "}
          <span
            className="relative"
            style={{
              WebkitTextStroke: "1px hsl(42 70% 55% / 0.8)",
              color: "transparent",
              textShadow: "0 0 40px hsl(42 70% 55% / 0.3)",
            }}
          >
            Sacred
          </span>{" "}
          Codex
        </h2>

        <p className="mb-20 max-w-lg font-mono text-sm text-muted-foreground/60">
          // The laws that bind and drive the ARK guild forward
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* MISSION */}
          <div className="group relative">
            <div
              className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, hsl(42 70% 55% / 0.4), transparent 50%, hsl(42 70% 55% / 0.2))",
              }}
              aria-hidden="true"
            />

            <div className="relative rounded-2xl border border-border/50 bg-card/60 p-8 backdrop-blur-sm">
              <div className="absolute -top-3 left-6 flex items-center gap-1.5 rounded-full border border-accent/40 bg-background px-3 py-0.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  01
                </span>
                <span className="h-3 w-px bg-accent/30" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Mission
                </span>
              </div>

              <div
                className="pointer-events-none absolute -right-4 -top-4 select-none text-[120px] leading-none text-accent/5 transition-all duration-700 group-hover:text-accent/10 group-hover:scale-110"
                aria-hidden="true"
              >
                ⬢
              </div>

              <div className="mb-6 mt-4 flex h-14 w-14 items-center justify-center rounded-xl border border-accent/20 bg-accent/5">
                <span className="text-2xl">⚔️</span>
              </div>

              <h3 className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-accent/70">
                Primary Directive
              </h3>
              <h4 className="mb-4 font-display text-2xl font-bold text-foreground">
                Our Mission
              </h4>

              <p className="mb-6 text-l leading-relaxed text-muted-foreground">
                At ARK (AcademiTech Research and Knowledge), our mission is to
                reimagine learning by turning study, creation, and collaboration
                into a gamified journey. We empower students to grow
                academically, creatively, and professionally through structured
                challenges, real-world projects, and community-driven support.
                This prepares them to thrive in both the tech industry and the
                digital age.
              </p>

              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </div>
          </div>

          {/* VISION */}
          <div className="group relative md:mt-10">
            <div
              className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(225deg, hsl(180 60% 45% / 0.3), transparent 50%, hsl(42 70% 55% / 0.2))",
              }}
              aria-hidden="true"
            />

            <div className="relative rounded-2xl border border-border/50 bg-card/60 p-8 backdrop-blur-sm">
              <div className="absolute -top-3 left-6 flex items-center gap-1.5 rounded-full border border-primary/40 bg-background px-3 py-0.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  02
                </span>
                <span className="h-3 w-px bg-primary/30" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  Vision
                </span>
              </div>

              <div
                className="pointer-events-none absolute -right-4 -top-4 select-none text-[120px] leading-none text-primary/5 transition-all duration-700 group-hover:text-primary/10 group-hover:scale-110"
                aria-hidden="true"
              >
                ◈
              </div>

              <div className="mb-6 mt-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/5">
                <span className="text-2xl">🔮</span>
              </div>

              <h3 className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70">
                End-Game Goal
              </h3>
              <h4 className="mb-4 font-display text-2xl font-bold text-foreground">
                Our Vision
              </h4>

              <p className="mb-6 text-l leading-relaxed text-muted-foreground">
                To become a leading student-driven community that transforms the
                way students learn and create by integrating gamified systems, a
                collaborative environment, and real-world projects. We aim to
                empower future innovators, leaders, and creators with the
                skills, mindset, and support they need to thrive academically,
                professionally, and socially.
              </p>

              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
