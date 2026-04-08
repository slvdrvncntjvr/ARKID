import { NextResponse } from "next/server";
import { getSession, SessionData } from "@/lib/session";

export async function requireAdminSession(): Promise<
  { ok: true; session: SessionData & { isLoggedIn: true } } | { ok: false; response: NextResponse }
> {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return {
    ok: true,
    session: {
      isLoggedIn: true,
      username: session.username || "admin",
    },
  };
}
