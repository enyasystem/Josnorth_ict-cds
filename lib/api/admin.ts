// lib/api/admin.ts
import { apiRequest } from "./client";
import type { DashboardStats, Activity } from "@/lib/types/api";
import { eventsApi } from "./events";
import { resourcesApi } from "./resources";
import { teamApi } from "./team";

export const adminApi = {
  // Get dashboard stats - calculate from existing endpoints
  getStats: async (): Promise<{ data: DashboardStats }> => {
    try {
      // Try the admin stats endpoint first
      const resp: any = await apiRequest<any>("/v1/admin/stats");
      return resp;
    } catch (error: any) {
      // If endpoint doesn't exist, calculate stats from other endpoints
      if (error.statusCode === 404) {
        try {
          // Fetch data from existing endpoints
          const [eventsResp, resourcesResp, excosResp, devsResp] =
            await Promise.allSettled([
              eventsApi.getAll({ limit: 1000 }),
              resourcesApi.getAll({ limit: 1000 }),
              teamApi.getExcos(),
              teamApi.getDevelopers(),
            ]);

          const events =
            eventsResp.status === "fulfilled"
              ? eventsResp.value?.data || []
              : [];
          const resources =
            resourcesResp.status === "fulfilled"
              ? resourcesResp.value?.data || []
              : [];
          const excos =
            excosResp.status === "fulfilled" ? excosResp.value?.data || [] : [];
          const developers =
            devsResp.status === "fulfilled" ? devsResp.value?.data || [] : [];

          const stats: DashboardStats = {
            totalEvents: events.length,
            publishedEvents: events.filter((e: any) => e.status === "published")
              .length,
            activeExcos: excos.length,
            totalExcos: excos.length,
            totalResources: resources.length,
            totalDocuments: resources.filter(
              (r: any) => r.category === "document"
            ).length,
            totalDevelopers: developers.length,
          };

          return { data: stats };
        } catch (calcError) {
          // Return default stats if calculation fails
          return {
            data: {
              totalEvents: 0,
              publishedEvents: 0,
              activeExcos: 0,
              totalExcos: 0,
              totalResources: 0,
              totalDocuments: 0,
              totalDevelopers: 0,
            },
          };
        }
      }
      throw error;
    }
  },

  // Get recent activities - return empty array if endpoint doesn't exist
  getActivities: async (limit: number = 10): Promise<{ data: Activity[] }> => {
    try {
      const resp: any = await apiRequest<any>("/v1/admin/activities", {
        params: { limit },
      });
      return resp;
    } catch (error: any) {
      // If endpoint doesn't exist, return empty array
      if (error.statusCode === 404) {
        return { data: [] };
      }
      throw error;
    }
  },

  // Get analytics (if available)
  getAnalytics: async (period: "week" | "month" | "year" = "month") => {
    try {
      const resp: any = await apiRequest<any>("/v1/admin/analytics", {
        params: { period },
      });
      return resp;
    } catch (error: any) {
      // Return empty data if endpoint doesn't exist
      if (error.statusCode === 404) {
        return { data: {} };
      }
      throw error;
    }
  },
};
