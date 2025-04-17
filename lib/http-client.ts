import { toast } from "sonner";
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

  constructor(baseUrl?: string) {
    const url = baseUrl || API_BASE_URL;
    if (!url) {
      throw new Error("API_BASE_URL is not defined");
    }
    this.baseUrl = url;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  }

  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      // Add any common headers here (e.g., auth tokens)
    };
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        method: "GET",
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  }

  async post<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        method: "POST",
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unexpected error occurred");
      }
      throw error;
    }
  }

  async put<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        method: "PUT",
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        method: "DELETE",
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
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