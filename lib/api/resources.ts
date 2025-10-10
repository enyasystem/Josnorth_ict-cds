// lib/api/resources.ts
import { apiRequest } from "./client";
import type {
  Resource,
  CreateResourceData,
  PaginatedResponse,
} from "@/lib/types/api";

export const resourcesApi = {
  // Get all resources
  getAll: (params?: {
    category?: "document" | "link" | "video" | "tool";
    page?: number;
    limit?: number;
  }) =>
    apiRequest<PaginatedResponse<Resource>>("/resources", {
      params,
    }),

  // Get single resource
  getById: (id: string) => apiRequest<{ data: Resource }>(`/resources/${id}`),

  // Create resource (admin only)
  create: (data: CreateResourceData) =>
    apiRequest<{ data: Resource }>("/resources", {
      method: "POST",
      data,
    }),

  // Update resource (admin only)
  update: (id: string, data: Partial<CreateResourceData>) =>
    apiRequest<{ data: Resource }>(`/resources/${id}`, {
      method: "PATCH",
      data,
    }),

  // Delete resource (admin only)
  delete: (id: string) =>
    apiRequest<void>(`/resources/${id}`, {
      method: "DELETE",
    }),
};
