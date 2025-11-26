"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Mail, Phone, User } from "lucide-react";
import { useProfiles, useDeleteProfile } from "@/lib/hooks/useProfiles";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileFormDialog } from "@/components/admin/profile-form-dialog";

export default function ManageProfilesPage() {
  const { data: response, isLoading } = useProfiles({ limit: 100 });
  const deleteProfile = useDeleteProfile();

  const profiles = response?.data || [];

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      await deleteProfile.mutateAsync(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Manage Profiles
            </h1>
            <p className="text-green-600">
              Create and manage member profiles for the NYSC Jos North
              community.
            </p>
          </div>
          <ProfileFormDialog
            trigger={
              <Button className="bg-green-600 hover:bg-green-500 text-white rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Profile
              </Button>
            }
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-green-50 border border-green-100 rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <div className="text-green-600 text-sm">Total Profiles</div>
              <div className="text-3xl font-bold text-green-800 mt-2">
                {profiles.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profiles List */}
        <Card className="bg-green-50 border border-green-100 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-800">Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-24 w-full bg-green-50" />
                ))}
              </div>
            ) : profiles.length > 0 ? (
              <div className="space-y-4">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-green-50 border border-green-100"
                  >
                    <div className="flex items-center gap-4">
                      {profile.img ? (
                        <img
                          src={profile.img}
                          alt={profile.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-8 h-8 text-green-600" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-green-800 font-semibold">
                          {profile.name}
                        </h3>
                        <p className="text-green-600 text-sm">
                          {profile.role || "Member"}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          {profile.email && (
                            <span className="text-green-600 text-xs flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {profile.email}
                            </span>
                          )}
                          {profile.phone && (
                            <span className="text-green-600 text-xs flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {profile.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Future: add edit dialog once full profile data is wired in */}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-700 hover:text-white"
                        onClick={() => handleDelete(profile.id)}
                        disabled={deleteProfile.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-green-600 text-center py-8">
                No profiles found. Click &quot;Add Profile&quot; to create the
                first one.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
