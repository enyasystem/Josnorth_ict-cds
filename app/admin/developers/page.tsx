"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Mail, Github, Linkedin } from "lucide-react";
import { useDevelopers, useDeleteTeamMember } from "@/lib/hooks/useTeam";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamMemberFormDialog } from "@/components/admin/team-member-form-dialog";

export default function ManageDevelopersPage() {
  const { data: response, isLoading } = useDevelopers();
  const deleteTeamMember = useDeleteTeamMember();

  const developers = response?.data || [];

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this developer?")) {
      await deleteTeamMember.mutateAsync(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Manage Developers
            </h1>
            <p className="text-green-700">Manage development team members</p>
          </div>
          <TeamMemberFormDialog
            trigger={
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Developer
              </Button>
            }
            mode="create"
            defaultType="developer"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-green-800/30 border-green-700/30">
            <CardContent className="p-6">
              <div className="text-green-700 text-sm">Total Developers</div>
              <div className="text-3xl font-bold text-white mt-2">
                {developers.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Developers List */}
          <Card className="bg-green-800/30 border-green-700/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Development Team</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="h-24 w-full bg-green-900/20"
                  />
                ))}
              </div>
            ) : developers.length > 0 ? (
              <div className="space-y-4">
                {developers.map((dev) => (
                  <div
                    key={dev.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-green-900/20 border border-green-700/20"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={dev.img}
                        alt={dev.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-white font-semibold">{dev.name}</h3>
                        <p className="text-green-700 text-sm">{dev.role}</p>
                        <div className="flex items-center gap-4 mt-1">
                          {dev.email && (
                            <span className="text-green-700 text-xs flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {dev.email}
                            </span>
                          )}
                          {dev.social?.github && (
                            <a
                              href={dev.social.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-700 text-xs flex items-center gap-1 hover:text-green-700"
                            >
                              <Github className="w-3 h-3" />
                              GitHub
                            </a>
                          )}
                          {dev.social?.linkedin && (
                            <a
                              href={dev.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-700 text-xs flex items-center gap-1 hover:text-green-700"
                            >
                              <Linkedin className="w-3 h-3" />
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TeamMemberFormDialog
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
                        member={dev}
                        mode="edit"
                        defaultType="developer"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-700 hover:text-white"
                        onClick={() => handleDelete(dev.id)}
                        disabled={deleteTeamMember.isPending}
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
                No developers found
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
