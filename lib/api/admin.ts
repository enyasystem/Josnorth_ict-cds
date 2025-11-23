// lib/api/admin.ts
import { apiRequest } from "./client";
import type { DashboardStats, Activity } from "@/lib/types/api";

export const adminApi = {
  // Get dashboard stats
  getStats: async () => {
    const resp: any = await apiRequest<any>("/v1/admin/stats")
    return resp
  },

  // Get recent activities
  getActivities: async (limit: number = 10) => {
    const resp: any = await apiRequest<any>("/v1/admin/activities", {
      params: { limit },
    })
    return resp
  },

  // Get analytics (if available)
  getAnalytics: async (period: "week" | "month" | "year" = "month") => {
    const resp: any = await apiRequest<any>("/v1/admin/analytics", {
      params: { period },
    })
    return resp
  },
};
