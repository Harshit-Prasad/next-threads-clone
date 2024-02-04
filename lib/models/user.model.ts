import mongoose from "mongoose";
import { ThreadType } from "./thread.model";

export type UserType = {
  _id: string;
  username: string;
  email: string;
  password?: string;
  profile_photo: string;
  bio: string;
  onboarded: boolean;
  threads: ThreadType;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },

    profile_photo: {
      type: String,
      default:
        "https://utfs.io/f/b09d3812-f9cc-41d5-a2e6-e49cbf37825d-33czoe.svg",
    },
    bio: String,
    threads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
      },
    ],
    onboarded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
