import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Settings, Calendar, FileText, Palette, ExternalLink, LogOut } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900">
      {/* Admin Header */}
      <header className="px-6 py-4 border-b border-emerald-700/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Admin Panel</h1>
              <p className="text-emerald-200 text-sm">NYSC Jos North</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-emerald-200 hover:text-white hover:bg-emerald-700">
              <Link href="/" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Back to site
              </Link>
            </Button>
            <Button variant="ghost" className="text-emerald-200 hover:text-white hover:bg-emerald-700">
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 bg-emerald-800/30 border-r border-emerald-700/30 min-h-[calc(100vh-80px)]">
          <nav className="p-6 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-700/50 text-white">
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/excos"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-200 hover:bg-emerald-700/30 hover:text-white transition-colors"
            >
              <Users className="w-5 h-5" />
              Manage Excos
            </Link>
            <Link
              href="/admin/developers"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-200 hover:bg-emerald-700/30 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
              Manage Developers
            </Link>
            <Link
              href="/admin/events"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-200 hover:bg-emerald-700/30 hover:text-white transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Manage Events
            </Link>
            <Link
              href="/admin/resources"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-200 hover:bg-emerald-700/30 hover:text-white transition-colors"
            >
              <FileText className="w-5 h-5" />
              Manage Resources
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-200 hover:bg-emerald-700/30 hover:text-white transition-colors"
            >
              <Palette className="w-5 h-5" />
              UI Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
