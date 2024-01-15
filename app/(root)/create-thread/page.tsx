import { redirect } from "next/navigation";

import PostThread from "@/components/forms/PostThread";
import getDataFromToken from "@/lib/helpers/getDataFromToken";
import { getUserDetails } from "@/lib/actions/user.actions";

async function Page() {
  const user = await getDataFromToken();
  if (!user) redirect("/login");

  const userDetails = await getUserDetails(user.id);

  if (!userDetails?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userDetails?._id.toString()} />
    </>
  );
}

export default Page;
