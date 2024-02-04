"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { logout } from "@/lib/actions/user.actions";
import { useAuth } from "@/lib/store";

export default function Topbar() {
  const { toast } = useToast();
  const router = useRouter();

  async function handleLogout() {
    try {
      const data: { success: boolean; message: string } = await logout();
      useAuth.setState({ id: "" });
      toast({
        title: "Success",
        description: data.message,
      });
      router.push("/login");
    } catch (error: any) {
      toast({
        title: "Success",
        description: "Something went wrong",
      });
      throw new Error(error.message);
    }
  }

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <p className="text-heading3-bold text-light-1 max-xs:text-heading4-medium">
          <span className="text-primary-500">Th</span>
          reads
        </p>
      </Link>

      <Button
        onClick={handleLogout}
        className="text-light-1 flex items-center gap-3"
      >
        <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
        <span className="text-light-2 max-lg:hidden">Logout</span>
      </Button>
    </nav>
  );
}
