import { User } from "@/types/user-types";

export interface SignupSuccessData {
  message: string;
  user: User;
  verificationUrl: string;
  timestamp: string;
  path: string;
}

export interface SignupFormType {
  name: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

export interface LoginSuccessData {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  lastLogin: string | null;
  verifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginFormType {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormType) => Promise<void>;
  logout: () => void;
}