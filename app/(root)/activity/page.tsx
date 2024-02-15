import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getComments,
  getCurrentUser,
  getUserDetails,
} from "@/lib/actions/user.actions";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const cookieStore = cookies();
  const user = await getCurrentUser(cookieStore);
  if (!user?.id) redirect("/login");

  const userDetails = await getUserDetails(user.id);

  if (!userDetails?.onboarded) redirect("/onboarding");

  const comments = await getComments(user.id);

  return (
    <>
      <h1 className="head-text">Activity</h1>
      <section className="my-9">
        <Tabs defaultValue="comments" className="w-full">
          <TabsList className="tab">
            <TabsTrigger value="comments" className="tab">
              Comments
            </TabsTrigger>
            <TabsTrigger value="likes" className="tab">
              Likes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="comments">
            {comments.length > 0 ? (
              <>
                {comments.map((comment) => (
                  <Link
                    className="inline-block w-full mt-3"
                    key={comment._id}
                    href={`/thread/${comment.parentId}`}
                  >
                    <article className="activity-card">
                      <Image
                        src={comment.author.profile_photo}
                        alt="user_logo"
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                      />
                      <p className="!text-small-regular text-light-1">
                        <span className="mr-1 text-primary-500">
                          {comment.author.username}
                        </span>{" "}
                        replied to your thread
                      </p>
                    </article>
                  </Link>
                ))}
              </>
            ) : (
              <p className="!text-base-regular text-light-3">No activity yet</p>
            )}
          </TabsContent>
          <TabsContent value="likes">Change your password here.</TabsContent>
        </Tabs>
      </section>
    </>
  );
}
