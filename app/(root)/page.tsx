import { redirect } from "next/navigation";
import { getThreads } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";
import { getCurrentUser, getUserDetails } from "@/lib/actions/user.actions";
import ErrorCard from "@/components/cards/ErrorCard";
import HomeThreadsInfiniteScrolling from "@/components/infinite-scrolling/HomeThreadsInfiniteScrolling";
import { ThreadType } from "@/lib/models/thread.model";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const user = await getCurrentUser(cookieStore);

  if (!user?.id) {
    redirect("/login");
  }

  const userDetails = await getUserDetails(user?.id);

  if (!userDetails.onboarded) {
    redirect("/onboarding");
  }

  const result: any = await getThreads();

  if (result?.error) {
    const { error } = result;
    return <ErrorCard error={error} />;
  }

  const initialThreads = result.map((thread: ThreadType, index: number) => {
    return (
      <ThreadCard
        key={thread._id}
        id={thread._id.toString()}
        content={thread.content}
        author={thread.author}
        comments={thread.children}
        index={index}
      />
    );
  });

  return (
    <>
      <h1 className="text-light-2 head-text">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.length === 0 && <p className="no-result">No threads found</p>}
        <HomeThreadsInfiniteScrolling initialThreads={initialThreads} />
      </section>
    </>
  );
}
