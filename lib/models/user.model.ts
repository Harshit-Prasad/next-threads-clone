import mongoose from "mongoose";

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
    onboarded: {
      type: Boolean,
      default: false,
    },
    profile_photo: {
      type: String,
      default:
        "https://utfs.io/f/61f87d75-9dec-4df6-aa50-40f5f2abe841-33czoe.svg",
    },
    bio: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
