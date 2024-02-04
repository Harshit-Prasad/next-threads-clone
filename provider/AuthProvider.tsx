"use client";

import { useAuth } from "@/lib/store";
import { useRef } from "react";

export default function AuthProvider({ id }: { id: string }) {
  const init = useRef(false);

  if (!init.current) {
    useAuth.setState({ id });
    init.current = true;
  }

  return null;
}
