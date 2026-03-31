import { NextRequest, NextResponse } from "next/server";
import { searchMember } from "@/lib/sheets";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const SEARCH_QUERY_MIN_LENGTH = 2;
const SEARCH_QUERY_MAX_LENGTH = 100;

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

function validateSearchQuery(rawQuery: string): { valid: boolean; value?: string; message?: string } {
  const query = rawQuery.trim();

  if (query.length < SEARCH_QUERY_MIN_LENGTH || query.length > SEARCH_QUERY_MAX_LENGTH) {
    return {
      valid: false,
      message: `Search query must be ${SEARCH_QUERY_MIN_LENGTH}-${SEARCH_QUERY_MAX_LENGTH} characters long`,
    };
  }

  const allowedPattern = /^[a-zA-Z0-9@._\-' ]+$/;
  if (!allowedPattern.test(query)) {
    return {
      valid: false,
      message: "Search query contains unsupported characters",
    };
  }

  return { valid: true, value: query };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawQuery = searchParams.get("id") || searchParams.get("query");

    if (!rawQuery) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 },
      );
    }

    const validation = validateSearchQuery(rawQuery);
    if (!validation.valid || !validation.value) {
      return NextResponse.json(
        { error: validation.message || "Invalid search query" },
        { status: 400 },
      );
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

    const members = await searchMember(validation.value);

    if (members.length === 0) {
      return NextResponse.json(
        { found: false, message: "No member found matching your search" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      found: true,
      data: members,
    });
  } catch (error) {
    console.error("Error in member search API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
