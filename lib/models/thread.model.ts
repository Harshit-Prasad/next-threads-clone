import mongoose from "mongoose";
import { UserType } from "./user.model";

export type ThreadType = {
  _id: string;
  content: string;
  author: UserType;
  parentId: string;
  children: ThreadType[];
  createdAt: Date;
  updatedAt: Date;
};

const threadSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentId: {
      type: String,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Thread =
  mongoose?.models?.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
