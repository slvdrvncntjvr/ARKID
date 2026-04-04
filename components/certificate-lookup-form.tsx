"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function CertificateLookupForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [certificateId, setCertificateId] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = certificateId.trim();

    if (!trimmed) {
      return;
    }

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
      />
      <button
        type="submit"
        className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        Verify
      </button>
    </form>
  );
}
