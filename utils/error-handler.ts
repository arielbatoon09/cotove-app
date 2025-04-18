import { ApiError } from "@/types";

export function handleApiError(error: unknown): string {
  if (error && typeof error === 'object') {
    if ('response' in error) {
      const axiosError = error as { response: { data: ApiError } };
      return axiosError.response.data.data.message;
    } else if ('message' in error) {
      return (error as Error).message;
    }
  }
  return "An unexpected error occurred";
} 