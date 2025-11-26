// lib/api/events.ts
import { apiRequest } from "./client";
import type {
  Event,
  CreateEventData,
  PaginatedResponse,
} from "@/lib/types/api";

export const eventsApi = {
  // Get all events (with optional filters)
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: "draft" | "published" | "cancelled";
    sort?: string;
  }) => {
    // Django API requires trailing slash for list endpoint
    const resp: any = await apiRequest<any>("/v1/events/", { params });
    const results: Event[] = resp?.results ?? [];
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
    } as PaginatedResponse<Event>;
  },

  // Get single event
  getById: async (id: string) => {
    // Detail endpoint should also include trailing slash
    const resp: any = await apiRequest<any>(`/v1/events/${id}/`);
    return { data: resp };
  },

  // Create event (admin only)
  create: async (data: CreateEventData) => {
    // POST must hit the URL with trailing slash to avoid Django APPEND_SLASH redirect issue
    const resp: any = await apiRequest<any>("/v1/events/", {
      method: "POST",
      data,
    });
    return { data: resp };
  },

  // Update event (admin only)
  update: async (id: string, data: Partial<CreateEventData>) => {
    const resp: any = await apiRequest<any>(`/v1/events/${id}/`, {
      method: "PATCH",
      data,
    });
    return { data: resp };
  },

  // Delete event (admin only)
  delete: (id: string) =>
    apiRequest<void>(`/v1/events/${id}/`, {
      method: "DELETE",
    }),

  // Publish event
  publish: async (id: string) => {
    const resp: any = await apiRequest<any>(`/v1/events/${id}/publish/`, {
      method: "POST",
    });
    return { data: resp };
  },

  // Cancel event
  cancel: async (id: string) => {
    const resp: any = await apiRequest<any>(`/v1/events/${id}/cancel/`, {
      method: "POST",
    });
    return { data: resp };
  },
};
