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
import { useCreateResource, useUpdateResource } from "@/lib/hooks/useResources";
import type { Resource, CreateResourceData } from "@/lib/types/api";

interface ResourceFormDialogProps {
  trigger: React.ReactNode;
  resource?: Resource;
  mode?: "create" | "edit";
}

export function ResourceFormDialog({
  trigger,
  resource,
  mode = "create",
}: ResourceFormDialogProps) {
  const [open, setOpen] = useState(false);
  const createResource = useCreateResource();
  const updateResource = useUpdateResource();
  const { register, handleSubmit, setValue, watch } =
    useForm<CreateResourceData>({
      defaultValues: resource
        ? {
            title: resource.title,
            description: resource.description,
            category: resource.category,
            url: resource.url,
            fileUrl: resource.fileUrl,
            thumbnail: resource.thumbnail,
            tags: resource.tags,
          }
        : {
            category: "document",
          },
    });

  const [tags, setTags] = useState<string[]>(resource?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue("tags", newTags);
  };

  const onSubmit = async (data: CreateResourceData) => {
    try {
      if (mode === "edit" && resource) {
        await updateResource.mutateAsync({ id: resource.id, data });
      } else {
        await createResource.mutateAsync(data);
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
            {mode === "create" ? "Add Resource" : "Edit Resource"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-emerald-200">
              Resource Title *
            </Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              className="bg-emerald-900/30 border-emerald-700/30 text-white"
              placeholder="e.g., Introduction to Web Development"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-emerald-200">
              Description *
            </Label>
            <Textarea
              id="description"
              {...register("description", { required: true })}
              className="bg-emerald-900/30 border-emerald-700/30 text-white min-h-[80px]"
              placeholder="Brief description of the resource"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-emerald-200">
              Category *
            </Label>
            <Select
              defaultValue={watch("category") || "document"}
              onValueChange={(value) =>
                setValue(
                  "category",
                  value as "document" | "link" | "video" | "tool"
                )
              }
            >
              <SelectTrigger className="bg-emerald-900/30 border-emerald-700/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-emerald-900 border-emerald-700 text-white">
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="link">Link</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="tool">Tool</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="text-emerald-200">
              URL or File URL *
            </Label>
            <Input
              id="url"
              {...register("url")}
              className="bg-emerald-900/30 border-emerald-700/30 text-white"
              placeholder="https://example.com/resource"
            />
            <p className="text-xs text-emerald-300">
              Or use File URL for uploaded files
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileUrl" className="text-emerald-200">
              File URL (Optional)
            </Label>
            <Input
              id="fileUrl"
              {...register("fileUrl")}
              className="bg-emerald-900/30 border-emerald-700/30 text-white"
              placeholder="https://example.com/file.pdf"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail" className="text-emerald-200">
              Thumbnail URL (Optional)
            </Label>
            <Input
              id="thumbnail"
              {...register("thumbnail")}
              className="bg-emerald-900/30 border-emerald-700/30 text-white"
              placeholder="https://example.com/thumbnail.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-emerald-200">Tags (Optional)</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                className="bg-emerald-900/30 border-emerald-700/30 text-white"
                placeholder="Add a tag and press Enter"
              />
              <Button
                type="button"
                onClick={addTag}
                className="bg-emerald-700 hover:bg-emerald-600"
              >
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-emerald-900/40 text-emerald-300 px-2 py-1 rounded flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-emerald-200 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
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
              disabled={createResource.isPending || updateResource.isPending}
            >
              {createResource.isPending || updateResource.isPending
                ? "Saving..."
                : mode === "create"
                ? "Add Resource"
                : "Update Resource"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
