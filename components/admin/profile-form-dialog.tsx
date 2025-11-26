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
import { useCreateProfile } from "@/lib/hooks/useProfiles";
import type { CreateProfileData } from "@/lib/types/api";

interface ProfileFormDialogProps {
  trigger: React.ReactNode;
}

export function ProfileFormDialog({ trigger }: ProfileFormDialogProps) {
  const [open, setOpen] = useState(false);
  const createProfile = useCreateProfile();

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<CreateProfileData>();

  const onSubmit = async (data: CreateProfileData) => {
    try {
      await createProfile.mutateAsync(data);
      setOpen(false);
      reset();
    } catch (error) {
      // handled by hook toast
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                {...register("first_name", { required: true })}
                placeholder="Grace"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                {...register("last_name", { required: true })}
                placeholder="Danladi"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                {...register("occupation")}
                placeholder="Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                {...register("date_of_birth")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...register("bio")}
              className="min-h-[80px]"
              placeholder="Short bio about this person"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="grace@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="+2348012345678"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                {...register("ward")}
                placeholder="Ward (e.g., Angwan Rukuba)"
              />
              <Input {...register("lga")} placeholder="LGA (e.g., Jos North)" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Input
              id="skills"
              placeholder="Python, Django, AI/ML"
              onChange={(e) =>
                setValue(
                  "skills",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Education - School</Label>
              <Input
                placeholder="UNIJOS"
                onChange={(e) => {
                  const current = watch("education") || [];
                  const first = current[0] || { school: "", degree: "" };
                  setValue("education", [
                    { ...first, school: e.target.value },
                    ...current.slice(1),
                  ]);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Education - Degree</Label>
              <Input
                placeholder="BSc Computer Science"
                onChange={(e) => {
                  const current = watch("education") || [];
                  const first = current[0] || { school: "", degree: "" };
                  setValue("education", [
                    { ...first, degree: e.target.value },
                    ...current.slice(1),
                  ]);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Experience - Role</Label>
              <Input
                placeholder="Backend Dev"
                onChange={(e) => {
                  const current = watch("experience") || [];
                  const first = current[0] || { role: "", company: "" };
                  setValue("experience", [
                    { ...first, role: e.target.value },
                    ...current.slice(1),
                  ]);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Experience - Company</Label>
              <Input
                placeholder="TechHub"
                onChange={(e) => {
                  const current = watch("experience") || [];
                  const first = current[0] || { role: "", company: "" };
                  setValue("experience", [
                    { ...first, company: e.target.value },
                    ...current.slice(1),
                  ]);
                }}
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
              disabled={createProfile.isPending}
            >
              {createProfile.isPending ? "Saving..." : "Add Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
