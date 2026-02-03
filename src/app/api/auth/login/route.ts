import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const session = await getSession();
  const formData = await request.formData();
  
  const username = formData.get("username");
  const password = formData.get("password");

  // Simple authentication check
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    session.isLoggedIn = true;
    session.username = username as string;
    await session.save();

    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.redirect(new URL("/login?error=invalid", request.url));
}
