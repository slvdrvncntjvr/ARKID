"use client";

import { useEffect, useRef } from "react";

export function GlobalEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Ember = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
    };

    const embers: Ember[] = [];
    const colors = [
      "hsl(42 90% 60%)",
      "hsl(20 90% 55%)",
      "hsl(10 85% 50%)",
      "hsl(50 95% 65%)",
      "hsl(30 80% 45%)",
    ];

    const spawnEmber = () => {
      // Spread origins across the full bottom edge of the viewport
      const x = Math.random() * canvas.width;
      const y = canvas.height + 10;
      embers.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 1.8 + 0.6),
        life: 0,
        maxLife: Math.random() * 300 + 200,
        size: Math.random() * 2.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    // Pre-seed so embers are visible immediately
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      embers.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 1.8 + 0.6),
        life: Math.random() * 200,
        maxLife: Math.random() * 300 + 200,
        size: Math.random() * 2.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let raf: number;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new embers at a gentle rate
      if (frame % 6 === 0) spawnEmber();
      frame++;

      // Subtle warm glow pools at the bottom
      const glowPositions = [0.15, 0.5, 0.85];
      for (const px of glowPositions) {
        const gx = canvas.width * px;
        const gy = canvas.height;
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, 200);
        g.addColorStop(0, "hsl(42 90% 55% / 0.04)");
        g.addColorStop(0.5, "hsl(20 80% 40% / 0.015)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update and draw embers
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life++;
        e.x += e.vx + Math.sin(e.life * 0.03 + e.x * 0.008) * 0.4;
        e.y += e.vy;
        e.vy *= 0.998;
        e.vx *= 0.998;

        const alpha = 1 - e.life / e.maxLife;
        if (alpha <= 0 || e.y < -20) {
          embers.splice(i, 1);
          continue;
        }

        const currentSize = e.size * (1 - (e.life / e.maxLife) * 0.5);

        // Main ember glow
        ctx.globalAlpha = alpha * 0.6;
        ctx.shadowBlur = 8;
        ctx.shadowColor = e.color;
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Faint trailing spark
        ctx.globalAlpha = alpha * 0.15;
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(
          e.x - e.vx * 1.5,
          e.y - e.vy * 0.8,
          currentSize * 0.3,
          0,
          Math.PI * 2,
        );
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
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 10 }}
      aria-hidden="true"
    />
  );
}
