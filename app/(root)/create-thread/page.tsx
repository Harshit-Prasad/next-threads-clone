import { redirect } from "next/navigation";

import CreateThread from "@/components/forms/CreateThread";
import getDataFromToken from "@/lib/helpers/getDataFromToken";
import { getUserDetails } from "@/lib/actions/getUserDetails";

async function Page() {
  const user = await getDataFromToken();
  if (!user) redirect("/login");

  const { data: userDetails } = await getUserDetails(user.id);

  if (!userDetails?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>

      <CreateThread userId={userDetails._id.toString()} />
    </>
  );
}

export default Page;
