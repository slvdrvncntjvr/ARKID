import Link from "next/link";
import { notFound } from "next/navigation";
import { getCertificateById } from "@/lib/certificates";
import { waitForLoadingWindow } from "@/lib/loading-delay";

interface CertificateVerifyPageProps {
  params: Promise<{ id: string }>;
}

function formatDate(input: string): string {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return input;
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function CertificateVerifyPage({ params }: CertificateVerifyPageProps) {
  const { id } = await params;
  const [certificate] = await Promise.all([
    getCertificateById(id),
    waitForLoadingWindow(),
  ]);

  if (!certificate) {
    notFound();
  }

  const isValid = certificate.status === "active";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">Certificate Verification</p>
        <h1 className="mt-2 text-2xl font-semibold">{isValid ? "Certificate is valid" : "Certificate is revoked"}</h1>

        <div className="mt-6 grid gap-3 rounded-xl border border-border bg-background p-5 text-sm sm:grid-cols-2">
          <p><span className="font-semibold">Certificate ID:</span> {certificate.certificateId}</p>
          <p><span className="font-semibold">Status:</span> {certificate.status}</p>
          <p><span className="font-semibold">Student:</span> {certificate.studentName}</p>
          <p><span className="font-semibold">Email:</span> {certificate.studentEmail || "Not provided"}</p>
          <p><span className="font-semibold">Program:</span> {certificate.programName}</p>
          <p><span className="font-semibold">Event:</span> {certificate.eventName || "Not provided"}</p>
          <p><span className="font-semibold">Completion Date:</span> {formatDate(certificate.completionDate)}</p>
          <p><span className="font-semibold">Issued At:</span> {formatDate(certificate.issuedAt)}</p>
        </div>

        {certificate.revokedReason ? (
          <div className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
            <p className="font-semibold">Revocation reason</p>
            <p className="mt-1">{certificate.revokedReason}</p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/certificates" className="font-semibold text-primary underline-offset-4 hover:underline">
            Verify another certificate
          </Link>
          <Link href="/" className="text-muted-foreground underline-offset-4 hover:underline">
            Back to main website
          </Link>
        </div>
      </div>
    </main>
  );
}
