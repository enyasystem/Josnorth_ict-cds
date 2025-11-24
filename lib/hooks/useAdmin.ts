// lib/hooks/useAdmin.ts
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => adminApi.getStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1, // Only retry once
    retryOnMount: false, // Don't retry on mount if it failed
  });
}

export function useRecentActivities(limit: number = 10) {
  return useQuery({
    queryKey: ["admin", "activities", limit],
    queryFn: () => adminApi.getActivities(limit),
    staleTime: 30 * 1000, // 30 seconds
    retry: 1, // Only retry once
    retryOnMount: false, // Don't retry on mount if it failed
    refetchInterval: false, // Disable auto-refetch since endpoint doesn't exist
  });
}

export function useAnalytics(period: "week" | "month" | "year" = "month") {
  return useQuery({
    queryKey: ["admin", "analytics", period],
    queryFn: () => adminApi.getAnalytics(period),
  });
}
