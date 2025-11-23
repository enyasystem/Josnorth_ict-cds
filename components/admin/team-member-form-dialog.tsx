"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTeamMember, useUpdateTeamMember } from "@/lib/hooks/useTeam";
import type { TeamMember, CreateTeamMemberData } from "@/lib/types/api";

interface TeamMemberFormDialogProps {
  trigger: React.ReactNode;
  member?: TeamMember;
  mode?: "create" | "edit";
  defaultType?: "developer" | "exco";
}

export function TeamMemberFormDialog({
  trigger,
  member,
  mode = "create",
  defaultType = "developer",
}: TeamMemberFormDialogProps) {
  const [open, setOpen] = useState(false);
  const createMember = useCreateTeamMember();
  const updateMember = useUpdateTeamMember();
  const { register, handleSubmit, setValue, watch } =
    useForm<CreateTeamMemberData>({
      defaultValues: member
        ? {
            name: member.name,
            role: member.role,
            type: member.type,
            bio: member.bio,
            img: member.img,
            email: member.email,
            phone: member.phone,
            social: member.social,
          }
        : {
            type: defaultType,
          },
    });

  const onSubmit = async (data: CreateTeamMemberData) => {
    try {
      if (mode === "edit" && member) {
        await updateMember.mutateAsync({ id: member.id, data });
      } else {
        await createMember.mutateAsync(data);
      }
      setOpen(false);
    } catch (error) {
      // Error handled by mutation hooks
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Team Member" : "Edit Team Member"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              placeholder="e.g., John Doe"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role/Position *</Label>
              <Input
                id="role"
                {...register("role", { required: true })}
                placeholder="e.g., Frontend Developer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                defaultValue={watch("type") || defaultType}
                onValueChange={(value) =>
                  setValue("type", value as "developer" | "exco")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="exco">Exco</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio *</Label>
            <Textarea
              id="bio"
              {...register("bio", { required: true })}
              className="min-h-[80px]"
              placeholder="Brief description about the member"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="img">Image URL *</Label>
            <Input
              id="img"
              {...register("img", { required: true })}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="+234 XXX XXX XXXX"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Social Links (Optional)</Label>
            <div className="grid grid-cols-1 gap-3">
              <Input {...register("social.github")} placeholder="GitHub URL" />
              <Input
                {...register("social.linkedin")}
                placeholder="LinkedIn URL"
              />
              <Input
                {...register("social.twitter")}
                placeholder="Twitter URL"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={createMember.isPending || updateMember.isPending}
            >
              {createMember.isPending || updateMember.isPending
                ? "Saving..."
                : mode === "create"
                ? "Add Member"
                : "Update Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
