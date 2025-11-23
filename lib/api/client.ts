// lib/api/client.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";

// Normalize the API base URL so it always ends with `/api` (not `/v1`),
// preventing duplicated paths like `/api/v1/v1/teams` when endpoints include `/v1`.
let API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyscjosnorth.onrender.com/api";
API_BASE_URL = API_BASE_URL.replace(/\/+$/, "") // remove trailing slashes
// If someone mistakenly set the env var to include `/v1`, convert it to `/api`.
if (API_BASE_URL.match(/\/v1$/)) {
  API_BASE_URL = API_BASE_URL.replace(/\/v1$/, '/api')
}
// Ensure base url ends with `/api` so endpoints like `/v1/teams` resolve to `/api/v1/teams`.
if (!API_BASE_URL.match(/\/api$/)) {
  API_BASE_URL = API_BASE_URL + '/api'
}

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds (Render.com can be slow on free tier)
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        if (!config.headers) config.headers = {} as any;
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Handle unauthorized - clear token and redirect
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  options?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await apiClient(endpoint, options);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || error.message,
        statusCode: error.response?.status || 500,
        errors: error.response?.data?.errors,
      };
    }
    throw error;
  }
}
