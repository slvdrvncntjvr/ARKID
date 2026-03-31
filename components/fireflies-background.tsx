"use client";

import { useEffect, useRef } from "react";

interface FireflyData {
  x: number;
  y: number;
  originX: number;
  originY: number;
  r: number;
  alpha: number;
  alphaDir: number;
  alphaSpeed: number;
  wanderAngle: number;
  wanderRadius: number;
  wanderSpeed: number;
  driftX: number;
  driftY: number;
  hue: number;
}

function createFirefly(w: number, h: number): FireflyData {
  const x = Math.random() * w;
  const y = Math.random() * h;
  return {
    x,
    y,
    originX: x,
    originY: y,
    r: 1.2 + Math.random() * 1.2,
    alpha: 0.1 + Math.random() * 0.8,
    alphaDir: Math.random() > 0.5 ? 1 : -1,
    alphaSpeed: 0.004 + Math.random() * 0.01,
    wanderAngle: Math.random() * Math.PI * 2,
    wanderRadius: 18 + Math.random() * 37,
    wanderSpeed: 0.004 + Math.random() * 0.008,
    driftX: (Math.random() - 0.5) * 0.5,
    driftY: (Math.random() - 0.5) * 0.5,
    hue: 80 + Math.random() * 50,
  };
}

export function FirefliesBackground({ count = 35 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clampedCount = Math.min(Math.max(count, 1), 80);

    /* ── Resize handling (debounced) ── */
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const debouncedResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", debouncedResize);

    /* ── Spawn fireflies ── */
    const flies: FireflyData[] = [];
    for (let i = 0; i < clampedCount; i++) {
      flies.push(createFirefly(canvas.width, canvas.height));
    }

    /* ── Animation loop ── */
    let raf: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const f of flies) {
        /* wander orbit */
        f.wanderAngle += f.wanderSpeed;

        /* drift origin slowly */
        f.originX += f.driftX;
        f.originY += f.driftY;

        /* wrap around edges with margin */
        const margin = 60;
        if (f.originX < -margin) f.originX = canvas.width + margin;
        if (f.originX > canvas.width + margin) f.originX = -margin;
        if (f.originY < -margin) f.originY = canvas.height + margin;
        if (f.originY > canvas.height + margin) f.originY = -margin;

        /* compute position */
        f.x = f.originX + Math.cos(f.wanderAngle) * f.wanderRadius;
        f.y = f.originY + Math.sin(f.wanderAngle * 0.7) * f.wanderRadius;

        /* pulse alpha */
        f.alpha += f.alphaSpeed * f.alphaDir;
        if (f.alpha >= 0.9) {
          f.alpha = 0.9;
          f.alphaDir = -1;
        } else if (f.alpha <= 0.05) {
          f.alpha = 0.05;
          f.alphaDir = 1;
        }

        const bloomRadius = f.r * 5;
        const coreRadius = f.r * 0.6;
        const color = `hsl(${f.hue} 70% 65%)`;
        const colorFaint = `hsl(${f.hue} 60% 55%)`;

        /* Layer 1 — soft bloom glow */
        const grad = ctx.createRadialGradient(
          f.x,
          f.y,
          0,
          f.x,
          f.y,
          bloomRadius,
        );
        grad.addColorStop(0, `hsl(${f.hue} 70% 65% / ${f.alpha * 0.35})`);
        grad.addColorStop(0.4, `hsl(${f.hue} 60% 55% / ${f.alpha * 0.12})`);
        grad.addColorStop(1, `hsl(${f.hue} 50% 50% / 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, bloomRadius, 0, Math.PI * 2);
        ctx.fill();

        /* Layer 2 — bright core dot */
        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(f.x, f.y, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        /* Tiny white-hot center for extra pop */
        ctx.globalAlpha = f.alpha * 0.6;
        ctx.fillStyle = `hsl(${f.hue} 30% 90%)`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, coreRadius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", debouncedResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 5 }}
      aria-hidden="true"
    />
  );
}
