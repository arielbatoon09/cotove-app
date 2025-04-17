import useSWR, { SWRConfiguration } from "swr";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { fetcher } from "./fetcher";
import { ApiError, ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
}

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "") {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
      const error = data as ApiError;
      throw new Error(error.data.message || "Something went wrong");
    }

    return data as ApiResponse<T>;
  }

  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
    };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
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

// Create a reusable SWR hook for GET requests
export function useGet<T>(url: string, config?: SWRConfiguration) {
  const fullConfig = { ...defaultSWRConfig, ...config };
  return useSWR<ApiResponse<T>>(url, fetcher, fullConfig);
}

// Create a reusable SWR mutation hook for POST requests
export function useMutation<T, V = any>(
  url: string,
  config?: Partial<SWRMutationConfiguration<ApiResponse<T>, Error, string, V>>
) {
  return useSWRMutation<ApiResponse<T>, Error, string, V>(
    url,
    async (url: string, { arg }: { arg: V }) => {
      return fetcher(url, { method: "POST", body: arg });
    },
    { revalidate: false, ...config }
  );
}

// Create a reusable SWR mutation hook for PUT requests
export function usePut<T, V = any>(
  url: string,
  config?: Partial<SWRMutationConfiguration<ApiResponse<T>, Error, string, V>>
) {
  return useSWRMutation<ApiResponse<T>, Error, string, V>(
    url,
    async (url: string, { arg }: { arg: V }) => {
      return fetcher(url, { method: "PUT", body: arg });
    },
    { revalidate: false, ...config }
  );
}

// Create a reusable SWR mutation hook for DELETE requests
export function useDelete<T>(
  url: string,
  config?: Partial<SWRMutationConfiguration<ApiResponse<T>, Error, string, never>>
) {
  return useSWRMutation<ApiResponse<T>, Error, string, never>(
    url,
    async (url: string) => {
      return fetcher(url, { method: "DELETE" });
    },
    { revalidate: false, ...config }
  );
} 