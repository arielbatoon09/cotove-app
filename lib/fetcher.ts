import { ApiError, ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

interface FetchOptions extends RequestInit {
  body?: any;
}

export async function fetcher<T>(url: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = data as ApiResponse<ApiError>;
    throw error.data;
  }

  return data as ApiResponse<T>;
} 