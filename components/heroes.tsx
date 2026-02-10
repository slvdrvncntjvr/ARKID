"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const heroes = [
  {
    name: "Carl Chacon",
    role: "Guild Master",
    tag: "CEO",
    description: "Visionary founder who rallied students and turned a spark of passion into a full-blown guild.",
    rune: "⚔️",
    rank: "S",
    photo: null,
  },
  {
    name: "Vincent",
    role: "Co-Founder",
    tag: "The Great",
    description: "The strategic mind behind ARK's foundations—co-architect of everything the guild stands for.",
    rune: "🛡️",
    rank: "S",
    photo: null,
  },
  {
    name: "Precious Grace Deborah Manucom",
    role: "UI/UX Lead",
    tag: "Artisan",
    description: "Crafts the visual language of ARK—every pixel placed with intent, every screen a story.",
    rune: "🎨",
    rank: "A",
    photo: null,
  },
  {
    name: "Lead Name",
    role: "Technical Lead",
    tag: "Architect",
    description: "Masters the art of code architecture—building scalable systems that power ARK's vision.",
    rune: "⚙️",
    rank: "A",
    photo: null,
  },
  {
    name: "Lead Name",
    role: "Creative Lead",
    tag: "Storyteller",
    description: "Weaves narratives into every project—turning code and pixels into memorable experiences.",
    rune: "📖",
    rank: "A",
    photo: null,
  },
  {
    name: "Lead Name",
    role: "Community Lead",
    tag: "Unifier",
    description: "The heart of the guild—fostering connections and keeping the community spirit alive.",
    rune: "💫",
    rank: "B",
    photo: null,
  },
  {
    name: "Lead Name",
    role: "Game Dev Lead",
    tag: "Innovator",
    description: "Pushes boundaries in game development—transforming wild ideas into playable realities.",
    rune: "🎮",
    rank: "A",
    photo: null,
  },
  {
    name: "Lead Name",
    role: "Marketing Lead",
    tag: "Herald",
    description: "Spreads the word of ARK's achievements—amplifying our voice across the digital realm.",
    rune: "📢",
    rank: "B",
    photo: null,
  },
  {
    name: "Lead Name",
    role: "Operations Lead",
    tag: "Overseer",
    description: "Keeps the gears turning smoothly—managing logistics so the guild can focus on creating.",
    rune: "⚡",
    rank: "B",
    photo: null,
  },
];

const rankColors: Record<string, string> = {
  S: "hsl(42 70% 55%)",
  A: "hsl(180 60% 45%)",
  B: "hsl(260 60% 65%)",
};

export function HeroesSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Ember = {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      size: number; color: string;
    };

    const embers: Ember[] = [];
    const colors = [
      "hsl(42 90% 60%)",
      "hsl(20 90% 55%)",
      "hsl(10 85% 50%)",
      "hsl(50 95% 65%)",
      "hsl(30 80% 45%)",
    ];

    // 5 fire sources spread across full bottom width
    const getOrigins = () => [
      { x: canvas.width * 0.05, y: canvas.height * 0.96 },
      { x: canvas.width * 0.25, y: canvas.height * 0.93 },
      { x: canvas.width * 0.50, y: canvas.height * 0.91 },
      { x: canvas.width * 0.75, y: canvas.height * 0.93 },
      { x: canvas.width * 0.95, y: canvas.height * 0.96 },
    ];

    const spawnEmber = () => {
      const origins = getOrigins();
      const origin = origins[Math.floor(Math.random() * origins.length)];
      embers.push({
        x: origin.x + (Math.random() - 0.5) * 80,
        y: origin.y,
        vx: (Math.random() - 0.5) * 1.8,
        vy: -(Math.random() * 3.0 + 1.2),
        life: 0,
        maxLife: Math.random() * 180 + 100,
        size: Math.random() * 3.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    // Pre-seed embers so they're visible immediately
    for (let i = 0; i < 80; i++) spawnEmber();

    let raf: number;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (frame % 2 === 0) spawnEmber();
      if (frame % 4 === 0) spawnEmber();
      frame++;

      // Warm glow pool at each origin
      for (const origin of getOrigins()) {
        const grd = ctx.createRadialGradient(
          origin.x, origin.y, 0,
          origin.x, origin.y, 160
        );
        grd.addColorStop(0, "hsl(42 90% 55% / 0.10)");
        grd.addColorStop(0.5, "hsl(20 80% 40% / 0.04)");
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update and draw embers
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life++;
        e.x += e.vx + Math.sin(e.life * 0.04 + e.x * 0.01) * 0.5;
        e.y += e.vy;
        e.vy *= 0.99;
        e.vx *= 0.997;

        const alpha = 1 - e.life / e.maxLife;
        if (alpha <= 0 || e.y < -20) { embers.splice(i, 1); continue; }

        // Main ember
        ctx.globalAlpha = alpha * 0.85;
        ctx.shadowBlur = 10;
        ctx.shadowColor = e.color;
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * (1 - (e.life / e.maxLife) * 0.6), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Trailing spark
        ctx.globalAlpha = alpha * 0.25;
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(e.x - e.vx * 1.5, e.y - e.vy * 0.8, e.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="heroes" className="relative min-h-screen overflow-hidden px-6 py-28">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 50% 100%, hsl(42 60% 20% / 0.12), transparent)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.4), transparent)",
          boxShadow: "0 0 24px hsl(42 70% 55% / 0.2)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/60" />
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Party Members
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
        </div>

        <h2 className="mb-3 font-display text-4xl font-black tracking-tight text-foreground md:text-6xl">
          Meet the{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Heroes
            </span>
            <span
              className="pointer-events-none absolute inset-0 blur-2xl"
              style={{ background: "hsl(42 80% 55% / 0.25)" }}
              aria-hidden="true"
            />
          </span>
        </h2>

        <p className="mb-16 font-mono text-sm text-muted-foreground/50">
          // The guild&apos;s core party — each member a class of their own
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {heroes.map((hero, i) => (
            <div
              key={`${hero.name}-${i}`}
              className="group relative"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div
                className="absolute -inset-px rounded-2xl opacity-0 transition-all duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${rankColors[hero.rank]}33, transparent 60%)`,
                  boxShadow: `0 0 30px ${rankColors[hero.rank]}22`,
                }}
                aria-hidden="true"
              />

              <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/70 backdrop-blur-md">
                <div
                  className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-black"
                  style={{
                    borderColor: rankColors[hero.rank],
                    color: rankColors[hero.rank],
                    boxShadow: `0 0 10px ${rankColors[hero.rank]}44`,
                    background: `${rankColors[hero.rank]}11`,
                  }}
                >
                  {hero.rank}
                </div>

                <div className="relative mx-auto mt-8 h-28 w-28">
                  <div
                    className="relative h-28 w-28 overflow-hidden transition-transform duration-300 group-hover:scale-105"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                      background: `linear-gradient(135deg, ${rankColors[hero.rank]}33, hsl(var(--card)))`,
                    }}
                  >
                    {hero.photo ? (
                      <Image
                        src={hero.photo}
                        alt={hero.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 to-card/80">
                        <span className="text-4xl">{hero.rune}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-4 text-center">
                  <div
                    className="mb-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5"
                    style={{
                      borderColor: `${rankColors[hero.rank]}44`,
                      background: `${rankColors[hero.rank]}0d`,
                    }}
                  >
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest"
                      style={{ color: rankColors[hero.rank] }}
                    >
                      {hero.tag}
                    </span>
                  </div>

                  <h3 className="mb-0.5 font-display text-lg font-bold leading-tight text-foreground">
                    {hero.name}
                  </h3>
                  <p className="mb-4 font-mono text-xs text-muted-foreground/60">
                    {hero.role}
                  </p>

                  <p className="text-sm leading-relaxed text-muted-foreground/80">
                    {hero.description}
                  </p>
                </div>

                <div
                  className="h-0.5 w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${rankColors[hero.rank]}, transparent)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/30">
            🔥 Gathered around the guild campfire
          </p>
        </div>
      </div>
    </section>
  );
}