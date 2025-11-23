// lib/api/team.ts
import { apiRequest } from "./client";
import type {
  TeamMember,
  CreateTeamMemberData,
  PaginatedResponse,
} from "@/lib/types/api";

export const teamApi = {
  // Get all team members (supports optional filters via params)
  // Matches deployed API: /api/v1/teams
  getAll: (params?: { type?: "developer" | "exco"; page?: number; limit?: number }) =>
    apiRequest<PaginatedResponse<TeamMember>>("/v1/teams", {
      params,
    }),

  // Get developers only (filtered by query param)
  getDevelopers: () => apiRequest<{ data: TeamMember[] }>("/v1/teams", { params: { type: "developer" } }),

  // Get excos only (filtered by query param)
  getExcos: () => apiRequest<{ data: TeamMember[] }>("/v1/teams", { params: { type: "exco" } }),

  // Get single team member
  getById: (id: string) => apiRequest<{ data: TeamMember }>(`/v1/teams/${id}`),

  // Create team member (admin only)
  create: (data: CreateTeamMemberData) =>
    apiRequest<{ data: TeamMember }>("/v1/teams", {
      method: "POST",
      data,
    }),

  // Update team member (admin only)
  update: (id: string, data: Partial<CreateTeamMemberData>) =>
    apiRequest<{ data: TeamMember }>(`/v1/teams/${id}`, {
      method: "PATCH",
      data,
    }),

  // Delete team member (admin only)
  delete: (id: string) =>
    apiRequest<void>(`/v1/teams/${id}`, {
      method: "DELETE",
    }),
};
