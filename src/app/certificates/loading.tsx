function SkeletonLine({ width }: { width: string }) {
  return <div className={`h-4 rounded-md bg-muted/70 skeleton-wave ${width}`} />;
}

export default function CertificatesLoading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="rounded-2xl border border-border bg-card/90 p-5 shadow-xl sm:p-8">
        <div className="h-4 w-20 rounded-md bg-muted/60 skeleton-wave" />
        <div className="mt-4 h-10 w-full max-w-[18rem] rounded-md bg-muted/70 skeleton-wave sm:max-w-[22rem]" />

        <div className="mt-4 space-y-2">
          <SkeletonLine width="w-full" />
          <SkeletonLine width="w-11/12" />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="h-12 rounded-md bg-muted/70 skeleton-wave" />
          <div className="h-12 w-full rounded-md bg-primary/30 skeleton-wave sm:w-32" />
        </div>

        <div className="mt-8 h-px w-full bg-border" />
        <div className="mt-5 h-4 w-40 rounded-md bg-muted/60 skeleton-wave" />
        <div className="mt-2 h-4 w-52 max-w-full rounded-md bg-primary/30 skeleton-wave" />

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-hidden="true">
          <div className="h-8 rounded-lg border border-border/70 bg-background/45" />
          <div className="h-8 rounded-lg border border-border/70 bg-background/35" />
          <div className="h-8 rounded-lg border border-border/70 bg-background/45" />
          <div className="h-8 rounded-lg border border-border/70 bg-background/35" />
        </div>
      </div>
    </main>
  );
}
