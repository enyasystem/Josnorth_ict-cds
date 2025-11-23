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
  login: async (credentials: LoginCredentials) => {
    const resp: any = await apiRequest<any>("/v1/auth/login", {
      method: "POST",
      data: credentials,
    })
    return resp
  },

  // Register
  register: async (data: RegisterData) => {
    const resp: any = await apiRequest<any>("/v1/auth/register", {
      method: "POST",
      data,
    })
    return resp
  },

  // Get current user
  getCurrentUser: async () => {
    const resp: any = await apiRequest<any>("/v1/auth/me")
    return resp
  },

  // Logout
  logout: async () => {
    const resp: any = await apiRequest<any>("/v1/auth/logout", {
      method: "POST",
    })
    return resp
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    const resp: any = await apiRequest<any>("/v1/auth/refresh", {
      method: "POST",
      data: { refreshToken },
    })
    return resp
  },

  // Update profile
  updateProfile: async (data: Partial<User>) => {
    const resp: any = await apiRequest<any>("/v1/auth/profile", {
      method: "PATCH",
      data,
    })
    return resp
  },

  // Change password
  changePassword: async (oldPassword: string, newPassword: string) => {
    const resp: any = await apiRequest<any>("/v1/auth/change-password", {
      method: "POST",
      data: { oldPassword, newPassword },
    })
    return resp
  },
};
