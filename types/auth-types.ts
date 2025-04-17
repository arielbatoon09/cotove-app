export interface SignupSuccessData {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    isActive: boolean;
    lastLogin: string | null;
    verifiedAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
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
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    isActive: boolean;
    lastLogin: string | null;
    verifiedAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
  timestamp: string;
  path: string;
}

export interface LoginFormType {
  email: string;
  password: string;
}