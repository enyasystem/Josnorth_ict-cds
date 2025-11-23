"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  Link as LinkIcon,
  Video,
  Wrench,
  ExternalLink,
} from "lucide-react";
import { useResources, useDeleteResource } from "@/lib/hooks/useResources";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ResourceFormDialog } from "@/components/admin/resource-form-dialog";

export default function ManageResourcesPage() {
  const { data: response, isLoading } = useResources();
  const deleteResource = useDeleteResource();

  const resources = response?.data || [];

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      await deleteResource.mutateAsync(id);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "document":
        return <FileText className="w-4 h-4" />;
      case "link":
        return <LinkIcon className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "tool":
        return <Wrench className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      document: "bg-blue-600",
      link: "bg-purple-600",
      video: "bg-red-600",
      tool: "bg-green-600",
    };
    return (
      <Badge className={colors[category] || "bg-gray-600"}>
        {getCategoryIcon(category)}
        <span className="ml-1 capitalize">{category}</span>
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Manage Resources
            </h1>
            <p className="text-green-600">
              Upload and manage learning resources
            </p>
          </div>
          <ResourceFormDialog
            trigger={
              <Button className="bg-green-600 hover:bg-green-500 text-white rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Resource
              </Button>
            }
            mode="create"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-green-50 border border-green-100 rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <div className="text-green-600 text-sm">Total Resources</div>
              <div className="text-3xl font-bold text-green-800 mt-2">
                {resources.length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-emerald-800/30 border-emerald-700/30">
            <CardContent className="p-6">
              <div className="text-emerald-200 text-sm">Documents</div>
              <div className="text-3xl font-bold text-white mt-2">
                {resources.filter((r) => r.category === "document").length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-emerald-800/30 border-emerald-700/30">
            <CardContent className="p-6">
              <div className="text-emerald-200 text-sm">Links</div>
              <div className="text-3xl font-bold text-white mt-2">
                {resources.filter((r) => r.category === "link").length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-emerald-800/30 border-emerald-700/30">
            <CardContent className="p-6">
              <div className="text-emerald-200 text-sm">Videos</div>
              <div className="text-3xl font-bold text-white mt-2">
                {resources.filter((r) => r.category === "video").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resources List */}
        <Card className="bg-green-50 border border-green-100 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-800">All Resources</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-24 w-full bg-green-50" />
                ))}
              </div>
            ) : resources.length > 0 ? (
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-start justify-between p-4 rounded-lg bg-green-50 border border-green-100"
                  >
                    <div className="flex gap-4 flex-1">
                      {resource.thumbnail ? (
                        <img
                          src={resource.thumbnail}
                          alt={resource.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-8 h-8 text-green-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-green-800 font-semibold">
                            {resource.title}
                          </h3>
                          {getCategoryBadge(resource.category)}
                        </div>
                        <p className="text-green-600 text-sm line-clamp-2 mb-2">
                          {resource.description}
                        </p>
                        {resource.tags && resource.tags.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {resource.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {(resource.url || resource.fileUrl) && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-600 text-blue-400 hover:bg-blue-700 hover:text-white"
                          asChild
                        >
                          <a
                            href={resource.url || resource.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Open
                          </a>
                        </Button>
                      )}
                      <ResourceFormDialog
                        trigger={
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-600 text-emerald-200 hover:bg-emerald-700 hover:text-white"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        }
                        resource={resource}
                        mode="edit"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-700 hover:text-white"
                        onClick={() => handleDelete(resource.id)}
                        disabled={deleteResource.isPending}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-emerald-300 text-center py-8">
                No resources found. Add your first resource!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
