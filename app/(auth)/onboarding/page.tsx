import { redirect } from "next/navigation";

import UserProfile from "@/components/shared/UserProfile";
import { getUserDetails } from "@/lib/actions/getUserDetails";
import getDataFromToken from "@/lib/helpers/getDataFromToken";

export default async function page() {
  const data: any = await getDataFromToken();

  if (!data) {
    redirect("/login");
  }

  const user: any = await getUserDetails(data.id);

  if (user?.data?.onboarded) {
    redirect("/");
  }

  const userDetails = {
    id: user?.data?._id?.toString(),
    bio: user.data.bio,
    username: user.data.username,
    profile_photo: user.data.profile_photo,
    onboarded: user.data.onboarded,
  };

  return (
    <>
      <UserProfile
        userDetails={userDetails}
        heading="Onboarding"
        btnTitle="Continue"
      />
    </>
  );
}
