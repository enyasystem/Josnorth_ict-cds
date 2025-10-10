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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-emerald-900/95 border-emerald-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {mode === "create" ? "Add Team Member" : "Edit Team Member"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-emerald-200">
              Full Name *
            </Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              className="bg-emerald-900/30 border-emerald-700/30 text-white"
              placeholder="e.g., John Doe"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-emerald-200">
                Role/Position *
              </Label>
              <Input
                id="role"
                {...register("role", { required: true })}
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
                placeholder="e.g., Frontend Developer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-emerald-200">
                Type *
              </Label>
              <Select
                defaultValue={watch("type") || defaultType}
                onValueChange={(value) =>
                  setValue("type", value as "developer" | "exco")
                }
              >
                <SelectTrigger className="bg-emerald-900/30 border-emerald-700/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-emerald-900 border-emerald-700 text-white">
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="exco">Exco</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-emerald-200">
              Bio *
            </Label>
            <Textarea
              id="bio"
              {...register("bio", { required: true })}
              className="bg-emerald-900/30 border-emerald-700/30 text-white min-h-[80px]"
              placeholder="Brief description about the member"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="img" className="text-emerald-200">
              Image URL *
            </Label>
            <Input
              id="img"
              {...register("img", { required: true })}
              className="bg-emerald-900/30 border-emerald-700/30 text-white"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-emerald-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-emerald-200">
                Phone
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
                placeholder="+234 XXX XXX XXXX"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-emerald-200">Social Links (Optional)</Label>
            <div className="grid grid-cols-1 gap-3">
              <Input
                {...register("social.github")}
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
                placeholder="GitHub URL"
              />
              <Input
                {...register("social.linkedin")}
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
                placeholder="LinkedIn URL"
              />
              <Input
                {...register("social.twitter")}
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
                placeholder="Twitter URL"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-emerald-700 text-emerald-200 hover:bg-emerald-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
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
