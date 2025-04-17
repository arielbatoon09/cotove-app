"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
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
  const { isAuthenticated, checkTokenExpiration, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // Calculate next check time based on token expiration
  const scheduleNextCheck = useCallback(() => {
    if (!user?.expiresAt) return null;

    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = user.expiresAt - now;
    
    // If already expired or about to expire, check immediately
    if (timeUntilExpiry <= 60) {
      return 0;
    }

    // Schedule check for 5 minutes before expiration
    return (timeUntilExpiry - 300) * 1000;
  }, [user?.expiresAt]);

  useEffect(() => {
    const rehydrate = async () => {
      await useAuthStore.persist.rehydrate();
      setIsLoading(false);
    };
    rehydrate();
  }, []);

  // Dynamic token expiration check
  useEffect(() => {
    if (!user?.expiresAt) return;

    const delay = scheduleNextCheck();
    if (delay === null) return;

    const timeout = setTimeout(() => {
      checkTokenExpiration();
    }, delay);

    return () => clearTimeout(timeout);
  }, [user?.expiresAt, checkTokenExpiration, scheduleNextCheck]);

  useEffect(() => {
    if (!isLoading) {
      // Protected routes
      if (isAuthenticated && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
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