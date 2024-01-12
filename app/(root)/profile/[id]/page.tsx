import { getUserDetails } from "@/lib/actions/getUserDetails";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = await getUserDetails(id);

  const userDetails = {
    id: user?.data?._id?.toString(),
    bio: user.data.bio,
    username: user.data.username,
    profile_photo: user.data.profile_photo,
    onboarded: user.data.onboarded,
  };

  return <div>{id}</div>;
}
