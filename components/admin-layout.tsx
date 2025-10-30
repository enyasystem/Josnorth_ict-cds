"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Settings, Calendar, FileText, Palette, ExternalLink, LogOut, Menu, ChevronLeft } from "lucide-react"
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
  const pathname = usePathname()

  // sidebar open state - responsive behavior
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

  useEffect(() => {
    // default: keep sidebar open on desktop, closed on small screens
    if (typeof window !== "undefined") {
      setSidebarOpen(window.innerWidth >= 768)

      const toggleHandler = () => setSidebarOpen((v) => !v)
      window.addEventListener("toggle-admin-sidebar", toggleHandler as EventListener)

      return () => {
        window.removeEventListener("toggle-admin-sidebar", toggleHandler as EventListener)
      }
    }
    return
  }, [])

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin" || pathname === "/admin/"
    return pathname?.startsWith(href)
  }

  return (
    <PageLayout showDecorations={false}>
      <div className="min-h-[calc(100vh-120px)] flex">
        {/* Sidebar (now using landing-page color variables). It's responsive and can be toggled. */}
        <aside
          className={
            `p-6 border-r transition-transform duration-200 fixed md:static left-0 top-0 h-full ` +
            // On small screens: when closed, slide fully out (-translate-x-full). On md+ keep it visible but compact (md:translate-x-0 + md:w-20).
            `${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} ` +
            `${sidebarOpen ? "md:w-72" : "md:w-20"}`
          }
          // higher z so the sidebar sits above the overlay but below the header
          style={{
            zIndex: 50,
            backgroundColor: "var(--color-sidebar)",
            borderColor: "var(--color-sidebar-border)",
            color: "var(--color-sidebar-foreground)",
          }}
        >
          {/* collapse button for desktop */}
          <div className="flex items-start justify-end md:justify-end mb-4">
            <button
              className="hidden md:inline-flex items-center justify-center p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--color-sidebar-primary)" }}>
              <span style={{ color: "var(--color-sidebar-primary-foreground)", fontWeight: 700 }}>A</span>
            </div>
            <div>
              <h3 className={`font-semibold ${sidebarOpen ? "block" : "hidden"}`} style={{ color: "var(--color-sidebar-foreground)" }}>
                Admin Panel
              </h3>
              <p className={`text-sm ${sidebarOpen ? "block" : "hidden"}`} style={{ color: "var(--color-sidebar-accent-foreground, var(--color-sidebar-foreground))" }}>
                NYSC Jos North
              </p>
            </div>
          </div>

          {/* make nav grow so bottom actions stick to bottom */}
          <nav className="space-y-2 flex-1">
            {[
              { href: "/admin", label: "Dashboard", icon: BarChart3 },
              { href: "/admin/excos", label: "Manage Excos", icon: Users },
              { href: "/admin/developers", label: "Manage Developers", icon: Settings },
              { href: "/admin/events", label: "Manage Events", icon: Calendar },
              { href: "/admin/resources", label: "Manage Resources", icon: FileText },
              { href: "/admin/settings", label: "UI Settings", icon: Palette },
            ].map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 ${sidebarOpen ? 'px-4 py-3' : 'px-2 py-3 justify-center'} rounded-lg`}
                  style={{
                    backgroundColor: active ? "var(--color-sidebar-primary)" : "transparent",
                    color: active ? "var(--color-sidebar-primary-foreground)" : "var(--color-sidebar-foreground)",
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className={`${sidebarOpen ? 'inline' : 'hidden'}`}>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className={`mt-6 ${sidebarOpen ? '' : 'flex flex-col items-center'}`}>
            <Button asChild variant="ghost" className={`${sidebarOpen ? 'w-full' : 'p-2'}`} style={{ color: "var(--color-sidebar-foreground)" }}>
              <Link href="/" className={`${sidebarOpen ? 'flex items-center gap-2' : 'flex items-center justify-center'}`}>
                <ExternalLink className="w-4 h-4" />
                <span className={`${sidebarOpen ? 'inline' : 'sr-only'}`}>Back to site</span>
              </Link>
            </Button>

            <Button variant="ghost" className={`${sidebarOpen ? 'w-full mt-2' : 'mt-3 p-2'}`} style={{ color: "var(--color-sidebar-foreground)" }}>
              <span className="flex items-center justify-center">
                <LogOut className="w-4 h-4" />
                <span className={`${sidebarOpen ? 'ml-2 inline' : 'sr-only'}`}>Sign out</span>
              </span>
            </Button>
          </div>
        </aside>

        {/* Mobile overlay - appears when sidebar is open on small screens and closes the sidebar when clicked */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/40"
            style={{ zIndex: 40 }}
            onClick={() => setSidebarOpen(false)}
            aria-hidden
          />
        )}

        {/* Floating reopen button for small screens when sidebar is closed */}
        {!sidebarOpen && (
          <button
            className="md:hidden fixed top-4 left-4 p-2 rounded-md bg-white shadow-lg"
            style={{ zIndex: 60 }}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </PageLayout>
  )
}
