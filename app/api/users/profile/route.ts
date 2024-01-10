import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "@/lib/models/user.model";
import { connectDB } from "@/lib/db";

connectDB();

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();

    console.log(reqBody);

    return NextResponse.json({
      data: reqBody,
      message: "User updated",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
