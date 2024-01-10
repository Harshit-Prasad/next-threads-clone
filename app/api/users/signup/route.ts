import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import User from "@/lib/models/user.model";
import { connectDB } from "@/lib/db";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // User already exists check
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exsists" },
        { status: 400 }
      );
    }

    // Hashing
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Saving new User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }), { status: 500 };
  }
}
