"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Topbar() {
  const { toast } = useToast();
  const router = useRouter();

  async function handleLogout() {
    try {
      const response: { ok: boolean; message: string } = await axios.get(
        "/api/users/logout"
      );
      toast({
        title: "Success",
        description: response.message,
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
