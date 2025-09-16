import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, FileText, TrendingUp, Plus, Settings, List } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Events",
      value: "3",
      subtitle: "+3 published",
      icon: Calendar,
      trend: "up",
    },
    {
      title: "Active Excos",
      value: "3",
      subtitle: "3 total members",
      icon: Users,
      trend: "up",
    },
    {
      title: "Resources",
      value: "3",
      subtitle: "1 documents",
      icon: FileText,
      trend: "up",
    },
    {
      title: "Dev Team",
      value: "2",
      subtitle: "2 total developers",
      icon: TrendingUp,
      trend: "up",
    },
  ]

  const recentActivity = [
    {
      action: "New event created",
      details: "Community Outreach",
      time: "2 hours ago",
    },
    {
      action: "Exco profile updated",
      details: "Fatima Musa",
      time: "1 day ago",
    },
    {
      action: "Developer added",
      details: "Sarah Johnson",
      time: "2 days ago",
    },
  ]

  const quickActions = [
    { label: "Create New Event", icon: Plus },
    { label: "Upload Resource", icon: Plus },
    { label: "Add New Exco", icon: Plus },
  ]

  const platformManagement = [
    { label: "Customize UI", icon: Settings },
    { label: "Manage Team", icon: Users },
    { label: "Manage Resources", icon: List },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-emerald-200">Real-time overview of NYSC Jos North portal activities</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="bg-emerald-800/30 border-emerald-700/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center text-emerald-300 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {stat.trend}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-emerald-200">{stat.title}</div>
                    <div className="text-xs text-emerald-300">{stat.subtitle}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity */}
        <Card className="bg-emerald-800/30 border-emerald-700/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-emerald-700/20 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-emerald-200 text-sm">{activity.details}</p>
                  </div>
                </div>
                <span className="text-emerald-300 text-sm">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions and Platform Management */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card className="bg-emerald-800/30 border-emerald-700/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Button key={index} className="w-full justify-start bg-emerald-700 hover:bg-emerald-600 text-white">
                    <Icon className="w-4 h-4 mr-2" />
                    {action.label}
                  </Button>
                )
              })}
            </CardContent>
          </Card>

          {/* Platform Management */}
          <Card className="bg-emerald-800/30 border-emerald-700/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Platform Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {platformManagement.map((item, index) => {
                const Icon = item.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start border-emerald-600 text-emerald-200 hover:bg-emerald-700 hover:text-white bg-transparent"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-8 border-t border-emerald-700/30">
          <p className="text-emerald-300 text-sm">© 2025 NYSC Jos North — Admin</p>
          <p className="text-emerald-300 text-sm">Admin tools and logs</p>
        </div>
      </div>
    </AdminLayout>
  )
}
