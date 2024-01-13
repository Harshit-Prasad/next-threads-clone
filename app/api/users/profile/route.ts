import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/user.model";
import { connectDB } from "@/lib/db";
import { revalidatePath } from "next/cache";

connectDB();

type ReqBody = {
  id: string;
  bio: string;
  username: string;
  image: string;
  path: string;
};

export async function PUT(request: NextRequest) {
  try {
    const reqBody: ReqBody = await request.json();

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

    if (reqBody.path === "/profile/edit") {
      revalidatePath(reqBody.path);
    }

    return NextResponse.json({
      ok: true,
      message: "User profile created.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
