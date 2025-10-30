"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  useEvents,
  useDeleteEvent,
  usePublishEvent,
} from "@/lib/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { EventFormDialog } from "@/components/admin/event-form-dialog";

export default function ManageEventsPage() {
  const { data: response, isLoading } = useEvents();
  const deleteEvent = useDeleteEvent();
  const publishEvent = usePublishEvent();

  const events = response?.data || [];

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await deleteEvent.mutateAsync(id);
    }
  };

  const handlePublish = async (id: string) => {
    await publishEvent.mutateAsync(id);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-600">Published</Badge>;
      case "draft":
        return <Badge className="bg-yellow-600">Draft</Badge>;
      case "cancelled":
        return <Badge className="bg-red-600">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Manage Events
            </h1>
            <p className="text-green-700">Create and manage events</p>
          </div>
              <EventFormDialog
            trigger={
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            }
            mode="create"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-green-800/30 border-green-700/30">
            <CardContent className="p-6">
              <div className="text-green-700 text-sm">Total Events</div>
              <div className="text-3xl font-bold text-white mt-2">
                {events.length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-800/30 border-green-700/30">
            <CardContent className="p-6">
              <div className="text-green-700 text-sm">Published</div>
              <div className="text-3xl font-bold text-white mt-2">
                {events.filter((e) => e.status === "published").length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-800/30 border-green-700/30">
            <CardContent className="p-6">
              <div className="text-green-700 text-sm">Drafts</div>
              <div className="text-3xl font-bold text-white mt-2">
                {events.filter((e) => e.status === "draft").length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-800/30 border-green-700/30">
            <CardContent className="p-6">
              <div className="text-green-700 text-sm">Cancelled</div>
              <div className="text-3xl font-bold text-white mt-2">
                {events.filter((e) => e.status === "cancelled").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
          <Card className="bg-green-800/30 border-green-700/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">All Events</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="h-32 w-full bg-green-900/20"
                  />
                ))}
              </div>
            ) : events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start justify-between p-4 rounded-lg bg-green-900/20 border border-green-700/20"
                  >
                    <div className="flex gap-4 flex-1">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-semibold">
                            {event.title}
                          </h3>
                            {getStatusBadge(event.status)}
                        </div>
                          <p className="text-green-700 text-sm line-clamp-2 mb-2">
                          {event.description}
                        </p>
                          <div className="flex items-center gap-4 text-green-700 text-xs">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {event.status !== "published" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-600 text-green-800 hover:bg-green-700 hover:text-white"
                          onClick={() => handlePublish(event.id)}
                          disabled={publishEvent.isPending}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Publish
                        </Button>
                      )}
                      <EventFormDialog
                        trigger={
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-600 text-green-800 hover:bg-green-700 hover:text-white"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        }
                        event={event}
                        mode="edit"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-700 hover:text-white"
                        onClick={() => handleDelete(event.id)}
                        disabled={deleteEvent.isPending}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                          <p className="text-green-700 text-center py-8">
                No events found. Create your first event!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
