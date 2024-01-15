import getDataFromToken from "@/lib/helpers/getDataFromToken";
import { redirect } from "next/navigation";

export default async function page() {
  const { id } = await getDataFromToken();

  if (id) {
    redirect(`/profile/${id}`);
  } else {
    redirect("/login");
  }

  return null;
}
