"use server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import User from "@/lib/models/user.model";
import { connectDB } from "@/lib/db";
import Thread from "../models/thread.model";
import { FilterQuery } from "mongoose";

type SignupParams = {
  username: string;
  email: string;
  password: string;
};

type LoginParams = {
  email: string;
  password: string;
};

type CreateProfileParams = {
  id: string;
  bio: string;
  username: string;
  image: string;
  path: string;
};

type GetUserParams = {
  searchString: string;
  userId: string;
};

export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decodedToken.id) {
      return decodedToken;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function signup({ username, email, password }: SignupParams) {
  try {
    connectDB();

    const user = await User.findOne({ email });
    if (user) {
      return { error: "User already exsists", success: false };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Saving new User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    return {
      message: "User created successfully",
      success: true,
    };
  } catch (error: any) {
    throw new Error(`Signup failed: ${error.message}`);
  }
}

export async function login({ email, password }: LoginParams) {
  try {
    connectDB();

    const cookieStore = cookies();

    const user = await User.findOne({ email });
    if (!user) {
      return { error: "User does not exist" };
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return { error: "Invalid password" };
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    cookieStore.set("token", token, {
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000,
    });

    return {
      message: "Login successful",
      success: true,
    };
  } catch (error: any) {
    throw new Error(`Login failed: ${error.message}`);
  }
}

export async function logout() {
  try {
    const cookieStore = cookies();

    cookieStore.delete("token");

    return {
      message: "Logout successful",
      success: true,
    };
  } catch (error: any) {
    throw new Error(`Logout failed: ${error.message}`);
  }
}

export async function createProfile({
  id,
  bio,
  username,
  image,
  path,
}: CreateProfileParams) {
  try {
    connectDB();

    const updateUser = await User.findOneAndUpdate(
      { _id: id },
      {
        onboarded: true,
        bio: bio,
        username: username,
        profile_photo: image,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }

    return {
      success: true,
      message: "User profile created.",
    };
  } catch (error: any) {
    throw new Error(`Onboarding failed: ${error.message}`);
  }
}

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

    return user;
  } catch (error: any) {
    throw new Error(`Failed to fetch user details: ${error.message}`);
  }
}

export async function getComments(userId: string) {
  try {
    connectDB();

    const threads = await Thread.find({ author: userId });

    const threadChildren = threads.reduce((acc, thread) => {
      return acc.concat(thread.children);
    }, []);

    const comments = await Thread.find({
      _id: { $in: threadChildren },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "profile_photo username",
    });

    return comments;
  } catch (error: any) {
    throw new Error(`Failed to fetch comments details: ${error.message}`);
  }
}

export async function getUsers({ searchString = "", userId }: GetUserParams) {
  try {
    if (searchString.trim() === "") {
      return [];
    }

    connectDB();

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      _id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        {
          username: { $regex: regex },
        },
        {
          email: { $regex: regex },
        },
      ];
    }

    const users = await User.find(query).sort({ createdAt: "desc" });

    return users;
  } catch (error: any) {
    throw new Error(`Failed to fetch requested users: ${error.message}`);
  }
}
