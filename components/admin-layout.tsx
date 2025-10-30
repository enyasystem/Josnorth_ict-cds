import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Settings, Calendar, FileText, Palette, ExternalLink, LogOut } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

interface AdminLayoutProps {
  children: React.ReactNode
}

/**
 * AdminLayout now reuses the main site's `PageLayout` so the header/footer
 * and overall look-and-feel match the public site. The admin-specific
 * sidebar remains inside the page layout's main area.
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <PageLayout showDecorations={false}>
      <div className="min-h-[calc(100vh-120px)] flex">
        {/* Sidebar (now using landing-page color variables) */}
        <aside
          className="w-72 p-6 border-r"
          style={{
            backgroundColor: "var(--color-sidebar)",
            borderColor: "var(--color-sidebar-border)",
            color: "var(--color-sidebar-foreground)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--color-sidebar-primary)" }}>
              <span style={{ color: "var(--color-sidebar-primary-foreground)", fontWeight: 700 }}>A</span>
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: "var(--color-sidebar-foreground)" }}>
                Admin Panel
              </h3>
              <p className="text-sm" style={{ color: "var(--color-sidebar-accent-foreground, var(--color-sidebar-foreground))" }}>
                NYSC Jos North
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{ backgroundColor: "var(--color-sidebar-primary)", color: "var(--color-sidebar-primary-foreground)" }}
            >
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/excos"
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{ color: "var(--color-sidebar-foreground)" }}
            >
              <Users className="w-5 h-5" />
              Manage Excos
            </Link>
            <Link
              href="/admin/developers"
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{ color: "var(--color-sidebar-foreground)" }}
            >
              <Settings className="w-5 h-5" />
              Manage Developers
            </Link>
            <Link
              href="/admin/events"
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{ color: "var(--color-sidebar-foreground)" }}
            >
              <Calendar className="w-5 h-5" />
              Manage Events
            </Link>
            <Link
              href="/admin/resources"
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{ color: "var(--color-sidebar-foreground)" }}
            >
              <FileText className="w-5 h-5" />
              Manage Resources
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{ color: "var(--color-sidebar-foreground)" }}
            >
              <Palette className="w-5 h-5" />
              UI Settings
            </Link>
          </nav>

          <div className="mt-6">
            <Button asChild variant="ghost" className="w-full" style={{ color: "var(--color-sidebar-foreground)" }}>
              <Link href="/" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Back to site
              </Link>
            </Button>
            <Button variant="ghost" className="w-full mt-2" style={{ color: "var(--color-sidebar-foreground)" }}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </PageLayout>
  )
}
