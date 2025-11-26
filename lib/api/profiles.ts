// lib/api/profiles.ts
import { apiRequest } from "./client";
import type {
  PaginatedResponse,
  TeamMember,
  Profile,
  CreateProfileData,
} from "@/lib/types/api";

// Map raw backend profile object to a simplified TeamMember for UI lists/cards
function mapProfileToTeamMember(p: any): TeamMember {
  return {
    id: String(p.id),
    name: `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim(),
    role: p.occupation ?? "",
    bio: p.bio ?? "",
    img: p.photo ?? p.image ?? "",
    email: p.email ?? undefined,
    phone: p.phone ?? undefined,
    createdAt: p.created_at ?? new Date().toISOString(),
  };
}

export const profilesApi = {
  // List profiles with pagination
  getAll: async (params?: { page?: number; limit?: number }) => {
    const resp: any = await apiRequest<any>("/v1/profiles/", { params });
    const raw: any[] = resp?.results ?? [];
    const results: TeamMember[] = raw.map(mapProfileToTeamMember);
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

  // Fetch a single profile (raw profile shape)
  getById: async (id: string): Promise<Profile> => {
    const resp: any = await apiRequest<any>(`/v1/profiles/${id}/`);
    return {
      id: String(resp.id),
      first_name: resp.first_name,
      last_name: resp.last_name,
      date_of_birth: resp.date_of_birth,
      occupation: resp.occupation,
      phone: resp.phone,
      email: resp.email,
      ward: resp.ward,
      lga: resp.lga,
      bio: resp.bio,
      skills: resp.skills ?? [],
      education: resp.education ?? [],
      experience: resp.experience ?? [],
      createdAt: resp.created_at ?? new Date().toISOString(),
      updatedAt: resp.updated_at,
    };
  },

  // Create profile
  create: async (data: CreateProfileData): Promise<Profile> => {
    const resp: any = await apiRequest<any>("/v1/profiles/", {
      method: "POST",
      data,
    });
    return {
      id: String(resp.id),
      first_name: resp.first_name,
      last_name: resp.last_name,
      date_of_birth: resp.date_of_birth,
      occupation: resp.occupation,
      phone: resp.phone,
      email: resp.email,
      ward: resp.ward,
      lga: resp.lga,
      bio: resp.bio,
      skills: resp.skills ?? [],
      education: resp.education ?? [],
      experience: resp.experience ?? [],
      createdAt: resp.created_at ?? new Date().toISOString(),
      updatedAt: resp.updated_at,
    };
  },

  // Update profile (partial)
  update: async (
    id: string,
    data: Partial<CreateProfileData>
  ): Promise<Profile> => {
    const resp: any = await apiRequest<any>(`/v1/profiles/${id}/`, {
      method: "PATCH",
      data,
    });
    return {
      id: String(resp.id),
      first_name: resp.first_name,
      last_name: resp.last_name,
      date_of_birth: resp.date_of_birth,
      occupation: resp.occupation,
      phone: resp.phone,
      email: resp.email,
      ward: resp.ward,
      lga: resp.lga,
      bio: resp.bio,
      skills: resp.skills ?? [],
      education: resp.education ?? [],
      experience: resp.experience ?? [],
      createdAt: resp.created_at ?? new Date().toISOString(),
      updatedAt: resp.updated_at,
    };
  },

  // Delete profile
  delete: (id: string) =>
    apiRequest<void>(`/v1/profiles/${id}/`, {
      method: "DELETE",
    }),
};
