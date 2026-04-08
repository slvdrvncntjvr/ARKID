import { NextRequest, NextResponse } from "next/server";

const DEFAULT_CERT_HOSTS = ["certificates.arkph.tech", "www.certificates.arkph.tech"];

function getConfiguredCertificateHosts(): Set<string> {
  const configured = (process.env.CERTIFICATES_HOSTS || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

  return new Set(configured.length > 0 ? configured : DEFAULT_CERT_HOSTS);
}

function normalizeHost(rawHost: string): string {
  // Remove :port for local/dev hosts before matching.
  return rawHost.split(":")[0] || rawHost;
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  );
}

export function middleware(request: NextRequest) {
  const host = normalizeHost(request.headers.get("host")?.toLowerCase() || "");
  const certHosts = getConfiguredCertificateHosts();

  if (!certHosts.has(host)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();

  if (pathname === "/") {
    rewriteUrl.pathname = "/certificates";
    return NextResponse.rewrite(rewriteUrl);
  }

  if (pathname.startsWith("/certificates")) {
    return NextResponse.next();
  }

  rewriteUrl.pathname = `/certificates${pathname}`;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/:path*"],
};
