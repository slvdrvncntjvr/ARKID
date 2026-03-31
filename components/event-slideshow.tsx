"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Types ─── */
interface Slide {
  src: string;
  alt: string;
  caption: string;
  date: string;
}

interface UpcomingEvent {
  name: string;
  date: string; // ISO string e.g. "2026-05-10T09:00:00"
}

export interface EventSlideshowProps {
  slides: Slide[];
  upcomingEvent: UpcomingEvent;
}

/* ─── Helpers ─── */
function getTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* ─── Component ─── */
export function EventSlideshow({ slides, upcomingEvent }: EventSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const multiSlide = slides.length > 1;

  /* ── Auto-advance slideshow ── */
  const resetAutoAdvance = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!multiSlide) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
  }, [slides.length, multiSlide]);

  useEffect(() => {
    resetAutoAdvance();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoAdvance]);

  /* ── Countdown tick ── */
  useEffect(() => {
    setHasHydrated(true);
    setTimeLeft(getTimeLeft(upcomingEvent.date));

    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(upcomingEvent.date));
    }, 1000);
    return () => clearInterval(id);
  }, [upcomingEvent.date]);

  const goTo = (index: number) => {
    setCurrent(index);
    resetAutoAdvance();
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/70 backdrop-blur-md">
      {/* ════════════════════════════════════════════════
          Part 1 — Slideshow
         ════════════════════════════════════════════════ */}
      <div className="relative" style={{ aspectRatio: "16 / 7" }}>
        {/* Slides */}
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Bottom gradient overlay for caption legibility */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "55%",
            background:
              "linear-gradient(to top, hsl(180 30% 6% / 0.92) 0%, hsl(180 30% 6% / 0.6) 40%, transparent 100%)",
            zIndex: 2,
          }}
        />

        {/* Caption + date — bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8">
          <p className="mb-1 font-display text-lg font-bold leading-tight text-foreground sm:text-xl md:text-2xl">
            {slides[current]?.caption}
          </p>
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            {slides[current]?.date}
          </p>
        </div>

        {/* ── Arrow buttons ── */}
        {multiSlide && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-card/50 text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:text-primary sm:left-4 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-card/50 text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:text-primary sm:right-4 sm:h-10 sm:w-10"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* ── Dot indicators ── */}
        {multiSlide && (
          <div className="absolute bottom-0 left-1/2 z-10 mb-3 flex -translate-x-1/2 items-center gap-2 sm:mb-4">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-accent"
                    : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════
          Part 2 — Countdown strip
         ════════════════════════════════════════════════ */}
      <div className="relative border-t border-border/50">
        {/* subtle top edge glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.25), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="flex flex-col items-start justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-6">
          {/* Left — event info */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 text-sm">
              ⬡
            </div>
            <div>
              <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                Next Quest
              </p>
              <p className="font-display text-base font-bold text-foreground sm:text-lg">
                {upcomingEvent.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {new Date(upcomingEvent.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "Asia/Manila",
                })}
              </p>
            </div>
          </div>

          {/* Right — countdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            {hasHydrated && timeLeft ? (
              <>
                {[
                  { label: "Days", value: pad(timeLeft.days) },
                  { label: "Hrs", value: pad(timeLeft.hours) },
                  { label: "Min", value: pad(timeLeft.minutes) },
                  { label: "Sec", value: pad(timeLeft.seconds) },
                ].map((unit, i) => (
                  <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-card/80 font-display text-lg font-bold tabular-nums text-foreground sm:h-14 sm:w-14 sm:text-xl">
                        {unit.value}
                      </span>
                      <span className="mt-1 text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
                        {unit.label}
                      </span>
                    </div>
                    {i < 3 && (
                      <span className="mb-4 text-lg font-bold text-accent/40">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <>
                {[
                  { label: "Days", value: "--" },
                  { label: "Hrs", value: "--" },
                  { label: "Min", value: "--" },
                  { label: "Sec", value: "--" },
                ].map((unit, i) => (
                  <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-card/80 font-display text-lg font-bold tabular-nums text-muted-foreground sm:h-14 sm:w-14 sm:text-xl">
                        {unit.value}
                      </span>
                      <span className="mt-1 text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
                        {unit.label}
                      </span>
                    </div>
                    {i < 3 && (
                      <span className="mb-4 text-lg font-bold text-accent/40">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
