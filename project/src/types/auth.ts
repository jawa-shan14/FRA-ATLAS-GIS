export type UserRole = 'farmer' | 'guard' | 'admin';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  village?: string;
  district?: string;
  state?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface LoginCredentials {
  username?: string;
  password?: string;
  phone?: string;
  otp?: string;
}