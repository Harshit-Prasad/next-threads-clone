"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import Thread, { ThreadType } from "@/lib/models/thread.model";
import User, { UserType } from "../models/user.model";
import { getErrorMessage } from "../helpers/getErrorMessage";

type CreateThreadParams = {
  content: string;
  author: string;
  path: string;
};

type CommentThreadParams = {
  threadId: string;
  comment: string;
  userId: any;
  path: string;
};

export async function createThread({
  content,
  author,
  path,
}: CreateThreadParams) {
  try {
    connectDB();

    const thread = {
      content,
      author,
      parentId: null,
    };

    const createNewThread = await Thread.create(thread);

    if (!createNewThread) {
      return;
    }

    if (path === "/create-thread") {
      revalidatePath("/");
    }

    return;
  } catch (error: any) {
    throw new Error(`Create thread: ${error.message}`);
  }
}

export async function commentThread({
  threadId,
  comment,
  userId,
  path,
}: CommentThreadParams) {
  try {
    connectDB();

    const parentThread = await Thread.findById(threadId);

    const commentThreadBody = {
      content: comment,
      author: userId,
      parentId: threadId,
    };

    const commentThread = await Thread.create(commentThreadBody);

    parentThread.children.push(commentThread._id);

    await parentThread.save();

    revalidatePath(path);

    return {
      message: "Comment saved",
      success: true,
    };
  } catch (error: any) {
    throw new Error(`Add comment: ${error.message}`);
  }
}

export async function getThreads(pageNumber = 1, pageSize = 4) {
  try {
    connectDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const threads: ThreadType[] = await Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
        select: "username profile_photo",
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "profile_photo",
        },
      });

    await new Promise((res) => setTimeout(res, 500));

    return JSON.parse(JSON.stringify(threads));
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function getThread(threadId: string) {
  try {
    connectDB();

    const thread = await Thread.findById(threadId)
      .populate({
        path: "author",
        model: User,
        select: "_id username profile_photo",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id username parentId profile_photo",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id username parentId profile_photo",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    return { error: error.message, status: 500 };
  }
}
