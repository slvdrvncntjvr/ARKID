"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Gamepad2, Users, Rocket } from "lucide-react";

const stats = [
  { icon: Users, label: "Members", value: "67" },
  { icon: Gamepad2, label: "Projects", value: "69" },
  { icon: Rocket, label: "Game Jams", value: "911" },
];

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center overflow-hidden"
    >
      {/* background hero*/}
      <div className="absolute inset-0">
        <Image
          src="/ark.png"
          alt="ARK island map - a top-down illustrated pirate island with ships, buildings, and a treasure trail"
          fill
          className="object-cover object-center"
          priority
        />
        {/* gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(180 30% 6% / 0.35) 0%, hsl(180 30% 6% / 0.1) 30%, hsl(180 30% 6% / 0.5) 60%, hsl(180 30% 6% / 0.95) 85%, hsl(180 30% 6%) 100%)",
          }}
          aria-hidden="true"
        />
        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 50% 40%, transparent 40%, hsl(180 30% 6% / 0.7) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-end px-6 pb-24 pt-48 sm:pb-32 md:pt-56">
        {/* main heading */}
        <div
          className={`flex flex-col items-center gap-6 text-center transition-all duration-1000 ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          {/* title */}
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-balance">
              <span
                className="text-white"
                style={{
                  textShadow:
                    "0 0 30px rgba(0, 0, 0, 0.9), 0 0 60px rgba(0, 0, 0, 0.7), 0 4px 8px rgba(0, 0, 0, 0.8), -3px -3px 0 rgba(0, 0, 0, 0.5), 3px -3px 0 rgba(0, 0, 0, 0.5), -3px 3px 0 rgba(0, 0, 0, 0.5), 3px 3px 0 rgba(0, 0, 0, 0.5)",
                }}
              >
                Welcome to{" "}
              </span>
              <span
                className="text-primary"
                style={{
                  textShadow:
                    "0 0 40px hsl(var(--primary) / 0.8), 0 0 80px hsl(var(--primary) / 0.5), 0 4px 12px rgba(0, 0, 0, 0.9), -4px -4px 0 rgba(0, 0, 0, 0.7), 4px -4px 0 rgba(0, 0, 0, 0.7), -4px 4px 0 rgba(0, 0, 0, 0.7), 4px 4px 0 rgba(0, 0, 0, 0.7)",
                }}
              >
                ARK
              </span>
            </span>
          </h1>

          {/* subtitle */}
          <p 
            className="max-w-lg text-base font-semibold leading-relaxed text-white sm:text-lg"
            style={{
              textShadow:
                "0 0 20px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.8), -2px -2px 0 rgba(0, 0, 0, 0.6), 2px -2px 0 rgba(0, 0, 0, 0.6), -2px 2px 0 rgba(0, 0, 0, 0.6), 2px 2px 0 rgba(0, 0, 0, 0.6)",
            }}
          >
            Embark on epic quests, forge legendary games, and join the ultimate developer guild
          </p>

          {/* buttons */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#about"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-primary/20"
            >
              Start your ARKVenture
            </a>
            <a
              href="#projects"
              className="rounded-full border border-border/60 bg-card/50 px-6 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:text-primary"
            >
              Projects
            </a>
          </div>
        </div>

        {/* stats */}
        <div
          className={`mt-16 flex items-center gap-8 transition-all duration-1000 delay-300 sm:gap-12 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3">
                {i > 0 && (
                  <div
                    className="mr-8 h-8 w-px bg-border/40 sm:mr-12"
                    aria-hidden="true"
                  />
                )}
                <Icon size={18} className="text-primary/70" />
                <div className="flex flex-col">
                  <span className="font-display text-xl font-bold text-foreground sm:text-2xl">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* scroll */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
          Scroll
        </span>
        <div className="h-6 w-px bg-border/40" aria-hidden="true" />
      </div>
    </section>
  );
}