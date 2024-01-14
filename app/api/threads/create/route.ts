import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Thread from "@/lib/models/thread.model";

connectDB();

type ReqBody = {
  content: string;
  author: string;
  path: string;
};

export async function POST(request: NextRequest) {
  try {
    const reqBody: ReqBody = await request.json();

    const thread = {
      content: reqBody.content,
      author: reqBody.author,
      parentId: null,
    };

    const createThread = await Thread.create(thread);

    if (!createThread) {
      return NextResponse.json({
        ok: false,
        message: "Thread was not created",
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Thread was created",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
