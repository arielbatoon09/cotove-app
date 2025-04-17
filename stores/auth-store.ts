import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginFormType } from "@/validations/auth";
import { ApiResponse } from "@/types";
import { httpClient } from "@/lib/http-client";
import { LoginSuccessData } from "@/types/auth-types";
import { mutate } from "swr";
import { AuthState } from "@/types/auth-types";
import { User } from "@/types/user-types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

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
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
        // Reset SWR cache on logout
        mutate(() => true, undefined, { revalidate: true });
      },
    }),
    {
      name: "cotove-app-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 