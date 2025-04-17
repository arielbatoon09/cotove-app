export interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  lastLogin: string | null;
  verifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}