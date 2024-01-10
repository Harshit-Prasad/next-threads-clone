import { redirect } from "next/navigation";

import UserProfile from "@/components/shared/UserProfile";
import { getUserDetails } from "@/lib/actions/getUserDetails";
import dataFromToken from "@/lib/helpers/dataFromToken";

export default async function page() {
  const data: any = await dataFromToken();

  if (!data) {
    redirect("/login");
  }

  const user: any = await getUserDetails(data.id);

  const userDetails = {
    id: user?.data?._id?.toString(),
    bio: user.data.bio,
    username: user.data.username,
    profile_photo: user.data.profile_photo,
    onboarded: user.data.onboarded,
  };

  if (user?.onboarded) {
    redirect("/");
  }

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
