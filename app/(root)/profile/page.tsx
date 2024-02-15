import { getCurrentUser } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const cookieStore = cookies();

  const user = await getCurrentUser(cookieStore);

  if (user?.id) {
    redirect(`/profile/${user?.id}`);
  } else {
    redirect("/login");
  }

  return null;
}
