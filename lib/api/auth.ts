// lib/api/auth.ts
import { apiRequest } from "./client";
import type {
  LoginCredentials,
  LoginResponse,
  RegisterData,
  User,
} from "@/lib/types/api";

export const authApi = {
  // Login
  login: (credentials: LoginCredentials) =>
    apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      data: credentials,
    }),

  // Register
  register: (data: RegisterData) =>
    apiRequest<LoginResponse>("/auth/register", {
      method: "POST",
      data,
    }),

  // Get current user
  getCurrentUser: () => apiRequest<{ user: User }>("/auth/me"),

  // Logout
  logout: () =>
    apiRequest<void>("/auth/logout", {
      method: "POST",
    }),

  // Refresh token
  refreshToken: (refreshToken: string) =>
    apiRequest<{ token: string }>("/auth/refresh", {
      method: "POST",
      data: { refreshToken },
    }),

  // Update profile
  updateProfile: (data: Partial<User>) =>
    apiRequest<{ user: User }>("/auth/profile", {
      method: "PATCH",
      data,
    }),

  // Change password
  changePassword: (oldPassword: string, newPassword: string) =>
    apiRequest<void>("/auth/change-password", {
      method: "POST",
      data: { oldPassword, newPassword },
    }),
};
