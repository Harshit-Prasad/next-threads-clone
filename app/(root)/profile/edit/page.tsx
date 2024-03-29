import UserDetails from "@/components/shared/UserDetails";
import { getCurrentUser, getUserDetails } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const cookieStore = cookies();
  const { id } = await getCurrentUser(cookieStore);

  if (!id) redirect("/login");

  const data = await getUserDetails(id);

  if (!data.onboarded) redirect("/onboarding");

  const userDetails = {
    id: data?.id,
    bio: data?.bio,
    username: data?.username,
    profile_photo: data?.profile_photo,
  };

  return (
    <>
      <h1 className="head-text py-3 sm:pb-5">Edit your Profile</h1>
      <section className="mt-12 flex justify-center">
        <UserDetails
          userDetails={userDetails}
          btnTitle="Update Profile"
          heading=""
        />
      </section>
    </>
  );
}
