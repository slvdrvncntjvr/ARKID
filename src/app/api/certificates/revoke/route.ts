import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/auth";
import { revokeCertificate } from "@/lib/certificates";

const revokeSchema = z.object({
  certificateId: z.string().trim().min(6).max(100),
  reason: z.string().trim().min(3).max(300),
});

export async function POST(request: NextRequest) {
  const auth = await requireAdminSession();
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const payload = await request.json();
    const parsed = revokeSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid revoke payload", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const certificate = await revokeCertificate({
      certificateId: parsed.data.certificateId,
      reason: parsed.data.reason,
      revokedBy: auth.session.username || "admin",
    });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, certificate });
  } catch (error) {
    console.error("Revoke certificate API error:", error);
    return NextResponse.json(
      { error: "Failed to revoke certificate" },
      { status: 500 },
    );
  }
}
