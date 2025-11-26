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

  getAll: async (params?: {
    type?: "developer" | "exco";
    page?: number;
    limit?: number;
  }) => {
    // DRF returns paginated responses with { count, next, previous, results }
    const resp: any = await apiRequest<any>("/v1/teams/", { params });
    // Some backends return a list of "teams/committees" where each item contains a
    // `members` array. Normalize both shapes to a flat array of TeamMember.
    const extractMembers = (r: any) => {
      const resultsArr = r?.results ?? [];
      if (
        Array.isArray(resultsArr) &&
        resultsArr.length > 0 &&
        resultsArr[0]?.members !== undefined
      ) {
        return resultsArr.flatMap((team: any) => team.members ?? []);
      }
      return resultsArr;
    };

    const results: TeamMember[] = extractMembers(resp);
    const count: number = resp?.count ?? results.length;
    const page = params?.page ?? 1;
    const limit = params?.limit ?? (results.length || count || 1);
    const totalPages = Math.max(1, Math.ceil(count / (limit || 1)));
    return {
      success: true,
      data: results,
      pagination: {
        page,
        limit,
        total: count,
        totalPages,
      },
    } as PaginatedResponse<TeamMember>;
  },

  // Get developers only (filtered by query param)
  getDevelopers: async () => {
    const resp: any = await apiRequest<any>("/v1/teams/", {
      params: { type: "developer" },
    });
    const extractMembers = (r: any) => {
      const resultsArr = r?.results ?? [];
      if (
        Array.isArray(resultsArr) &&
        resultsArr.length > 0 &&
        resultsArr[0]?.members !== undefined
      ) {
        return resultsArr.flatMap((team: any) => team.members ?? []);
      }
      return resultsArr;
    };
    const members: TeamMember[] = extractMembers(resp);
    // Also return the raw teams array (if present) so callers can render team containers
    const teams = resp?.results ?? [];
    return { data: members ?? [], teams };
  },

  // Get excos only (filtered by query param)
  getExcos: async () => {
    const resp: any = await apiRequest<any>("/v1/teams/", {
      params: { type: "exco" },
    });
    const extractMembers = (r: any) => {
      const resultsArr = r?.results ?? [];
      if (
        Array.isArray(resultsArr) &&
        resultsArr.length > 0 &&
        resultsArr[0]?.members !== undefined
      ) {
        return resultsArr.flatMap((team: any) => team.members ?? []);
      }
      return resultsArr;
    };
    const members: TeamMember[] = extractMembers(resp);
    const teams = resp?.results ?? [];
    return { data: members ?? [], teams };
  },

  // Get single team member
  getById: async (id: string) => {
    const resp: any = await apiRequest<any>(`/v1/teams/${id}/`);
    return { data: resp };
  },

  // Create team member (admin only)
  create: async (data: CreateTeamMemberData) => {
    const resp: any = await apiRequest<any>("/v1/teams/", {
      method: "POST",
      data,
    });
    return { data: resp };
  },

  // Update team member (admin only)
  update: async (id: string, data: Partial<CreateTeamMemberData>) => {
    const resp: any = await apiRequest<any>(`/v1/teams/${id}/`, {
      method: "PATCH",
      data,
    });
    return { data: resp };
  },

  // Delete team member (admin only)
  delete: (id: string) =>
    apiRequest<void>(`/v1/teams/${id}/`, {
      method: "DELETE",
    }),
};
