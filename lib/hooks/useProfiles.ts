// lib/hooks/useProfiles.ts
import { useQuery } from "@tanstack/react-query"
import { profilesApi } from "@/lib/api/profiles"

export function useProfiles(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["profiles", params],
    queryFn: () => profilesApi.getAll(params),
    staleTime: 5 * 60 * 1000,
  })
}
