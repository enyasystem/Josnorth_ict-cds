// lib/hooks/useAdmin.ts
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => adminApi.getStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useRecentActivities(limit: number = 10) {
  return useQuery({
    queryKey: ["admin", "activities", limit],
    queryFn: () => adminApi.getActivities(limit),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useAnalytics(period: "week" | "month" | "year" = "month") {
  return useQuery({
    queryKey: ["admin", "analytics", period],
    queryFn: () => adminApi.getAnalytics(period),
  });
}
