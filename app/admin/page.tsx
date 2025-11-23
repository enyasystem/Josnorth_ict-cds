"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  FileText,
  TrendingUp,
  Plus,
  Settings,
  List,
} from "lucide-react";
import { useAdminStats, useRecentActivities } from "@/lib/hooks/useAdmin";
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const router = useRouter()
  const { data: statsResponse, isLoading: statsLoading } = useAdminStats();
  const { data: activitiesResponse, isLoading: activitiesLoading } =
    useRecentActivities(5);

  const stats = statsResponse?.data;
  const recentActivity = activitiesResponse?.data || [];

  const statsCards = [
    {
      title: "Total Events",
      value: stats?.totalEvents || "0",
      subtitle: `${stats?.publishedEvents || 0} published`,
      icon: Calendar,
      trend: "up",
    },
    {
      title: "Active Excos",
      value: stats?.activeExcos || "0",
      subtitle: `${stats?.totalExcos || 0} total members`,
      icon: Users,
      trend: "up",
    },
    {
      title: "Resources",
      value: stats?.totalResources || "0",
      subtitle: `${stats?.totalDocuments || 0} documents`,
      icon: FileText,
      trend: "up",
    },
    {
      title: "Dev Team",
      value: stats?.totalDevelopers || "0",
      subtitle: "total developers",
      icon: TrendingUp,
      trend: "up",
    },
  ];

  const quickActions = [
    { label: "Create New Event", icon: Plus },
    { label: "Upload Resource", icon: Plus },
    { label: "Add New Exco", icon: Plus },
  ];

  const platformManagement = [
    { label: "Customize UI", icon: Settings },
    { label: "Manage Team", icon: Users },
    { label: "Manage Resources", icon: List },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-green-600">
            Real-time overview of NYSC Jos North portal activities
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-32 rounded-lg bg-green-50"
                />
              ))
            : statsCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={index}
                    className="bg-green-50 border border-green-100 rounded-2xl shadow-sm"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="flex items-center text-green-500 text-xs sm:text-sm">
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-500" />
                          {stat.trend}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl sm:text-3xl font-bold text-green-800">
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-green-700">
                          {stat.title}
                        </div>
                        <div className="text-xs text-green-600">
                          {stat.subtitle}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
        </div>

        {/* Recent Activity */}
        <Card className="bg-green-50 border border-green-100 rounded-2xl shadow-sm">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-green-800 flex items-center gap-2 text-base sm:text-lg">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
            {activitiesLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="h-16 w-full bg-green-50"
                  />
                ))}
              </div>
            ) : recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 py-3 border-b border-green-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-green-800 font-medium text-sm sm:text-base truncate">
                        {activity.action}
                      </p>
                      <p className="text-green-600 text-xs sm:text-sm truncate">
                        {activity.details}
                      </p>
                    </div>
                  </div>
                  <span className="text-green-600 text-xs sm:text-sm sm:ml-4 flex-shrink-0">
                    {activity.time}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-green-600 text-center py-4 text-sm">
                No recent activity
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions and Platform Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Quick Actions */}
          <Card className="bg-emerald-800/30 border-emerald-700/30 backdrop-blur-sm">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-green-800 text-base sm:text-lg">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 px-4 sm:px-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                // map labels to routes
                const routeMap: Record<string, string> = {
                  "Create New Event": "/admin/events/new",
                  "Upload Resource": "/admin/resources/new",
                  "Add New Exco": "/admin/excos/new",
                }
                const href = routeMap[action.label] ?? "/admin"
                return (
                  <Button
                    key={index}
                    onClick={() => router.push(href)}
                    className="w-full justify-start bg-green-600 hover:bg-green-500 text-white text-sm sm:text-base h-auto py-2.5 sm:py-3 rounded-lg"
                  >
                    <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{action.label}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Platform Management */}
          <Card className="bg-emerald-800/30 border-emerald-700/30 backdrop-blur-sm">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-green-800 text-base sm:text-lg">
                Platform Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 px-4 sm:px-6">
              {platformManagement.map((item, index) => {
                const Icon = item.icon;
                const mapRoutes: Record<string, string> = {
                  "Customize UI": "/admin/settings",
                  "Manage Team": "/admin/excos",
                  "Manage Resources": "/admin/resources",
                }
                const href = mapRoutes[item.label] ?? "/admin"
                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => router.push(href)}
                    className="w-full justify-start border border-green-200 text-green-700 hover:bg-green-600 hover:text-white bg-transparent text-sm sm:text-base h-auto py-2.5 sm:py-3 rounded-lg"
                  >
                    <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

       
      </div>
    </AdminLayout>
  );
}
