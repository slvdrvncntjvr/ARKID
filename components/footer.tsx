import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 px-6 py-14">
      {/* Subtle top glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.15), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 md:flex-row">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/ark-logo.png"
            alt=""
            width={24}
            height={17}
            className="rounded-sm object-contain"
          />
          <span className="font-display text-sm font-semibold text-foreground">
            ARK
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          {"gawa ni franz. "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
