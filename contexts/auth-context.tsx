"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import type { User, LoginCredentials, RegisterData } from "@/lib/types/api";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token");
      const storedUser = localStorage.getItem("user");

      if (token) {
        try {
          // Verify token is still valid by fetching current user
          const response = await authApi.getUser();
          const user = response?.user || response;
          if (user && user.email) {
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
          } else {
            // Invalid user data, clear storage
            localStorage.removeItem("auth_token");
            localStorage.removeItem("user");
          }
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);

      // Validate response structure
      if (!response || !response.token) {
        throw new Error("Invalid response from server");
      }

      // Handle different possible response structures
      const user = response.user || response;
      if (!user || !user.email) {
        throw new Error("User data not found in response");
      }

      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      toast.success("Login successful!");

      // Redirect based on role (default to admin if role is not specified)
      const userRole = user.role || "admin";
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authApi.register(data);

      // Validate response structure
      if (!response || !response.token) {
        throw new Error("Invalid response from server");
      }

      // Handle different possible response structures
      const user = response.user || response;
      if (!user || !user.email) {
        throw new Error("User data not found in response");
      }

      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      toast.success("Registration successful!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      throw error;
    }
  };

  const logout = () => {
    authApi.logout().catch(() => {}); // Best effort
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      // Refresh user data from server
      const response = await authApi.getUser();
      const user = response?.user || response;
      if (user && user.email) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Profile updated!");
      } else {
        throw new Error("Invalid user data received");
      }
    } catch (error: any) {
      toast.error(error.message || "Update failed");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
