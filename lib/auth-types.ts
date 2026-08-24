export type UserRole = 'admin' | 'user' | 'guest';
export type AuthProvider = 'email' | 'google' | 'guest';

export interface SavedMizajData {
  constitution: string;
  urduConstitution: string;
  testDate: string;
  primaryElement: string;
  recommendations: string[];
  recommendationsUrdu: string[];
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  city?: string;
  provider: AuthProvider;
  createdAt: string;
  savedMizaj?: SavedMizajData;
  orderCount?: number;
}

export interface UserJWTPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  provider: AuthProvider;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: AuthUser;
  message?: string;
}

export interface StoredUserAccount extends AuthUser {
  passwordHash?: string;
}
