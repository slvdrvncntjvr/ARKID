import { NextRequest, NextResponse } from "next/server";
import { getCertificateById } from "@/lib/certificates";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 60;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(identifier: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(identifier);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { limited: false, retryAfter: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      limited: true,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  rateLimitStore.set(identifier, existing);
  return { limited: false, retryAfter: 0 };
}

export async function GET(request: NextRequest) {
  try {
    const id = String(request.nextUrl.searchParams.get("id") || "").trim();

    if (!id) {
      return NextResponse.json({ error: "Certificate ID is required" }, { status: 400 });
    }

    const identifier = getClientIdentifier(request);
    const rateLimit = checkRateLimit(identifier);
    if (rateLimit.limited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter),
          },
        },
      );
    }

    const certificate = await getCertificateById(id);

    if (!certificate) {
      return NextResponse.json(
        { valid: false, message: "Certificate not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      valid: certificate.status === "active",
      certificate,
    });
  } catch (error) {
    console.error("Verify certificate API error:", error);
    return NextResponse.json(
      { error: "Failed to verify certificate" },
      { status: 500 },
    );
  }
}
