import dataFromToken from "@/lib/helpers/dataFromToken";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await dataFromToken();

  if (!user) {
    redirect("/login");
  }

  return <span className="text-light-2 text-head">Home page</span>;
}
