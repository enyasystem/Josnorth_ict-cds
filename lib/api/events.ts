// lib/api/events.ts
import { apiRequest } from "./client";
import type {
  Event,
  CreateEventData,
  PaginatedResponse,
} from "@/lib/types/api";

export const eventsApi = {
  // Get all events (with optional filters)
  getAll: (params?: {
    page?: number;
    limit?: number;
    status?: "draft" | "published" | "cancelled";
    sort?: string;
  }) =>
    apiRequest<PaginatedResponse<Event>>("/events", {
      params,
    }),

  // Get single event
  getById: (id: string) => apiRequest<{ data: Event }>(`/events/${id}`),

  // Create event (admin only)
  create: (data: CreateEventData) =>
    apiRequest<{ data: Event }>("/events", {
      method: "POST",
      data,
    }),

  // Update event (admin only)
  update: (id: string, data: Partial<CreateEventData>) =>
    apiRequest<{ data: Event }>(`/events/${id}`, {
      method: "PATCH",
      data,
    }),

  // Delete event (admin only)
  delete: (id: string) =>
    apiRequest<void>(`/events/${id}`, {
      method: "DELETE",
    }),

  // Publish event
  publish: (id: string) =>
    apiRequest<{ data: Event }>(`/events/${id}/publish`, {
      method: "POST",
    }),

  // Cancel event
  cancel: (id: string) =>
    apiRequest<{ data: Event }>(`/events/${id}/cancel`, {
      method: "POST",
    }),
};
