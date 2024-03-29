import { redirect } from "next/navigation";

import UserDetails from "@/components/shared/UserDetails";
import { getUserDetails, getCurrentUser } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = cookies();
  const user: any = await getCurrentUser(cookieStore);

  if (!user) {
    redirect("/login");
  }

  const data: any = await getUserDetails(user.id);

  if (data?.onboarded) {
    redirect("/");
  }

  const userDetails = {
    id: data?._id?.toString(),
    bio: data.bio,
    username: data.username,
    profile_photo: data.profile_photo,
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
