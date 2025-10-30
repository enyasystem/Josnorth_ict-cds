"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, Plus, Bell, Search, User, Settings } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isAdminRoute = pathname?.startsWith("/admin")

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/resources", label: "Resources" },
    { href: "/team", label: "Team" },
  ]

  const adminNavigation = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/resources", label: "Resources" },
    { href: "/admin/excos", label: "Excos" },
    { href: "/admin/developers", label: "Developers" },
    { href: "/admin/settings", label: "Settings" },
  ]

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      {isAdminRoute ? (
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => {
                try {
                  window.dispatchEvent(new CustomEvent("toggle-admin-sidebar"))
                } catch (e) {}
              }}
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/admin" className="flex items-center gap-3 mr-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-md flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
            </Link>

            <div className="truncate">
              <h1 className="text-lg font-semibold text-foreground truncate">
                {(() => {
                  const segments = pathname?.split("/").filter(Boolean) || []
                  if (segments.length <= 1) return "Admin Dashboard"
                  const map: Record<string, string> = {
                    events: "Events",
                    resources: "Resources",
                    excos: "Excos",
                    developers: "Developers",
                    settings: "Settings",
                  }
                  const last = segments[segments.length - 1]
                  return map[last] || last.charAt(0).toUpperCase() + last.slice(1)
                })()}
              </h1>
              <p className="text-sm text-muted-foreground truncate hidden md:block">Quick actions and overview for admin</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" className="px-3 py-2 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add
            </Button>
            <Button variant="outline" className="px-3 py-2 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md hover:bg-muted" aria-label="Notifications">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-md hover:bg-muted" aria-label="Settings">
              <Settings className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 p-1 rounded-md hover:bg-muted">
              <User className="w-5 h-5" />
              <span className="hidden md:inline text-sm">Admin</span>
            </button>

            {/* mobile menu toggle for admin */}
            <button
              className="md:hidden text-foreground hover:bg-secondary p-2 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      ) : (
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-foreground font-bold text-lg hidden sm:inline">NYSC Jos North</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-300 font-medium text-sm ${
                  isActiveLink(link.href)
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="md:hidden text-foreground hover:bg-secondary p-2 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border animate-in fade-in slide-in-from-top-2 duration-300 z-50">
          <div className="px-6 py-4 space-y-4">
            {(isAdminRoute ? adminNavigation : navigationLinks).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 transition-colors font-medium ${
                  isActiveLink(link.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  )
}
