import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginFormType } from "@/validations/auth";
import { ApiResponse } from "@/types";
import { httpClient } from "@/lib/http-client";
import { LoginSuccessData } from "@/types/auth-types";
import { mutate } from "swr";
import { AuthState } from "@/types/auth-types";
import { User } from "@/types/user-types";

interface AuthStoreState extends AuthState {
  checkTokenExpiration: () => void;
  updateTokens: (tokens: { accessToken: string; refreshToken: string; expiresIn: number; expiresAt: number }) => void;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      accessToken: null,
      refreshToken: null,

      // Check token expiration
      checkTokenExpiration: () => {
        const state = get();
        if (state.user?.expiresAt) {
          const now = Math.floor(Date.now() / 1000);
          if (now >= state.user.expiresAt) {
            set({
              user: null,
              isAuthenticated: false,
            });
            mutate(() => true, undefined, { revalidate: true });
          }
        }
      },

      // Update tokens
      updateTokens: (tokens) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...tokens } : null,
        }));
      },

      // Login Handler
      login: async (data: LoginFormType) => {
        try {
          set({ isLoading: true });
          
          const response = await httpClient.post<ApiResponse<LoginSuccessData>>("/api/v1/auth/login", data);

          if (response.status === "success") {
            set({
              user: response.data as unknown as User,
              isAuthenticated: true,
              isLoading: false,
            });

            // Reset SWR cache and form state
            await mutate(() => true, undefined, { revalidate: true });
          }
          
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Logout Handler
      logout: async () => {
        try {
          const { user } = get();
          if (!user?.refreshToken) {
            throw new Error("No refresh token provided for logout");
          }

          await httpClient.post('/api/v1/auth/logout', {
            refreshToken: user.refreshToken,
          });

          // Reset SWR cache and form state
          await mutate(() => true, undefined, { revalidate: true });
          
          // Clear auth state
          set({
            user: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.error('Logout error:', error);
          throw error;
        }
      },

      // Set User
      setUser: (user: User | null) => {
        set({ user });
      },

      // Set Tokens
      setTokens: (accessToken: string, refreshToken: string) => {
        set((state) => ({
          accessToken,
          refreshToken,
        }));
      },
    }),
    {
      name: "cotove-app-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
); 