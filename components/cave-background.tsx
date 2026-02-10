"use client";

import { useEffect, useState } from "react";

export function CaveBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Rock texture layers with parallax */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, hsl(180 15% 15%), transparent 50%),
            radial-gradient(circle at 80% 60%, hsl(180 10% 18%), transparent 40%),
            radial-gradient(circle at 40% 80%, hsl(180 12% 16%), transparent 35%)
          `,
        }}
      />

      {/* Subtle vein patterns */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              hsl(var(--primary) / 0.03) 100px,
              hsl(var(--primary) / 0.03) 102px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 100px,
              hsl(var(--primary) / 0.02) 100px,
              hsl(var(--primary) / 0.02) 102px
            )
          `,
        }}
      />

      {/* Ambient glow from depths */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 120% 50% at 50% ${50 + scrollY * 0.05}%,
              hsl(var(--primary) / 0.05),
              transparent 60%
            )
          `,
        }}
      />

      {/* Scattered mineral deposits */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-sm"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            top: `${(i * 3.33) % 100}%`,
            left: `${(i * 7) % 100}%`,
            transform: `translateY(${scrollY * (0.02 + (i % 5) * 0.01)}px)`,
            background: `hsl(${42 + (i % 3) * 10} ${60 + (i % 4) * 10}% ${45 + (i % 3) * 5}% / ${0.1 + (i % 3) * 0.05})`,
            animation: `pulse-slow ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Darker gradient at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-96"
        style={{
          background: "linear-gradient(to top, hsl(var(--background)), transparent)",
        }}
      />
    </div>
  );
}
