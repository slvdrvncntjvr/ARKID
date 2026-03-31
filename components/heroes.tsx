"use client";

import Image from "next/image";

const heroes = [
  {
    name: "Mel Carl A. Chacon",
    role: "Chief Executive Officer",
    description:
      "The guiding force of ARK, charting its grand design and leading the guild toward bold quests and uncharted realms.",
    rune: "⚔️",
    photo: "/heroes/Chacon.png",
  },
  {
    name: "Joshua Kurt M. Manzano",
    role: "Chief Internal Officer",
    description:
      "Guardian of the guild's spirit, fostering unity, harmony, and steadfast coordination within ARK's stronghold.",
    rune: "💫",
    photo: "/heroes/Manzano.png",
  },
  {
    name: "Salvador Vincent R. Javier",
    role: "Chief External Officer",
    description:
      "The bridge beyond the walls. He forges alliances, strengthens partnerships, and represents ARK with honor in every external undertaking.",
    rune: "🛡️",
    photo: "/heroes/Javier.png",
  },
  {
    name: "Christian Joseph M. Delos Santos",
    role: "Chief Operations Officer",
    description:
      "Master of order and execution, ensuring every mission, quest, and venture unfolds with precision and valor.",
    rune: "⚙️",
    photo: "/heroes/Cj.png",
  },
  {
    name: "Juan Miguel Nacubuan",
    role: "Chief Technology Officer",
    description:
      "Master of runes and systems, crafting the digital foundations that bring ARK's bold ideas to life.",
    rune: "🔧",
    photo: "/heroes/Nacubuan.png",
  },
  {
    name: "Dean Benedict Gomez",
    role: "Chief Finance Officer",
    description:
      "Vigilant steward of ARK's treasures, ensuring the guild thrives in every conquest.",
    rune: "💰",
    photo: "/heroes/Gomez.png",
  },
];

/* ─── Card ─── */
function HeroCard({ hero }: { hero: (typeof heroes)[number] }) {
  return (
    <div className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border/50 bg-card/70 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-[5px] hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
      {/* top-edge highlight */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-[60%] -translate-x-1/2 opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to right, transparent, hsl(var(--accent)), transparent)",
        }}
      />

      {/* corner brackets */}
      {[
        "top-[6px] left-[6px] border-t-2 border-l-2",
        "top-[6px] right-[6px] border-t-2 border-r-2",
        "bottom-[6px] left-[6px] border-b-2 border-l-2",
        "bottom-[6px] right-[6px] border-b-2 border-r-2",
      ].map((pos, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute h-4 w-4 border-accent/30 transition-opacity duration-300 group-hover:border-accent/80 ${pos}`}
        />
      ))}

      {/* photo frame — portrait arch */}
      <div
        className="relative mb-4 flex-shrink-0 overflow-hidden border border-border/60 bg-card transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-md group-hover:shadow-accent/10"
        style={{
          width: 96,
          height: 112,
          borderRadius: "8px 8px 48px 48px",
        }}
      >
        {/* inner inset border */}
        <div
          className="pointer-events-none absolute border border-accent/10"
          style={{
            inset: 4,
            borderRadius: "5px 5px 44px 44px",
            zIndex: 1,
          }}
        />

        {hero.photo ? (
          <Image
            src={hero.photo}
            alt={hero.name}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              borderRadius: "6px 6px 46px 46px",
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-accent/25">
            {hero.rune}
          </div>
        )}

        {/* bottom vignette */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0"
          style={{
            height: "45%",
            background:
              "linear-gradient(to top, hsl(var(--card)) 0%, transparent 100%)",
            zIndex: 2,
          }}
        />
      </div>

      {/* name */}
      <h3 className="mb-0.5 text-center font-display text-lg font-bold leading-tight text-foreground">
        {hero.name}
      </h3>

      {/* fantasy title */}
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
        {hero.role}
      </p>

      {/* divider */}
      <div className="mb-3 flex w-4/5 items-center gap-1.5">
        <div
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(to right, transparent, hsl(var(--border)))",
          }}
        />
        <div className="h-1 w-1 rounded-full bg-accent/60" />
        <div
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(to left, transparent, hsl(var(--border)))",
          }}
        />
      </div>

      {/* description */}
      <p className="text-center text-sm leading-relaxed text-muted-foreground/80">
        {hero.description}
      </p>

      {/* bottom edge accent */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-b-2xl bg-gradient-to-r from-accent/0 via-accent to-accent/0 transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

/* ─── Section ─── */
export function HeroesSection() {
  return (
    <section
      id="heroes"
      className="relative min-h-screen overflow-hidden px-6 py-28"
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.4), transparent)",
          boxShadow: "0 0 24px hsl(42 70% 55% / 0.2)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ── Header — matches site pattern ── */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/60" />
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Meet The Heroes
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
        </div>

        <h2 className="mb-3 font-display text-4xl font-black tracking-tight text-foreground md:text-6xl">
          The{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Council of ARK
            </span>
            <span
              className="pointer-events-none absolute inset-0 blur-2xl"
              style={{ background: "hsl(42 80% 55% / 0.25)" }}
              aria-hidden="true"
            />
          </span>
        </h2>

        <p className="mb-16 font-mono text-sm text-muted-foreground/50">
          // The Vanguard of ARK — Masters of the Guild
        </p>

        {/* ── Grid ── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {heroes.map((hero) => (
            <HeroCard key={hero.name} hero={hero} />
          ))}
        </div>
      </div>
    </section>
  );
}
