"use client";

import { EventSlideshow } from "@/components/event-slideshow";

const slides = [
  {
    src: "/projects/take-one-1.jpg",
    alt: "ARK members at the Take One, Leave the Rest game jam",
    caption: '"Take One, Leave the Rest" Game Jam',
    date: "December 11, 2025 · 40+ participants",
  },
  {
    src: "/projects/arkBooth.jpg",
    alt: "CCIS Week Booth",
    caption: "CCIS Week Booth",
    date: "December 12, 2025",
  },
  {
    src: "/projects/yggSummit.jpg",
    alt: "YGG Summit 2025",
    caption: "YGG Summit 2025",
    date: "November, 2025",
  },
];

const upcomingEvent = {
  name: "Technology Workshop Series",
  date: "2026-05-10T09:00:00",
};

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 pt-24 pb-16 overflow-visible">
      {/* Quest marker glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.3), transparent)",
          boxShadow: "0 0 20px hsl(42 70% 55% / 0.15)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        {/* Title with game-style emphasis */}
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          <span className="text-balance">
            Where{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Visions
              </span>
              <span
                className="absolute inset-0 bg-yellow-400/20 blur-xl"
                aria-hidden="true"
              />
            </span>{" "}
            Become{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Reality
              </span>
              <span
                className="absolute inset-0 bg-yellow-400/20 blur-xl"
                aria-hidden="true"
              />
            </span>
          </span>
        </h2>

        <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg text-justify">
          ARK (AcademiTech Research and Knowledge) is a{" "}
          <span className="font-semibold text-foreground">Student-Led</span>,
          future-forward organization that equips individuals with the mindset,
          systems, and skills to thrive in the modern world. By blending{" "}
          <span className="font-semibold text-foreground">technology</span>,{" "}
          <span className="font-semibold text-foreground">
            learning science
          </span>
          , <span className="font-semibold text-foreground">gamification</span>,
          and{" "}
          <span className="font-semibold text-foreground">
            real-world projects
          </span>
          , ARK transforms students into innovators, builders, and leaders ready
          for the challenge of tomorrow.
        </p>

        {/* ── Slideshow + Countdown ── */}
        <EventSlideshow slides={slides} upcomingEvent={upcomingEvent} />
      </div>
    </section>
  );
}
