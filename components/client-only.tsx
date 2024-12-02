"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}