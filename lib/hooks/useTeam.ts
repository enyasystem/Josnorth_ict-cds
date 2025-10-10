// lib/hooks/useTeam.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "@/lib/api/team";
import { toast } from "sonner";
import type { CreateTeamMemberData } from "@/lib/types/api";

export function useTeamMembers(type?: "developer" | "exco") {
  return useQuery({
    queryKey: ["team", type],
    queryFn: () => teamApi.getAll({ type }),
  });
}

export function useDevelopers() {
  return useQuery({
    queryKey: ["team", "developers"],
    queryFn: () => teamApi.getDevelopers(),
  });
}

export function useExcos() {
  return useQuery({
    queryKey: ["team", "excos"],
    queryFn: () => teamApi.getExcos(),
  });
}

export function useTeamMember(id: string) {
  return useQuery({
    queryKey: ["team", id],
    queryFn: () => teamApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTeamMemberData) => teamApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast.success("Team member added successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add team member");
    },
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateTeamMemberData>;
    }) => teamApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast.success("Team member updated!");
    },
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => teamApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast.success("Team member removed!");
    },
  });
}
