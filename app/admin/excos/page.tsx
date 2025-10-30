"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Mail, Phone } from "lucide-react";
import { useExcos, useDeleteTeamMember } from "@/lib/hooks/useTeam";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamMemberFormDialog } from "@/components/admin/team-member-form-dialog";

export default function ManageExcosPage() {
  const { data: response, isLoading } = useExcos();
  const deleteTeamMember = useDeleteTeamMember();

  const excos = response?.data || [];

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this exco member?")) {
      await deleteTeamMember.mutateAsync(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Excos</h1>
            <p className="text-emerald-200">
              Manage executive committee members
            </p>
          </div>
          <TeamMemberFormDialog
            trigger={
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Exco
              </Button>
            }
            mode="create"
            defaultType="exco"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-emerald-800/30 border-emerald-700/30">
            <CardContent className="p-6">
              <div className="text-emerald-200 text-sm">Total Excos</div>
              <div className="text-3xl font-bold text-white mt-2">
                {excos.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Excos List */}
        <Card className="bg-emerald-800/30 border-emerald-700/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Executive Members</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="h-24 w-full bg-emerald-900/20"
                  />
                ))}
              </div>
            ) : excos.length > 0 ? (
              <div className="space-y-4">
                {excos.map((exco) => (
                  <div
                    key={exco.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-emerald-900/20 border border-emerald-700/20"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={exco.img}
                        alt={exco.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-white font-semibold">
                          {exco.name}
                        </h3>
                        <p className="text-emerald-200 text-sm">{exco.role}</p>
                        <div className="flex items-center gap-4 mt-1">
                          {exco.email && (
                            <span className="text-emerald-300 text-xs flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {exco.email}
                            </span>
                          )}
                          {exco.phone && (
                            <span className="text-emerald-300 text-xs flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {exco.phone}
                            </span>
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
                            className="border-emerald-600 text-emerald-200 hover:bg-emerald-700 hover:text-white"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        }
                        member={exco}
                        mode="edit"
                        defaultType="exco"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-700 hover:text-white"
                        onClick={() => handleDelete(exco.id)}
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
              <p className="text-emerald-300 text-center py-8">
                No exco members found
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
