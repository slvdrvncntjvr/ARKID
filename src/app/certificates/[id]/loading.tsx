export default function CertificateDetailsLoading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="h-4 w-44 rounded-md bg-muted/60" />
        <div className="mt-3 h-9 w-72 rounded-md bg-muted/70" />

        <div className="mt-6 grid gap-3 rounded-xl border border-border bg-background p-5 sm:grid-cols-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-4 rounded-md bg-muted/70" />
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <div className="h-4 w-48 rounded-md bg-primary/35" />
          <div className="h-4 w-36 rounded-md bg-muted/60" />
        </div>
      </div>
    </main>
  );
}
