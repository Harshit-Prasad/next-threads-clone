import { redirect } from "next/navigation";

import UserDetails from "@/components/shared/UserDetails";
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
  };

  return (
    <>
      <h1 className="head-text py-3 sm:pb-5">Onboarding</h1>
      <UserDetails
        userDetails={userDetails}
        heading="Onboarding"
        btnTitle="Continue"
      />
    </>
  );
}
