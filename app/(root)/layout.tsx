import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import "../globals.css";
import { getCurrentUser } from "@/lib/actions/user.actions";
import AuthProvider from "@/provider/AuthProvider";
import { useAuth } from "@/lib/store";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "Threads clone using nextjs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const user = await getCurrentUser(cookieStore);

  useAuth.setState({ id: user?.id });

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-dark-1
      `}
      >
        <AuthProvider id={user?.id} />
        <Topbar />
        <main className="flex flex-row">
          <LeftSidebar />
          <section className="main-container">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
          {/* <RightSidebar /> */}
        </main>
        <Bottombar />
      </body>
    </html>
  );
}
