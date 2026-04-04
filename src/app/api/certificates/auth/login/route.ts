import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { verifyAdmin } from "@/lib/sheets";

export async function POST(request: NextRequest) {
  const session = await getSession();
  const formData = await request.formData();

  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!username || !password) {
    return NextResponse.redirect(
      new URL("/certificates/login?error=missing", request.url),
    );
  }

  const isValid = verifyAdmin(username, password);

  if (!isValid) {
    return NextResponse.redirect(
      new URL("/certificates/login?error=invalid", request.url),
    );
  }

  session.isLoggedIn = true;
  session.username = username;
  await session.save();

  return NextResponse.redirect(new URL("/certificates/dashboard", request.url));
}
