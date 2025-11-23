import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface PageLayoutProps {
  children: React.ReactNode
  showDecorations?: boolean
  showHeader?: boolean
}

export function PageLayout({ children, showDecorations = true, showHeader = true }: PageLayoutProps) {
  return (
    /* Updated to clean, modern background without decorative blobs */
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {showDecorations && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-transparent" />
        </div>
      )}

      {typeof window !== 'undefined' && (
        // allow pages to hide the default header when they render their own
        showHeader && <Header />
      )}
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  )
}
