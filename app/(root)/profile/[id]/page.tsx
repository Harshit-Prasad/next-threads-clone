import UserProfile from "@/components/shared/UserProfile";
import { getCurrentUser, getUserDetails } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const { id: currentUser } = await getCurrentUser(cookieStore);

  if (!currentUser) {
    redirect("/login");
  }

  const user = await getUserDetails(id);

  const userProfile = {
    currentUser,
    profileUser: user?._id?.toString(),
    bio: user?.bio,
    username: user?.username,
    profile_photo: user?.profile_photo,
  };

  return (
    <>
      <h1 className="head-text text-light-1">Profile</h1>
      <UserProfile {...userProfile} />
    </>
  );
}
