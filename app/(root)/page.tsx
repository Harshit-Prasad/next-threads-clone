import { redirect } from "next/navigation";
import { useAuth } from "@/lib/store";

export default async function Home() {
  const { id } = useAuth.getState();

  if (id === "") {
    redirect("/login");
  }

  return <span className="text-light-2 text-head">Home page</span>;
}
