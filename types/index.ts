export interface ApiError {
  code: string;
  message: string;
  details: string;
  timestamp: string;
  path: string;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  statusCode: number;
  data: T;
  requestId: string;
  documentation_url: string;
}
