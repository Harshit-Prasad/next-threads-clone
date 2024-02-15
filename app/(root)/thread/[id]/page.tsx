import { getThread } from "@/lib/actions/thread.actions";
import { redirect } from "next/navigation";
import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { getCurrentUser, getUserDetails } from "@/lib/actions/user.actions";
import { ThreadType } from "@/lib/models/thread.model";
import { cookies } from "next/headers";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const { id: currentUserId } = await getCurrentUser(cookieStore);

  const data = await getUserDetails(currentUserId);

  if (!id) {
    redirect("/login");
  }

  const thread = await getThread(id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          currentUserId={id}
          parentId={thread.parentId}
          content={thread.content}
          author={thread.author}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={id}
          currentUserImg={data.profile_photo}
          currentUserId={JSON.stringify(currentUserId)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem: ThreadType) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={id}
            parentId={childItem.parentId}
            content={childItem.content}
            author={childItem.author}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}
