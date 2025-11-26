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
    // Backend expects: { title, description, location, start, end }
    // Convert our form model (date + startTime/endTime) into ISO datetimes
    const { title, description, excerpt, date, startTime, endTime, location } =
      data;

    const toIso = (d?: string, t?: string) => {
      if (!d) return undefined;
      const time = t && t.length >= 4 ? t : "00:00";
      // Assume local date/time and send as UTC with 'Z' suffix
      return `${d}T${time.length === 5 ? time + ":00" : time}Z`;
    };

    const payload: any = {
      title,
      description: description || excerpt,
      location,
      start: toIso(date, startTime),
      end: toIso(date, endTime || startTime),
    };

    const resp: any = await apiRequest<any>("/v1/events/", {
      method: "POST",
      data: payload,
    });
    return { data: resp };
  },

  // Update event (admin only)
  update: async (id: string, data: Partial<CreateEventData>) => {
    const { title, description, excerpt, date, startTime, endTime, location } =
      data;

    const toIso = (d?: string, t?: string) => {
      if (!d) return undefined;
      const time = t && t.length >= 4 ? t : "00:00";
      return `${d}T${time.length === 5 ? time + ":00" : time}Z`;
    };

    const payload: any = {};
    if (title !== undefined) payload.title = title;
    if (description !== undefined || excerpt !== undefined) {
      payload.description = description || excerpt;
    }
    if (location !== undefined) payload.location = location;
    if (date !== undefined || startTime !== undefined) {
      const startIso = toIso(date, startTime);
      if (startIso) payload.start = startIso;
    }
    if (date !== undefined || endTime !== undefined) {
      const endIso = toIso(date, endTime || startTime);
      if (endIso) payload.end = endIso;
    }

    const resp: any = await apiRequest<any>(`/v1/events/${id}/`, {
      method: "PATCH",
      data: payload,
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
