"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  ChevronLeft,
} from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { useAuth } from "@/contexts/auth-context";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  // All hooks must be called before any conditional returns
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Protect admin routes - require valid token
  useEffect(() => {
    if (!isLoading) {
      const token = localStorage.getItem("auth_token");
      if (!token || !isAuthenticated) {
        router.push("/login");
      }
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // default: open on desktop, closed on mobile
      setSidebarOpen(window.innerWidth >= 768);

      const toggleHandler = () => setSidebarOpen((v) => !v);
      window.addEventListener(
        "toggle-admin-sidebar",
        toggleHandler as EventListener
      );

      return () =>
        window.removeEventListener(
          "toggle-admin-sidebar",
          toggleHandler as EventListener
        );
    }
  }, []);

  // Conditional returns AFTER all hooks are called
  if (isLoading) {
    return (
      <PageLayout showDecorations={false} showFooter={false}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-green-600">Loading...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { href: "/admin", icon: BarChart3, label: "Dashboard" },
    { href: "/admin/profiles", icon: Users, label: "Manage Profiles" },
    { href: "/admin/events", icon: Calendar, label: "Manage Events" },
    { href: "/admin/resources", icon: FileText, label: "Manage Resources" },
    { href: "/admin/settings", icon: Palette, label: "UI Settings" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin")
      return pathname === "/admin" || pathname === "/admin/";
    return pathname?.startsWith(href);
  };

  const asideBase =
    "p-6 border-r transition-transform duration-200 fixed md:static left-0 top-0 h-screen overflow-hidden";
  const asideTranslate = sidebarOpen
    ? "translate-x-0"
    : "-translate-x-full md:translate-x-0";
  const asideWidth = sidebarOpen ? "md:w-72" : "md:w-20";
  const asideClass = `${asideBase} ${asideTranslate} ${asideWidth}`;

  const navElements = navItems.map((item) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    const itemClass = sidebarOpen
      ? `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          active
            ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
            : "text-green-700 hover:bg-green-50 hover:text-green-800"
        }`
      : `flex items-center gap-3 px-2 py-3 justify-center rounded-lg transition-colors ${
          active
            ? "bg-gradient-to-br from-green-600 to-green-700 text-white"
            : "text-green-700 hover:bg-green-50"
        }`;
    const labelClass = sidebarOpen ? "inline" : "hidden";

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={itemClass}
        onClick={() => setMobileMenuOpen(false)}
      >
        <Icon className="w-5 h-5" />
        <span className={labelClass}>{item.label}</span>
      </Link>
    );
  });

  const backLinkClass = sidebarOpen ? "w-full" : "p-2";
  const backInnerClass = sidebarOpen
    ? "flex items-center gap-2"
    : "flex items-center justify-center";
  const backLabelClass = sidebarOpen ? "inline" : "sr-only";
  const signClass = sidebarOpen ? "w-full mt-2" : "mt-3 p-2";
  const signLabelClass = sidebarOpen ? "ml-2 inline" : "sr-only";

  return (
    <PageLayout showDecorations={false} showFooter={false}>
      <div className="min-h-[calc(100vh-120px)] flex">
        <aside
          className={`${asideClass} bg-white border-r border-green-100 flex flex-col overflow-y-hidden`}
          style={{ zIndex: 50, height: "100vh" }}
        >
          <div className="flex items-start justify-end md:justify-end mb-4">
            <button
              className="hidden md:inline-flex items-center justify-center p-2 rounded-md hover:bg-green-50 text-green-700 hover:text-green-800 transition-colors cursor-pointer"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-green-700 hover:text-green-800 hover:bg-green-50"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <h3
                className={`font-semibold text-green-800 ${
                  sidebarOpen ? "block" : "hidden"
                }`}
              >
                Admin Panel
              </h3>
              <p
                className={`text-sm text-green-600 ${
                  sidebarOpen ? "block" : "hidden"
                }`}
              >
                NYSC Jos North
              </p>
            </div>
          </div>

          <nav className="space-y-2 flex-1 mb-8 overflow-hidden">
            {navElements}
          </nav>

          <div
            className={`mt-auto pt-6 pb-6 border-t border-green-100 ${
              sidebarOpen ? "" : "flex flex-col items-center"
            }`}
          >
            <Button
              asChild
              variant="ghost"
              className={`${backLinkClass} text-green-700 hover:text-green-800 hover:bg-green-50`}
            >
              <Link href="/" className={`${backInnerClass} cursor-pointer`}>
                <ExternalLink className="w-4 h-4" />
                <span className={backLabelClass}>Back to site</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className={`${signClass} text-green-700 hover:text-green-800 hover:bg-green-50`}
              onClick={() => logout()}
            >
              <span className="flex items-center justify-center">
                <LogOut className="w-4 h-4" />
                <span className={signLabelClass}>Sign out</span>
              </span>
            </Button>
          </div>
        </aside>

        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 lg:hidden"
            style={{ zIndex: 40 }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden
          />
        )}

        {!sidebarOpen && (
          <button
            className="md:hidden fixed top-4 left-4 p-2 rounded-md bg-white border border-green-200 shadow-lg text-green-700 hover:bg-green-50 transition-colors cursor-pointer"
            style={{ zIndex: 60 }}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full lg:w-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </PageLayout>
  );
}
