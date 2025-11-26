// lib/api/auth.ts
import { apiRequest } from "./client";
import type {
  LoginCredentials,
  LoginResponse,
  RegisterData,
  User,
} from "@/lib/types/api";

export interface PasswordChangeData {
  old_password: string;
  new_password: string;
}

export interface PasswordResetData {
  email: string;
}

export interface PasswordResetConfirmData {
  uid: string;
  token: string;
  new_password: string;
}

export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return await apiRequest<LoginResponse>("/v1/auth/login/", {
      method: "POST",
      data: credentials,
    });
  },

  // Register
  register: async (data: RegisterData): Promise<LoginResponse> => {
    return await apiRequest<LoginResponse>("/v1/auth/register/", {
      method: "POST",
      data,
    });
  },

  // Get current user
  getUser: async (): Promise<{ user: User }> => {
    return await apiRequest<{ user: User }>("/v1/auth/user/");
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiRequest<void>("/v1/auth/logout/", {
      method: "POST",
    });
  },

  // Change password
  changePassword: async (data: PasswordChangeData): Promise<void> => {
    await apiRequest<void>("/v1/auth/password/change/", {
      method: "POST",
      data,
    });
  },

  // Password reset request
  passwordReset: async (data: PasswordResetData): Promise<void> => {
    await apiRequest<void>("/v1/auth/password/reset/", {
      method: "POST",
      data,
    });
  },

  // Password reset confirm
  passwordResetConfirm: async (
    data: PasswordResetConfirmData
  ): Promise<void> => {
    await apiRequest<void>("/v1/auth/password/reset/confirm/", {
      method: "POST",
      data,
    });
  },
};
