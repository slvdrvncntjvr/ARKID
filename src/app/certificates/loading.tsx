function SkeletonLine({ width }: { width: string }) {
  return <div className={`h-4 rounded-md bg-muted/70 ${width}`} />;
}

export default function CertificatesLoading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="h-4 w-16 rounded-md bg-muted/60" />
        <div className="mt-4 h-10 w-72 rounded-md bg-muted/70" />

        <div className="mt-4 space-y-2">
          <SkeletonLine width="w-full" />
          <SkeletonLine width="w-11/12" />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="h-12 rounded-md bg-muted/70" />
          <div className="h-12 w-full rounded-md bg-primary/30 sm:w-28" />
        </div>

        <div className="mt-8 h-px w-full bg-border" />
        <div className="mt-5 h-4 w-40 rounded-md bg-muted/60" />
        <div className="mt-2 h-4 w-52 rounded-md bg-primary/30" />
      </div>
    </main>
  );
}
