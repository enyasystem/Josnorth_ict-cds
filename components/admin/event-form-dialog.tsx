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
import { useCreateEvent, useUpdateEvent } from "@/lib/hooks/useEvents";
import type { Event, CreateEventData } from "@/lib/types/api";

interface EventFormDialogProps {
  trigger: React.ReactNode;
  event?: Event;
  mode?: "create" | "edit";
}

export function EventFormDialog({
  trigger,
  event,
  mode = "create",
}: EventFormDialogProps) {
  const [open, setOpen] = useState(false);
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const { register, handleSubmit, setValue, watch } = useForm<CreateEventData>({
    defaultValues: event
      ? {
          title: event.title,
          description: event.description,
          excerpt: event.excerpt,
          date: event.date,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location,
          image: event.image,
          status: event.status as "draft" | "published",
        }
      : {
          status: "draft",
        },
  });

  const onSubmit = async (data: CreateEventData) => {
    try {
      if (mode === "edit" && event) {
        await updateEvent.mutateAsync({ id: event.id, data });
      } else {
        await createEvent.mutateAsync(data);
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
            {mode === "create" ? "Create New Event" : "Edit Event"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-emerald-200">
              Event Title *
            </Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              className="bg-emerald-900/30 border-emerald-700/30 text-white"
              placeholder="e.g., Community Outreach Program"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="text-emerald-200">
              Short Description *
            </Label>
            <Input
              id="excerpt"
              {...register("excerpt", { required: true })}
              className="bg-emerald-900/30 border-emerald-700/30 text-white"
              placeholder="Brief description for preview"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-emerald-200">
              Full Description *
            </Label>
            <Textarea
              id="description"
              {...register("description", { required: true })}
              className="bg-emerald-900/30 border-emerald-700/30 text-white min-h-[100px]"
              placeholder="Detailed description of the event"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-emerald-200">
                Event Date *
              </Label>
              <Input
                id="date"
                type="date"
                {...register("date", { required: true })}
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-emerald-200">
                Location
              </Label>
              <Input
                id="location"
                {...register("location")}
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
                placeholder="Event venue"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-emerald-200">
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                {...register("startTime")}
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-emerald-200">
                End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                {...register("endTime")}
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-emerald-200">
              Image URL *
            </Label>
            <Input
              id="image"
              {...register("image", { required: true })}
              className="bg-emerald-900/30 border-emerald-700/30 text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-emerald-200">
              Status
            </Label>
            <Select
              defaultValue={watch("status") || "draft"}
              onValueChange={(value) =>
                setValue("status", value as "draft" | "published")
              }
            >
              <SelectTrigger className="bg-emerald-900/30 border-emerald-700/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-emerald-900 border-emerald-700 text-white">
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
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
              disabled={createEvent.isPending || updateEvent.isPending}
            >
              {createEvent.isPending || updateEvent.isPending
                ? "Saving..."
                : mode === "create"
                ? "Create Event"
                : "Update Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
