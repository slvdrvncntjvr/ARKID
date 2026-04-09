"use client";

import { useEffect, useMemo, useState } from "react";

export function InitialLoadOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const holdMs = useMemo(() => 2000 + Math.floor(Math.random() * 2001), []);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), holdMs - 280);
    const hideTimer = setTimeout(() => setIsVisible(false), holdMs);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [holdMs]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 transition-opacity duration-300 sm:px-6 ${isFading ? "opacity-0" : "opacity-100"}`}
      style={{ background: "hsl(var(--background) / 0.92)" }}
      aria-live="polite"
      aria-label="Loading application"
    >
      <div className="relative w-full max-w-[42rem] overflow-hidden rounded-2xl border border-border/70 bg-card/75 p-6 text-center shadow-2xl backdrop-blur-sm sm:p-8">
        <div
          className="pointer-events-none absolute inset-x-6 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)" }}
          aria-hidden="true"
        />

        <div className="mx-auto flex max-w-lg flex-col items-center gap-5 sm:gap-6">
          <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
            <div className="absolute inset-0 rounded-full border border-accent/30" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary" />
            <div className="absolute inset-2 rounded-full border border-primary/30" />
            <div className="pulse-soft absolute inset-[34%] rounded-full bg-primary/25" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
              Loading Session
            </p>
            <p className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Entering ARK
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Preparing heroes, projects, and verification portals for your session.
            </p>
          </div>

          <div className="w-full space-y-3">
            <div className="h-2 overflow-hidden rounded-full bg-muted/70">
              <div className="shimmer-track h-full w-1/2 rounded-full bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-hidden="true">
              <div className="flex h-9 items-center justify-center rounded-lg border border-border/70 bg-background/40 px-2 text-[10px] font-semibold uppercase tracking-wider text-foreground/70 sm:text-xs">
                Heroes
              </div>
              <div className="flex h-9 items-center justify-center rounded-lg border border-border/70 bg-background/55 px-2 text-[10px] font-semibold uppercase tracking-wider text-primary/90 sm:text-xs">
                Projects
              </div>
              <div className="flex h-9 items-center justify-center rounded-lg border border-border/70 bg-background/40 px-2 text-[10px] font-semibold uppercase tracking-wider text-foreground/70 sm:text-xs">
                Verify
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Please wait a moment while content is being prepared.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
