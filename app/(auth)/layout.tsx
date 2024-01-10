import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth",
  description: "User authentication and onboarding.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-dark-1 min-h-dvh flex flex-col justify-center items-center`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
