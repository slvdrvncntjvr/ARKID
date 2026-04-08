export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, hsl(42 70% 55% / 0.14), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-6 rounded-2xl border border-border/70 bg-card/80 p-8 text-center shadow-2xl backdrop-blur">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-accent/30" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary" />
          <div className="absolute inset-2 rounded-full bg-primary/10" />
        </div>

        <div>
          <p className="font-display text-2xl font-bold tracking-tight text-foreground">
            Entering ARK
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Preparing the guild archives and verification portal...
          </p>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/70">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
        </div>
      </div>
    </main>
  );
}
