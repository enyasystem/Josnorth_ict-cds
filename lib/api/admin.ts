// lib/api/admin.ts
import { apiRequest } from "./client";
import type { DashboardStats, Activity } from "@/lib/types/api";
import { eventsApi } from "./events";
import { resourcesApi } from "./resources";
import { profilesApi } from "./profiles";

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
          const [eventsResp, resourcesResp, profilesResp] =
            await Promise.allSettled([
              eventsApi.getAll({ limit: 1000 }),
              resourcesApi.getAll({ limit: 1000 }),
              profilesApi.getAll({ limit: 1000 }),
            ]);

          const events =
            eventsResp.status === "fulfilled"
              ? eventsResp.value?.data || []
              : [];
          const resources =
            resourcesResp.status === "fulfilled"
              ? resourcesResp.value?.data || []
              : [];
          const profiles =
            profilesResp.status === "fulfilled"
              ? profilesResp.value?.data || []
              : [];

          const stats: DashboardStats = {
            totalEvents: events.length,
            publishedEvents: events.filter((e: any) => e.status === "published")
              .length,
            totalProfiles: profiles.length,
            totalResources: resources.length,
            totalDocuments: resources.filter(
              (r: any) => r.category === "document"
            ).length,
          };

          return { data: stats };
        } catch (calcError) {
          // Return default stats if calculation fails
          return {
            data: {
              totalEvents: 0,
              publishedEvents: 0,
              totalProfiles: 0,
              totalResources: 0,
              totalDocuments: 0,
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
