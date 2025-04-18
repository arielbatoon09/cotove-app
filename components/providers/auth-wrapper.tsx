"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
  variant?: "protected" | "auth";
}

export function AuthWrapper({ children, variant = "protected" }: AuthWrapperProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (variant === "protected" && !isAuthenticated) {
      router.push("/login");
    } else if (variant === "auth" && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router, variant]);

  if (variant === "protected" && !isAuthenticated) {
    return null;
  }

  if (variant === "auth" && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 