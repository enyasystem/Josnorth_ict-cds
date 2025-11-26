"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Plus, Bell, Search, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const addRef = useRef<HTMLDivElement | null>(null);
  const isAdminRoute = pathname?.startsWith("/admin");

  // Auth context is always available since AppProvider wraps all pages
  const { user, logout } = useAuth();
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!addRef.current) return;
      if (e.target && !addRef.current.contains(e.target as Node)) {
        setAddOpen(false);
        setSearchOpen(false);
      }
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/resources", label: "Resources" },
    { href: "/team", label: "Team" },
  ];

  const adminNavigation = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/resources", label: "Resources" },
    { href: "/admin/profiles", label: "Profiles" },
    { href: "/admin/settings", label: "Settings" },
  ];

  const addOptions = [
    { href: "/admin/events/new", label: "Create New Event" },
    { href: "/admin/resources/new", label: "Upload Resource" },
    { href: "/admin/profiles/new", label: "Add New Profile" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      {isAdminRoute ? (
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
              onClick={() => {
                try {
                  window.dispatchEvent(new CustomEvent("toggle-admin-sidebar"));
                } catch (e) {}
              }}
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              href="/admin"
              className="flex items-center gap-3 mr-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-md flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
            </Link>

            <div className="truncate">
              <h1 className="text-lg font-semibold text-foreground truncate">
                {(() => {
                  const segments = pathname?.split("/").filter(Boolean) || [];
                  if (segments.length <= 1) return "Admin Dashboard";
                  const map: Record<string, string> = {
                    events: "Events",
                    resources: "Resources",
                    profiles: "Profiles",
                    settings: "Settings",
                  };
                  const last = segments[segments.length - 1];
                  return (
                    map[last] || last.charAt(0).toUpperCase() + last.slice(1)
                  );
                })()}
              </h1>
              <p className="text-sm text-muted-foreground truncate hidden md:block">
                Quick actions and overview for admin
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
            <div className="relative" ref={addRef}>
              <Button
                variant="ghost"
                className="px-3 py-2 flex items-center gap-2"
                onClick={() => {
                  setAddOpen((v) => !v);
                  setSearchOpen(false);
                }}
                aria-expanded={addOpen}
                aria-haspopup="menu"
              >
                <Plus className="w-4 h-4" />
                Add
              </Button>

              {addOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-border rounded-md shadow-lg z-50">
                  {addOptions.map((opt) => (
                    <button
                      key={opt.href}
                      className="w-full text-left px-3 py-2 hover:bg-muted text-sm cursor-pointer"
                      onClick={() => {
                        setAddOpen(false);
                        router.push(opt.href);
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <Button
                variant="outline"
                className="px-3 py-2 flex items-center gap-2"
                onClick={() => {
                  setSearchOpen((v) => !v);
                  setAddOpen(false);
                }}
                aria-expanded={searchOpen}
              >
                <Search className="w-4 h-4" />
                Search
              </Button>
              {searchOpen && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSearchOpen(false);
                    router.push(
                      `/admin?search=${encodeURIComponent(searchQuery)}`
                    );
                  }}
                >
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="absolute right-0 mt-2 w-96 px-3 py-2 border rounded-md bg-white z-50"
                    placeholder="Search admin..."
                  />
                </form>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="relative">
              <button
                className="p-2 rounded-md hover:bg-muted cursor-pointer"
                aria-label="Notifications"
                onClick={() => {
                  setNotificationsOpen((v) => !v);
                }}
              >
                <Bell className="w-5 h-5" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-border rounded-md shadow-lg z-50 p-3">
                  <p className="text-sm text-muted-foreground">
                    No notifications
                  </p>
                </div>
              )}
            </div>

            <button
              className="p-2 rounded-md hover:bg-muted cursor-pointer"
              aria-label="Settings"
              onClick={() => router.push("/admin/settings")}
            >
              <Settings className="w-5 h-5" />
            </button>

            <button
              className="flex items-center gap-2 p-1 rounded-md hover:bg-muted cursor-pointer"
              onClick={() => logout()}
            >
              <User className="w-5 h-5" />
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">
                  {user?.name || user?.username || "Admin"}
                </span>
                {user?.email && (
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                )}
              </div>
            </button>

            {/* right-side mobile toggler removed on admin routes */}
          </div>
        </div>
      ) : (
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-foreground font-bold text-lg hidden sm:inline">
                NYSC Jos North
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-300 font-medium text-sm cursor-pointer ${
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
              className="md:hidden text-foreground hover:bg-secondary p-2 rounded-lg transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
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
                className={`block py-2 transition-colors font-medium cursor-pointer ${
                  isActiveLink(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
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
  );
}
