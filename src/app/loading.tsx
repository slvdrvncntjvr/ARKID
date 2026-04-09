export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, hsl(42 70% 55% / 0.14), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[42rem] overflow-hidden rounded-2xl border border-border/70 bg-card/75 p-6 text-center shadow-2xl backdrop-blur-sm sm:p-8">
        <div
          className="pointer-events-none absolute inset-x-6 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)" }}
          aria-hidden="true"
        />

        <div className="mx-auto flex max-w-lg flex-col items-center gap-5 sm:gap-6">
          <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
            <div className="absolute inset-0 rounded-full border border-accent/30" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin" />
            <div className="absolute inset-2 rounded-full border border-primary/30" />
            <div className="absolute inset-[34%] rounded-full bg-primary/25 pulse-soft" />
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
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 shimmer-track" />
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
    </main>
  );
}
