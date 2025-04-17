"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const rehydrate = async () => {
      await useAuthStore.persist.rehydrate();
      setIsLoading(false);
    };
    rehydrate();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Protected routes
      if (isAuthenticated && pathname.startsWith("/login") || pathname.startsWith("/signup")) {
        router.push("/dashboard");
      }
      // Auth routes
      if (!isAuthenticated && pathname.startsWith("/dashboard")) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Don't render anything until hydration is complete
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 