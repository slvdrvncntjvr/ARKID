"use client";

import { FormEvent, useMemo, useState } from "react";

interface CertificateApiRecord {
  certificateId: string;
  studentName: string;
  studentEmail: string;
  programName: string;
  eventName: string;
  completionDate: string;
  issuedAt: string;
  issuerUsername: string;
  status: "active" | "revoked";
  revokedAt: string;
  revokedReason: string;
}

interface CertificatesDashboardProps {
  username: string;
}

export function CertificatesDashboard({ username }: CertificatesDashboardProps) {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [programName, setProgramName] = useState("");
  const [eventName, setEventName] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [issueLoading, setIssueLoading] = useState(false);
  const [issueError, setIssueError] = useState("");
  const [issued, setIssued] = useState<{ id: string; url: string } | null>(null);

  const [verifyId, setVerifyId] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [verified, setVerified] = useState<CertificateApiRecord | null>(null);

  const [revokeReason, setRevokeReason] = useState("Incorrect or withdrawn certificate");
  const canRevoke = useMemo(
    () => verified?.status === "active" && verifyId.trim().length > 0,
    [verified?.status, verifyId],
  );

  async function handleIssue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIssueError("");
    setIssued(null);
    setIssueLoading(true);

    try {
      const response = await fetch("/api/certificates/issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName,
          studentEmail,
          programName,
          eventName,
          completionDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to issue certificate");
      }

      setIssued({
        id: data.certificate.certificateId,
        url: data.verifyUrl,
      });

      setStudentName("");
      setStudentEmail("");
      setProgramName("");
      setEventName("");
      setCompletionDate("");
    } catch (error) {
      setIssueError(error instanceof Error ? error.message : "Failed to issue certificate");
    } finally {
      setIssueLoading(false);
    }
  }

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = verifyId.trim();

    if (!trimmed) {
      return;
    }

    setVerifyLoading(true);
    setVerifyError("");
    setVerified(null);

    try {
      const response = await fetch(`/api/certificates/verify?id=${encodeURIComponent(trimmed)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || data?.message || "Certificate not found");
      }

      setVerified(data.certificate);
    } catch (error) {
      setVerifyError(error instanceof Error ? error.message : "Failed to verify certificate");
    } finally {
      setVerifyLoading(false);
    }
  }

  async function handleRevoke() {
    const trimmed = verifyId.trim();
    if (!trimmed || !canRevoke) {
      return;
    }

    setVerifyLoading(true);
    setVerifyError("");

    try {
      const response = await fetch("/api/certificates/revoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          certificateId: trimmed,
          reason: revokeReason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to revoke certificate");
      }

      setVerified(data.certificate);
    } catch (error) {
      setVerifyError(error instanceof Error ? error.message : "Failed to revoke certificate");
    } finally {
      setVerifyLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold">Certificates Admin Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Logged in as <span className="font-medium text-foreground">{username}</span>
        </p>
        <form action="/api/certificates/auth/logout" method="post" className="mt-4">
          <button
            type="submit"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Logout
          </button>
        </form>
      </div>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Issue A Certificate</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a certificate for a bootcamp, event, or program completion.
        </p>

        <form onSubmit={handleIssue} className="mt-5 grid gap-4 sm:grid-cols-2">
          <input
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            required
            placeholder="Student full name"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            type="email"
            value={studentEmail}
            onChange={(event) => setStudentEmail(event.target.value)}
            placeholder="Student email (optional)"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            value={programName}
            onChange={(event) => setProgramName(event.target.value)}
            required
            placeholder="Program name"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            placeholder="Event name (optional)"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            type="date"
            value={completionDate}
            onChange={(event) => setCompletionDate(event.target.value)}
            required
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <div className="flex items-center">
            <button
              type="submit"
              disabled={issueLoading}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
              {issueLoading ? "Issuing..." : "Issue Certificate"}
            </button>
          </div>
        </form>

        {issueError ? <p className="mt-3 text-sm text-red-400">{issueError}</p> : null}

        {issued ? (
          <div className="mt-4 rounded-md border border-green-500/30 bg-green-500/10 p-4 text-sm">
            <p className="font-medium text-green-200">Certificate issued successfully.</p>
            <p className="mt-1 text-green-100">ID: {issued.id}</p>
            <a href={issued.url} target="_blank" rel="noreferrer" className="mt-1 inline-block text-green-200 underline">
              {issued.url}
            </a>
          </div>
        ) : null}
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Verify / Revoke Certificate</h2>

        <form onSubmit={handleVerify} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            value={verifyId}
            onChange={(event) => setVerifyId(event.target.value)}
            placeholder="Certificate ID"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            required
          />
          <button
            type="submit"
            disabled={verifyLoading}
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold transition hover:bg-muted"
          >
            {verifyLoading ? "Checking..." : "Lookup"}
          </button>
        </form>

        {verifyError ? <p className="mt-3 text-sm text-red-400">{verifyError}</p> : null}

        {verified ? (
          <div className="mt-4 rounded-md border border-border bg-background p-4 text-sm">
            <p>
              <span className="font-semibold">ID:</span> {verified.certificateId}
            </p>
            <p>
              <span className="font-semibold">Student:</span> {verified.studentName}
            </p>
            <p>
              <span className="font-semibold">Program:</span> {verified.programName}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {verified.status}
            </p>
            {verified.revokedReason ? (
              <p>
                <span className="font-semibold">Revoked Reason:</span> {verified.revokedReason}
              </p>
            ) : null}

            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                value={revokeReason}
                onChange={(event) => setRevokeReason(event.target.value)}
                placeholder="Revoke reason"
                className="rounded-md border border-border bg-card px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={handleRevoke}
                disabled={!canRevoke || verifyLoading}
                className="rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground disabled:opacity-50"
              >
                Revoke Certificate
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
