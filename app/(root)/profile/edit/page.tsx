import UserDetails from "@/components/shared/UserDetails";
import { getUserDetails } from "@/lib/actions/getUserDetails";
import { useAuth } from "@/lib/store";

export default async function page() {
  const { id } = useAuth.getState();
  const { data } = await getUserDetails(id);

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
