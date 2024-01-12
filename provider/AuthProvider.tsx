"use client";

import { useAuth } from "@/lib/store";

export default function AuthProvider({ id }: { id: string }) {
  useAuth.setState({ id });

  return null;
}
