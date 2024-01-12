import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      ok: true,
    });
    response.cookies.delete("token");

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
