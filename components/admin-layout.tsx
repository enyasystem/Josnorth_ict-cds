"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  Settings,
  Calendar,
  FileText,
  Palette,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/admin", icon: BarChart3, label: "Dashboard" },
    { href: "/admin/excos", icon: Users, label: "Manage Excos" },
    { href: "/admin/developers", icon: Settings, label: "Manage Developers" },
    { href: "/admin/events", icon: Calendar, label: "Manage Events" },
    { href: "/admin/resources", icon: FileText, label: "Manage Resources" },
    { href: "/admin/settings", icon: Palette, label: "UI Settings" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900">
      {/* Admin Header */}
      <header className="px-4 sm:px-6 py-4 border-b border-emerald-700/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-emerald-200 hover:text-white hover:bg-emerald-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>

            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg">Admin Panel</h1>
              <p className="text-emerald-200 text-sm">NYSC Jos North</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-emerald-200 hover:text-white hover:bg-emerald-700 cursor-pointer hidden sm:flex"
            >
              <Link href="/" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                <span className="hidden md:inline">Back to site</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-emerald-200 hover:text-white hover:bg-emerald-700 cursor-pointer"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:static inset-y-0 left-0 z-50 w-72 sm:w-80 bg-emerald-800/95 lg:bg-emerald-800/30 border-r border-emerald-700/30 min-h-[calc(100vh-80px)] transform transition-transform duration-300 lg:transform-none",
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          )}
        >
          <nav className="p-4 sm:p-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
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
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full lg:w-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
