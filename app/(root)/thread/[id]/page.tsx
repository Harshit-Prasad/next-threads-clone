import { getThread } from "@/lib/actions/thread.actions";
import getDataFromToken from "@/lib/helpers/getDataFromToken";
import { redirect } from "next/navigation";
import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { getUserDetails } from "@/lib/actions/user.actions";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const { id: currentUserId } = await getDataFromToken();

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
        {thread.children.map((childItem: any) => (
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
