import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import useSWR, { SWRConfiguration } from "swr";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { ApiResponse } from "@/types";
import { useAuthStore } from "@/stores/auth-store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class HttpClient {
  private instance: AxiosInstance;
  private refreshPromise: Promise<void> | null = null;
  private requestQueue: (() => void)[] = [];

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.instance.interceptors.request.use(this.handleRequest);
    this.instance.interceptors.response.use(
      (response) => response,
      this.handleResponseError
    );
  }

  private handleRequest = (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore.getState();
    const accessToken = authStore.user?.accessToken;

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  };

  private handleResponseError = async (error: any) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await this.handleTokenRefresh();
        return this.instance(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        throw refreshError;
      }
    }

    throw error;
  };

  private async handleTokenRefresh() {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const authStore = useAuthStore.getState();
        const refreshToken = authStore.user?.refreshToken;

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await this.instance.post<ApiResponse<{
          accessToken: string;
          refreshToken: string;
          expiresIn: number;
          expiresAt: number;
        }>>("/api/v1/auth/refresh", { refreshToken });

        if (response.data.status === "success") {
          authStore.updateTokens(response.data.data);
        }
      } finally {
        this.refreshPromise = null;
        this.processQueue();
      }
    })();

    return this.refreshPromise;
  }

  private processQueue() {
    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift();
      if (request) request();
    }
  }

  // HTTP Methods
  async get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

export const httpClient = new HttpClient();

// Default SWR configuration
export const defaultSWRConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
  dedupingInterval: 2000,
};

// SWR Hooks
export function useGet<T>(url: string, config?: SWRConfiguration) {
  const fullConfig = { ...defaultSWRConfig, ...config };
  return useSWR<ApiResponse<T>>(url, (url) => httpClient.get(url), fullConfig);
}

export function useMutation<T, V = any>(
  url: string,
  config?: Partial<SWRMutationConfiguration<ApiResponse<T>, Error, string, V>>
) {
  return useSWRMutation<ApiResponse<T>, Error, string, V>(
    url,
    async (url, { arg }) => httpClient.post(url, arg),
    { revalidate: false, ...config }
  );
}

export function usePut<T, V = any>(
  url: string,
  config?: Partial<SWRMutationConfiguration<ApiResponse<T>, Error, string, V>>
) {
  return useSWRMutation<ApiResponse<T>, Error, string, V>(
    url,
    async (url, { arg }) => httpClient.put(url, arg),
    { revalidate: false, ...config }
  );
}

export function useDelete<T>(
  url: string,
  config?: Partial<SWRMutationConfiguration<ApiResponse<T>, Error, string, never>>
) {
  return useSWRMutation<ApiResponse<T>, Error, string, never>(
    url,
    async (url) => httpClient.delete(url),
    { revalidate: false, ...config }
  );
} 