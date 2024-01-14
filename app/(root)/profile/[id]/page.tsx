import UserProfile from "@/components/shared/UserProfile";
import { getUserDetails } from "@/lib/actions/getUserDetails";
import getDataFromToken from "@/lib/helpers/getDataFromToken";
import { redirect } from "next/navigation";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const { id: currentUser } = await getDataFromToken();

  if (currentUser === "") {
    redirect("/login");
  }

  const user = await getUserDetails(id);

  const userProfile = {
    currentUser,
    profileUser: user?.data?._id?.toString(),
    bio: user?.data?.bio,
    username: user?.data?.username,
    profile_photo: user?.data?.profile_photo,
  };

  return (
    <>
      <UserProfile {...userProfile} />
    </>
  );
}
