import { redirect } from "next/navigation";
import getDataFromToken from "@/lib/helpers/getDataFromToken";
import { getThreads } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";
import { getUserDetails } from "@/lib/actions/user.actions";

export default async function Home() {
  const { id } = await getDataFromToken();

  if (!id) {
    redirect("/login");
  }

  const user = await getUserDetails(id);

  if (!user.onboarded) {
    redirect("/onboarding");
  }

  const result: any = await getThreads();

  return (
    <>
      <h1 className="text-light-2 head-text">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.map((post: any) => (
              <ThreadCard
                key={post._id}
                id={post._id.toString()}
                currentUserId={id}
                parentId={post.parentId}
                content={post.content}
                author={post.author}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
