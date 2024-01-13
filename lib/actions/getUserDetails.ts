"use server";

import { connectDB } from "@/lib/db";
import User from "@/lib/models/user.model";

export async function getUserDetails(userId: string) {
  try {
    connectDB();
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return {
        error: "User does not exist",
        status: 400,
      };
    }

    return {
      data: user,
    };
  } catch (error: any) {
    return { error: error.message, status: 500 };
  }
}
