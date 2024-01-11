import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/user.model";
import { connectDB } from "@/lib/db";

connectDB();

type ReqBody = {
  id: string;
  bio: string;
  username: string;
  image: string;
};

export async function PUT(request: NextRequest) {
  try {
    const reqBody: ReqBody = await request.json();

    console.log(reqBody);
    const updateUser = await User.findOneAndUpdate(
      { _id: reqBody.id },
      {
        onboarded: true,
        bio: reqBody.bio,
        username: reqBody.username,
        profile_photo: reqBody.image,
      },
      { upsert: true }
    );

    return NextResponse.json({
      ok: true,
      message: "User profile created.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
