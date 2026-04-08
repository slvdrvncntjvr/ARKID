"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function CertificateLookupForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [certificateId, setCertificateId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = certificateId.trim();

    if (!trimmed) {
      return;
    }

    setIsSubmitting(true);

    const encoded = encodeURIComponent(trimmed);
    const basePath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

    // On certificates subdomain root, keep the clean /:id URL.
    if (basePath === "" || basePath === "/") {
      router.push(`/${encoded}`);
      return;
    }

    if (basePath === "/certificates") {
      router.push(`/certificates/${encoded}`);
      return;
    }

    router.push(`${basePath}/${encoded}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={certificateId}
        onChange={(event) => setCertificateId(event.target.value)}
        placeholder="Enter certificate ID (e.g. ARK-CERT-1A2B3C4D5E6F)"
        className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring transition focus:ring-2"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify"
        )}
      </button>
    </form>
  );
}
