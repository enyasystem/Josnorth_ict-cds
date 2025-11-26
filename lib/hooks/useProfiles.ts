// lib/hooks/useProfiles.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profilesApi } from "@/lib/api/profiles";
import type { CreateProfileData } from "@/lib/types/api";
import { toast } from "sonner";

export function useProfiles(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["profiles", params],
    queryFn: () => profilesApi.getAll(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProfile(id: string | null) {
  return useQuery({
    queryKey: ["profiles", id],
    queryFn: () => (id ? profilesApi.getById(id) : Promise.resolve(null)),
    enabled: !!id,
  });
}

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProfileData) => profilesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      toast.success("Profile created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create profile");
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateProfileData>;
    }) => profilesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
}

export function useDeleteProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => profilesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      toast.success("Profile deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete profile");
    },
  });
}
