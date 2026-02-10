"use client";

import { useEffect, useRef } from "react";

export function MissionVisionSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    const particles: {
      x: number; y: number; size: number;
      opacity: number; speed: number; char: string;
    }[] = [];

    const runes = ["⬡", "◈", "⟁", "⌬", "⎔", "◇", "⬢", "✦", "⊕", "◉"];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 12 + 6,
        opacity: Math.random() * 0.15 + 0.03,
        speed: Math.random() * 0.3 + 0.1,
        char: runes[Math.floor(Math.random() * runes.length)],
      });
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y -= p.speed;
        p.opacity += Math.sin(Date.now() * 0.001 + p.x) * 0.002;
        if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
        ctx.globalAlpha = Math.max(0.02, Math.min(0.18, p.opacity));
        ctx.fillStyle = "hsl(42, 70%, 55%)";
        ctx.font = `${p.size}px monospace`;
        ctx.fillText(p.char, p.x, p.y);
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
    <section id="mission-vision" className="relative overflow-hidden px-6 py-28">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            hsl(42 70% 55% / 0.03) 0px,
            hsl(42 70% 55% / 0.03) 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.5), transparent)",
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
                background: "linear-gradient(135deg, hsl(42 70% 55% / 0.4), transparent 50%, hsl(42 70% 55% / 0.2))",
              }}
              aria-hidden="true"
            />

            <div className="relative rounded-2xl border border-border/50 bg-card/60 p-8 backdrop-blur-sm">
              <div className="absolute -top-3 left-6 flex items-center gap-1.5 rounded-full border border-accent/40 bg-background px-3 py-0.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">01</span>
                <span className="h-3 w-px bg-accent/30" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Mission</span>
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
                Forge the Future
              </h4>

              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                To cultivate a thriving community of student game developers by providing
                hands-on learning, collaborative projects, and real-world exposure—transforming
                passion into professional-grade craft.
              </p>

              <div className="space-y-3">
                {[
                  { label: "Education", value: 90 },
                  { label: "Community", value: 85 },
                  { label: "Innovation", value: 75 },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="mb-1 flex justify-between font-mono text-[10px] text-muted-foreground/60">
                      <span>{stat.label}</span>
                      <span>{stat.value}%</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-border/30">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent/70 to-accent transition-all duration-1000"
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </div>
          </div>

          {/* VISION */}
          <div className="group relative md:mt-10">
            <div
              className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: "linear-gradient(225deg, hsl(180 60% 45% / 0.3), transparent 50%, hsl(42 70% 55% / 0.2))",
              }}
              aria-hidden="true"
            />

            <div className="relative rounded-2xl border border-border/50 bg-card/60 p-8 backdrop-blur-sm">
              <div className="absolute -top-3 left-6 flex items-center gap-1.5 rounded-full border border-primary/40 bg-background px-3 py-0.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">02</span>
                <span className="h-3 w-px bg-primary/30" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Vision</span>
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
                Lead the Realm
              </h4>

              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                To become the Philippines&apos; premier student game development guild—recognized
                for producing industry-ready developers, impactful games, and a legacy of
                creative excellence that echoes beyond the campus walls.
              </p>

              <div className="space-y-3">
                {[
                  { label: "Industry Impact", value: 95 },
                  { label: "Creative Output", value: 88 },
                  { label: "National Reach", value: 70 },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="mb-1 flex justify-between font-mono text-[10px] text-muted-foreground/60">
                      <span>{stat.label}</span>
                      <span>{stat.value}%</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-border/30">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary transition-all duration-1000"
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
            Scroll to Continue
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/40" />
        </div>
      </div>
    </section>
  );
}