import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/auth";
import { issueCertificate } from "@/lib/certificates";

const issueSchema = z.object({
  studentName: z.string().trim().min(2).max(120),
  studentEmail: z.string().trim().email().max(200).optional().or(z.literal("")),
  programName: z.string().trim().min(2).max(180),
  eventName: z.string().trim().max(180).optional().or(z.literal("")),
  completionDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  metadata: z.record(z.unknown()).optional(),
});

const DEFAULT_CERT_HOSTS = ["certificates.arkph.tech", "www.certificates.arkph.tech"];

function getConfiguredCertificateHosts(): string[] {
  const configured = (process.env.CERTIFICATES_HOSTS || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

  return configured.length > 0 ? configured : DEFAULT_CERT_HOSTS;
}

function buildVerifyUrl(request: NextRequest, certificateId: string): string {
  const explicitBase = (process.env.CERTIFICATES_BASE_URL || "").trim();
  if (explicitBase) {
    return `${explicitBase.replace(/\/$/, "")}/${certificateId}`;
  }

  const requestHost = request.headers.get("host")?.split(":")[0]?.toLowerCase() || "";
  if (getConfiguredCertificateHosts().includes(requestHost)) {
    return `${request.nextUrl.origin}/${certificateId}`;
  }

  return `${request.nextUrl.origin}/certificates/${certificateId}`;
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminSession();
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const payload = await request.json();
    const parsed = issueSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid certificate payload", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const certificate = await issueCertificate({
      ...parsed.data,
      issuerUsername: auth.session.username || "admin",
    });

    const verifyUrl = buildVerifyUrl(request, certificate.certificateId);

    return NextResponse.json({
      success: true,
      certificate,
      verifyUrl,
    });
  } catch (error) {
    console.error("Issue certificate API error:", error);
    return NextResponse.json(
      { error: "Failed to issue certificate" },
      { status: 500 },
    );
  }
}
