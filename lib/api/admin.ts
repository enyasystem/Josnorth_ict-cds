// lib/api/admin.ts
import { apiRequest } from "./client";
import type { DashboardStats, Activity } from "@/lib/types/api";

export const adminApi = {
  // Get dashboard stats
  getStats: () => apiRequest<{ data: DashboardStats }>("/admin/stats"),

  // Get recent activities
  getActivities: (limit: number = 10) =>
    apiRequest<{ data: Activity[] }>("/admin/activities", {
      params: { limit },
    }),

  // Get analytics (if available)
  getAnalytics: (period: "week" | "month" | "year" = "month") =>
    apiRequest<{ data: any }>("/admin/analytics", {
      params: { period },
    }),
};
