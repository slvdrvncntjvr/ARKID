"use client";

import { useState, useEffect } from "react";
import { Rocket } from "lucide-react";

const imagesBySlot = [
  [
    "/games/bangungot/bangungotTitle.png",
    "/games/bangungot/bangungotPreview1.png",
    "/games/bangungot/bangungotPreview2.png",
  ],
  [
    "/games/checkmate/checkmateTitle.png",
    "/games/checkmate/checkmatePreview1.png",
    "/games/checkmate/checkmatePreview2.png",
  ],
  [
    "/games/codewhite/codewhiteTitle.png",
    "/games/codewhite/codewhitePreview1.png",
    "/games/codewhite/codewhitePreview2.png",
  ],
];

const slots = [
  {
    title: "Bangungot",
    description:
      "A dark curse grips your bloodline through generations, twisting them into the very monsters from your childhood nightmares. Now, the curse has come for you.",
  },
  {
    title: "CheckMate!",
    description:
      "Checkmate! is an emotional visual novel that blends heartfelt storytelling with charming minigames.",
  },
  {
    title: "Code White",
    description:
      "The eye is watching, are you acting accordingly? A psychological analog horror experience that blends strategic pattern recognition with nerve-fraying survival.",
  },
];

function SlotCard({
  slot,
  images,
  index,
}: {
  slot: (typeof slots)[0];
  images: string[];
  index: number;
}) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);

  const transitionTo = (i: number) => {
    if (i === current || next !== null) return;
    setNext(i);
    setTimeout(() => {
      setCurrent(i);
      setNext(null);
    }, 500);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => {
          const nextIdx = (prev + 1) % images.length;
          setNext(nextIdx);
          setTimeout(() => {
            setCurrent(nextIdx);
            setNext(null);
          }, 500);
          return prev;
        });
      }, 2800);
      return () => clearInterval(interval);
    }, index * 900);

    return () => clearTimeout(delay);
  }, [images.length, index]);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at 50% 0%, hsl(42 70% 55% / 0.07), transparent 55%)",
        }}
      />

      {/* Slideshow area */}
      <div className="relative mb-4 overflow-hidden rounded-xl border border-border/50 bg-muted/30">
        <div className="relative h-44 w-full">
          {/* current image — stays fully visible underneath */}
          <img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* next image — fades in on top, then becomes the new current */}
          {next !== null && (
            <img
              key={next}
              src={images[next]}
              alt={`Slide ${next + 1}`}
              className="absolute inset-0 h-full w-full object-cover animate-crossfade"
            />
          )}
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => transitionTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "16px" : "6px",
                height: "6px",
                background:
                  i === current ? "hsl(42 70% 55%)" : "hsl(42 70% 55% / 0.35)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        <h3 className="mb-2 font-display text-lg font-bold text-foreground">
          {slot.title}
        </h3>

        <p className="text-sm text-muted-foreground text-justify">
          {slot.description}
        </p>
      </div>
    </article>
  );
}

export function GamesSection() {
  return (
    <section id="games" className="relative overflow-hidden px-6 py-24">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.3), transparent)",
          boxShadow: "0 0 20px hsl(42 70% 55% / 0.15)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Games
              </span>
              <span
                className="absolute inset-0 bg-yellow-400/20 blur-xl"
                aria-hidden="true"
              />
            </span>{" "}
            We Are Building
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A glimpse into the worlds our members are crafting. Each title is
            built from the ground up by ARK students — from concept to playable
            build.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {slots.map((slot, index) => (
            <SlotCard
              key={slot.title}
              slot={slot}
              images={imagesBySlot[index]}
              index={index}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center"></div>
      </div>
    </section>
  );
}
