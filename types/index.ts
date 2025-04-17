export interface ApiError {
  status: "error";
  statusCode: number;
  data: {
    code: string;
    message: string;
    details: string;
    timestamp: string;
    path: string;
  };
  requestId: string;
  documentation_url: string;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
}