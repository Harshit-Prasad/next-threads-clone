import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getCurrentUser();

  if (user?.id) {
    redirect(`/profile/${user?.id}`);
  } else {
    redirect("/login");
  }

  return null;
}
