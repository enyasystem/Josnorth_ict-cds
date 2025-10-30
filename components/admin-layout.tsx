"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Settings, Calendar, FileText, Palette, ExternalLink, LogOut, Menu, ChevronLeft } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  // two pieces of state: sidebar open (desktop/compact) and mobile menu open
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // default: open on desktop, closed on mobile
      setSidebarOpen(window.innerWidth >= 768)

      const toggleHandler = () => setSidebarOpen((v) => !v)
      window.addEventListener("toggle-admin-sidebar", toggleHandler as EventListener)

      return () => window.removeEventListener("toggle-admin-sidebar", toggleHandler as EventListener)
    }
    return
  }, [])

  const navItems = [
    { href: "/admin", icon: BarChart3, label: "Dashboard" },
    { href: "/admin/excos", icon: Users, label: "Manage Excos" },
    { href: "/admin/developers", icon: Settings, label: "Manage Developers" },
    { href: "/admin/events", icon: Calendar, label: "Manage Events" },
    { href: "/admin/resources", icon: FileText, label: "Manage Resources" },
    { href: "/admin/settings", icon: Palette, label: "UI Settings" },
  ]

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin" || pathname === "/admin/"
    return pathname?.startsWith(href)
  }

  return (
    <PageLayout showDecorations={false}>
      <div className="min-h-[calc(100vh-120px)] flex">
        {/* aside computed to avoid inline template reference issues during SSR */}
        {(() => {
          const base = "p-6 border-r transition-transform duration-200 fixed md:static left-0 top-0 h-full"
          const translate = sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          const width = sidebarOpen ? "md:w-72" : "md:w-20"
          const asideClass = `${base} ${translate} ${width}`

          return (
            <aside className={asideClass} style={{ zIndex: 50, backgroundColor: "var(--color-sidebar)", borderColor: "var(--color-sidebar-border)", color: "var(--color-sidebar-foreground)" }}>
              <div className="flex items-start justify-end md:justify-end mb-4">
                <button
                  className="hidden md:inline-flex items-center justify-center p-2 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setSidebarOpen((v) => !v)}
                  aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                  {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
                <Button variant="ghost" size="icon" className="lg:hidden text-foreground hover:text-foreground" onClick={() => setMobileMenuOpen((v) => !v)}>
                  {mobileMenuOpen ? <XIcon /> : <Menu className="w-5 h-5" />}
                </Button>
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

              <nav className="space-y-2 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  const itemClass = sidebarOpen ? 'flex items-center gap-3 px-4 py-3 rounded-lg' : 'flex items-center gap-3 px-2 py-3 justify-center rounded-lg'
                  const labelClass = sidebarOpen ? 'inline' : 'hidden'
                  const itemStyle = {
                    backgroundColor: active ? "var(--color-sidebar-primary)" : "transparent",
                    color: active ? "var(--color-sidebar-primary-foreground)" : "var(--color-sidebar-foreground)",
                  }

                  return (
                    <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={itemClass} style={itemStyle} onClick={() => setMobileMenuOpen(false)}>
                      <Icon className="w-5 h-5" />
                      <span className={labelClass}>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>

              {(() => {
                const bottomWrapperClass = sidebarOpen ? 'mt-6' : 'mt-6 flex flex-col items-center'
                const backLinkClass = sidebarOpen ? 'w-full' : 'p-2'
                const backInnerClass = sidebarOpen ? 'flex items-center gap-2' : 'flex items-center justify-center'
                const backLabelClass = sidebarOpen ? 'inline' : 'sr-only'
                const signClass = sidebarOpen ? 'w-full mt-2' : 'mt-3 p-2'
                const signLabelClass = sidebarOpen ? 'ml-2 inline' : 'sr-only'

                return (
                  <div className={bottomWrapperClass}>
                    <Button asChild variant="ghost" className={backLinkClass} style={{ color: "var(--color-sidebar-foreground)" }}>
                      <Link href="/" className={backInnerClass}>
                        <ExternalLink className="w-4 h-4" />
                        <span className={backLabelClass}>Back to site</span>
                      </Link>
                    </Button>

                    <Button variant="ghost" className={signClass} style={{ color: "var(--color-sidebar-foreground)" }}>
                      <span className="flex items-center justify-center">
                        <LogOut className="w-4 h-4" />
                        <span className={signLabelClass}>Sign out</span>
                      </span>
                    </Button>
                  </div>
                )
              })()}
            </aside>
          )
        })()}

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Floating reopen button for small screens when sidebar is closed */}
        {!sidebarOpen && (
          <button className="md:hidden fixed top-4 left-4 p-2 rounded-md bg-white shadow-lg" style={{ zIndex: 60 }} onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
            <Menu className="w-5 h-5" />
          </button>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full lg:w-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </PageLayout>
  )
}

function XIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer",
                    isActive(item.href)
                      ? "bg-emerald-700/50 text-white"
                      : "text-emerald-200 hover:bg-emerald-700/30 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
=======
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
              // compute classes here to avoid referencing sidebarOpen inside JSX attrs
              const itemClass = sidebarOpen ? 'flex items-center gap-3 px-4 py-3 rounded-lg' : 'flex items-center gap-3 px-2 py-3 justify-center rounded-lg'
              const labelClass = sidebarOpen ? 'inline' : 'hidden'
              const itemStyle = {
                backgroundColor: active ? "var(--color-sidebar-primary)" : "transparent",
                color: active ? "var(--color-sidebar-primary-foreground)" : "var(--color-sidebar-foreground)",
              }

              return (
                <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={itemClass} style={itemStyle}>
                  <Icon className="w-5 h-5" />
                  <span className={labelClass}>{item.label}</span>
>>>>>>> f51b1e2 (refactor(ui): move sidebar, nav item and bottom-action class logic out of JSX in AdminLayout)
                </Link>
              );
            })}
          </nav>
<<<<<<< HEAD
=======

          {(() => {
            const bottomWrapperClass = sidebarOpen ? 'mt-6' : 'mt-6 flex flex-col items-center'
            const backLinkClass = sidebarOpen ? 'w-full' : 'p-2'
            const backInnerClass = sidebarOpen ? 'flex items-center gap-2' : 'flex items-center justify-center'
            const backLabelClass = sidebarOpen ? 'inline' : 'sr-only'
            const signClass = sidebarOpen ? 'w-full mt-2' : 'mt-3 p-2'
            const signLabelClass = sidebarOpen ? 'ml-2 inline' : 'sr-only'

            return (
              <div className={bottomWrapperClass}>
                <Button asChild variant="ghost" className={backLinkClass} style={{ color: "var(--color-sidebar-foreground)" }}>
                  <Link href="/" className={backInnerClass}>
                    <ExternalLink className="w-4 h-4" />
                    <span className={backLabelClass}>Back to site</span>
                  </Link>
                </Button>

                <Button variant="ghost" className={signClass} style={{ color: "var(--color-sidebar-foreground)" }}>
                  <span className="flex items-center justify-center">
                    <LogOut className="w-4 h-4" />
                    <span className={signLabelClass}>Sign out</span>
                  </span>
                </Button>
              </div>
            )
          })()}
>>>>>>> f51b1e2 (refactor(ui): move sidebar, nav item and bottom-action class logic out of JSX in AdminLayout)
        </aside>
          )
        })()}

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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full lg:w-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
