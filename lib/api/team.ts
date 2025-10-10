// lib/api/team.ts
import { apiRequest } from "./client";
import type {
  TeamMember,
  CreateTeamMemberData,
  PaginatedResponse,
} from "@/lib/types/api";

export const teamApi = {
  // Get all team members
  getAll: (params?: {
    type?: "developer" | "exco";
    page?: number;
    limit?: number;
  }) =>
    apiRequest<PaginatedResponse<TeamMember>>("/team", {
      params,
    }),

  // Get developers only
  getDevelopers: () => apiRequest<{ data: TeamMember[] }>("/team/developers"),

  // Get excos only
  getExcos: () => apiRequest<{ data: TeamMember[] }>("/team/excos"),

  // Get single team member
  getById: (id: string) => apiRequest<{ data: TeamMember }>(`/team/${id}`),

  // Create team member (admin only)
  create: (data: CreateTeamMemberData) =>
    apiRequest<{ data: TeamMember }>("/team", {
      method: "POST",
      data,
    }),

  // Update team member (admin only)
  update: (id: string, data: Partial<CreateTeamMemberData>) =>
    apiRequest<{ data: TeamMember }>(`/team/${id}`, {
      method: "PATCH",
      data,
    }),

  // Delete team member (admin only)
  delete: (id: string) =>
    apiRequest<void>(`/team/${id}`, {
      method: "DELETE",
    }),
};
