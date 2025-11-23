// lib/api/profiles.ts
import { apiRequest } from "./client"
import type { PaginatedResponse, TeamMember } from "@/lib/types/api"

export const profilesApi = {
  getAll: async (params?: { page?: number; limit?: number }) => {
    const resp: any = await apiRequest<any>("/v1/profiles", { params })
    // Map backend profile shape to frontend TeamMember shape
    const raw: any[] = resp?.results ?? []
    const results: TeamMember[] = raw.map((p: any) => ({
      id: String(p.id),
      name: `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim(),
      role: p.occupation ?? "",
      type: "developer",
      bio: p.bio ?? "",
      img: p.photo ?? p.image ?? "",
      email: p.email ?? undefined,
      createdAt: p.created_at ?? new Date().toISOString(),
    }))
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
