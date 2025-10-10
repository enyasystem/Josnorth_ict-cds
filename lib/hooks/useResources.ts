// lib/hooks/useResources.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { resourcesApi } from "@/lib/api/resources";
import { toast } from "sonner";
import type { CreateResourceData } from "@/lib/types/api";

export function useResources(params?: {
  category?: "document" | "link" | "video" | "tool";
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["resources", params],
    queryFn: () => resourcesApi.getAll(params),
  });
}

export function useResource(id: string) {
  return useQuery({
    queryKey: ["resources", id],
    queryFn: () => resourcesApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateResourceData) => resourcesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      toast.success("Resource created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create resource");
    },
  });
}

export function useUpdateResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateResourceData>;
    }) => resourcesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      toast.success("Resource updated!");
    },
  });
}

export function useDeleteResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resourcesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      toast.success("Resource deleted!");
    },
  });
}
