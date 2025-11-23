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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Event" : "Edit Event"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              placeholder="e.g., Community Outreach Program"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Short Description *</Label>
            <Input
              id="excerpt"
              {...register("excerpt", { required: true })}
              placeholder="Brief description for preview"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description *</Label>
            <Textarea
              id="description"
              {...register("description", { required: true })}
              className="min-h-[100px]"
              placeholder="Detailed description of the event"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Event Date *</Label>
              <Input
                id="date"
                type="date"
                {...register("date", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="Event venue"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" type="time" {...register("startTime")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" type="time" {...register("endTime")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL *</Label>
            <Input
              id="image"
              {...register("image", { required: true })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue={watch("status") || "draft"}
              onValueChange={(value) =>
                setValue("status", value as "draft" | "published")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white"
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
