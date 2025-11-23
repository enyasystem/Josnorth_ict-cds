// lib/api/resources.ts
import { apiRequest } from "./client";
import type {
  Resource,
  CreateResourceData,
  PaginatedResponse,
} from "@/lib/types/api";

export const resourcesApi = {
  // Get all resources
  getAll: async (params?: {
    category?: "document" | "link" | "video" | "tool";
    page?: number;
    limit?: number;
  }) => {
    const resp: any = await apiRequest<any>("/v1/resources", { params });
    const results: Resource[] = resp?.results ?? [];
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
    } as PaginatedResponse<Resource>;
  },

  // Get single resource
  getById: async (id: string) => {
    const resp: any = await apiRequest<any>(`/v1/resources/${id}`);
    return { data: resp };
  },

  // Create resource (admin only)
  create: async (data: CreateResourceData) => {
    const resp: any = await apiRequest<any>("/v1/resources", {
      method: "POST",
      data,
    });
    return { data: resp };
  },

  // Update resource (admin only)
  update: async (id: string, data: Partial<CreateResourceData>) => {
    const resp: any = await apiRequest<any>(`/v1/resources/${id}`, {
      method: "PATCH",
      data,
    });
    return { data: resp };
  },

  // Delete resource (admin only)
  delete: (id: string) =>
    apiRequest<void>(`/v1/resources/${id}`, {
      method: "DELETE",
    }),
};
