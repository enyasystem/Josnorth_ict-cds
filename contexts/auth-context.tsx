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

  // Inactivity timer - 1 hour (3600000 ms)
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds

    const resetTimer = () => {
      // Clear existing timer
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }

      // Only set timer if user is logged in
      const token = localStorage.getItem("auth_token");
      if (token) {
        inactivityTimer = setTimeout(() => {
          // Clear token and user data after 1 hour of inactivity
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
          setUser(null);
          toast.error("Session expired due to inactivity");
          router.push("/login");
        }, INACTIVITY_TIMEOUT);
      }
    };

    // Events that indicate user activity
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    // Set up activity listeners
    activityEvents.forEach((event) => {
      document.addEventListener(event, resetTimer, true);
    });

    // Initialize timer
    resetTimer();

    // Cleanup
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      activityEvents.forEach((event) => {
        document.removeEventListener(event, resetTimer, true);
      });
    };
  }, [user, router]);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token");
      const storedUser = localStorage.getItem("user");

      if (token) {
        try {
          // Verify token is still valid by fetching current user
          const response = await authApi.getUser();
          const rawUser = response?.user || response;

          if (rawUser && rawUser.email) {
            // Map API response to User type
            const user: User = {
              id: String(rawUser.pk || rawUser.id || ""),
              email: rawUser.email || "",
              name:
                rawUser.name ||
                rawUser.username ||
                `${rawUser.first_name || ""} ${
                  rawUser.last_name || ""
                }`.trim() ||
                "User",
              username: rawUser.username,
              role: rawUser.role || "admin",
              first_name: rawUser.first_name,
              last_name: rawUser.last_name,
              pk: rawUser.pk,
            };
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
      const response = (await authApi.login(credentials)) as any;

      // Handle case where API returns { key: "token_string" } instead of { token: "...", user: {...} }
      let token: string;
      let user: User | null = null;

      if (typeof response === "string") {
        // API returned just the token string
        token = response;
      } else if (response?.token) {
        // API returned an object with token property
        token = response.token;
        user = response.user || null;
      } else if (response?.key) {
        // API returned an object with key property (token) - this is the actual API response
        token = response.key;
      } else {
        throw new Error("Invalid response from server: token not found");
      }

      // Store token first
      localStorage.setItem("auth_token", token);

      // Fetch user data using the token (since API doesn't return user in login response)
      try {
        const userResponse = await authApi.getUser();
        console.log("User response after login: ", userResponse);
        const rawUser = userResponse?.user || (userResponse as any) || null;

        // Map API response to User type
        if (rawUser) {
          user = {
            id: String(rawUser.pk || rawUser.id || ""),
            email: rawUser.email || "",
            name:
              rawUser.name ||
              rawUser.username ||
              `${rawUser.first_name || ""} ${rawUser.last_name || ""}`.trim() ||
              "User",
            username: rawUser.username,
            role: rawUser.role || "admin",
            first_name: rawUser.first_name,
            last_name: rawUser.last_name,
            pk: rawUser.pk,
          } as User;
        }
      } catch (error) {
        console.error("Failed to fetch user data after login:", error);
        throw new Error(
          "Failed to retrieve user information. Please try again."
        );
      }

      // Validate user data
      if (!user || !user.email) {
        throw new Error("Invalid user data received from server");
      }

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
      const rawUser = response?.user || response;

      if (rawUser && rawUser.email) {
        // Map API response to User type
        const user: User = {
          id: String(rawUser.pk || rawUser.id || ""),
          email: rawUser.email || "",
          name:
            rawUser.name ||
            rawUser.username ||
            `${rawUser.first_name || ""} ${rawUser.last_name || ""}`.trim() ||
            "User",
          username: rawUser.username,
          role: rawUser.role || "admin",
          first_name: rawUser.first_name,
          last_name: rawUser.last_name,
          pk: rawUser.pk,
        };
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
