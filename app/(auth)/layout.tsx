import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth",
  description: "User authentication and onboarding.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="bg-dark-1 min-h-dvh flex flex-col justify-center items-center px-4 sm:px-0">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
