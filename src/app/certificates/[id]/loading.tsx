export default function CertificateDetailsLoading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="w-full rounded-2xl border border-border bg-card/90 p-5 shadow-xl sm:p-8">
        <div className="h-4 w-44 rounded-md bg-muted/60 skeleton-wave" />
        <div className="mt-3 h-9 w-full max-w-[18rem] rounded-md bg-muted/70 skeleton-wave sm:max-w-[22rem]" />

        <div className="mt-6 grid gap-3 rounded-xl border border-border bg-background p-4 sm:grid-cols-2 sm:p-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-4 rounded-md bg-muted/70 skeleton-wave" />
          ))}
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-[auto_auto] sm:gap-3">
          <div className="h-4 w-48 max-w-full rounded-md bg-primary/35 skeleton-wave" />
          <div className="h-4 w-36 max-w-full rounded-md bg-muted/60 skeleton-wave" />
        </div>

        <div className="mt-5 h-px w-full bg-border" />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-hidden="true">
          <div className="h-9 rounded-lg border border-border/70 bg-background/45" />
          <div className="h-9 rounded-lg border border-border/70 bg-background/35" />
          <div className="h-9 rounded-lg border border-border/70 bg-background/45" />
          <div className="h-9 rounded-lg border border-border/70 bg-background/35" />
        </div>
      </div>
    </main>
  );
}
