// lib/api/profiles.ts
import { apiRequest } from "./client"
import type { PaginatedResponse, TeamMember } from "@/lib/types/api"

export const profilesApi = {
  getAll: async (params?: { page?: number; limit?: number }) => {
    const resp: any = await apiRequest<any>("/v1/profiles", { params })
    const results: TeamMember[] = resp?.results ?? []
    const count: number = resp?.count ?? results.length
    const page = params?.page ?? 1
    const limit = params?.limit ?? (results.length || count || 1)
    const totalPages = Math.max(1, Math.ceil(count / (limit || 1)))
    return {
      success: true,
      data: results,
      pagination: {
        page,
        limit,
        total: count,
        totalPages,
      },
    } as PaginatedResponse<TeamMember>
  },
}
