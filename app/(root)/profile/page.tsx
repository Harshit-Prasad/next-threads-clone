import { useAuth } from "@/lib/store";
import { redirect } from "next/navigation";

export default function page() {
  const { id } = useAuth.getState();

  if (id) {
    redirect(`/profile/${id}`);
  } else {
    redirect("/login");
  }

  return null;
}
