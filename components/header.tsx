"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sun, Menu } from "lucide-react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 w-full z-50 px-6 ${
        scrolled ? "h-14 bg-emerald-900/90 shadow-md" : "h-16 bg-emerald-900/70"
      } backdrop-blur-sm border-b border-emerald-800 transition-all duration-200`}
    >
      <nav aria-label="Main navigation" className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">NYSC Jos North</h1>
            <p className="text-emerald-200 text-sm">Biodata Platform</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-emerald-200 hover:text-white transition-colors px-2 py-1 rounded-md">
            Home
          </Link>
          <Link href="/events" className="text-emerald-200 hover:text-white transition-colors px-2 py-1 rounded-md">
            Events
          </Link>
          <Link href="/resources" className="text-emerald-200 hover:text-white transition-colors px-2 py-1 rounded-md">
            Resources
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-emerald-700">
              <Sun className="h-5 w-5" />
            </Button>
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-[35px] px-4 py-2 shadow-sm">
              <Link href="/community">Community</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-emerald-700"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </nav>
      {/* Mobile slide-over menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-16 right-0 w-full max-w-xs h-[calc(100vh-4rem)] bg-emerald-900/95 border-l border-emerald-800 shadow-lg transform transition-transform duration-200 z-50 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="p-4 flex flex-col gap-4">
          <Link href="/" className="text-emerald-200 hover:text-white px-2 py-1 rounded-md">Home</Link>
          <Link href="/events" className="text-emerald-200 hover:text-white px-2 py-1 rounded-md">Events</Link>
          <Link href="/resources" className="text-emerald-200 hover:text-white px-2 py-1 rounded-md">Resources</Link>
          <div className="flex items-center gap-2 mt-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-emerald-700">
              <Sun className="h-5 w-5" />
            </Button>
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-[35px] px-4 py-2 shadow-sm">
              <Link href="/community">Community</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
