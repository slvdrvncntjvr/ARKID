import Link from "next/link";
import { CertificateLookupForm } from "@/components/certificate-lookup-form";

export default function CertificatesHomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">ARK</p>
        <h1 className="mt-3 text-3xl font-bold">Certificate Verification Portal</h1>
        <p className="mt-4 text-muted-foreground">
          Verify issued certificates instantly using a Certificate ID. This page confirms whether a
          certificate is valid, revoked, or not found.
        </p>

        <CertificateLookupForm />

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">For administrators</p>
          <Link
            href="/certificates/login"
            className="mt-2 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Go to certificate admin login
          </Link>
        </div>
      </div>
    </main>
  );
}
