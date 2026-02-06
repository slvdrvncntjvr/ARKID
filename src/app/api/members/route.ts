import { NextRequest, NextResponse } from "next/server";
import { searchMember } from "@/lib/sheets";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("id") || searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 },
      );
    }

    const member = await searchMember(query);

    if (!member) {
      return NextResponse.json(
        { found: false, message: "No member found matching your search" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      found: true,
      data: member,
    });
  } catch (error: any) {
    console.error("Error in member search API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}
