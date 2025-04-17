export interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  expiresAt?: number;
  details?: {
    id: string;
    email: string;
    name: string;
    isActive: boolean;
  };
  timestamp?: string;
  path?: string;
}