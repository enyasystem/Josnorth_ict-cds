import type React from "react"
import { Header } from "@/components/header"
import { Loader } from "@/components/loader"
import { Footer } from "@/components/footer"

interface PageLayoutProps {
  children: React.ReactNode
  showDecorations?: boolean
}

export function PageLayout({ children, showDecorations = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-950 relative overflow-hidden flex flex-col">
      {/* Background decorative elements */}
      {showDecorations && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="absolute top-32 right-20 w-1 h-1 bg-teal-300 rounded-full opacity-80"></div>
          <div className="absolute top-48 left-1/4 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-yellow-400 opacity-70"></div>
          <div className="absolute top-64 right-1/3 w-1.5 h-1.5 bg-emerald-300 rounded-full opacity-60"></div>
          <div className="absolute bottom-40 left-16 w-0 h-0 border-l-2 border-r-2 border-b-3 border-transparent border-b-teal-400 opacity-50"></div>
          <div className="absolute bottom-60 right-24 w-1 h-1 bg-yellow-300 rounded-full opacity-70"></div>
          <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-40"></div>
          <div className="absolute bottom-1/3 left-1/3 w-0 h-0 border-l-1.5 border-r-1.5 border-b-3 border-transparent border-b-emerald-400 opacity-60"></div>
        </div>
      )}

      {/* Skip link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-emerald-700 text-white px-3 py-2 rounded-md">
        Skip to main content
      </a>

  <Loader />
  <Header />
      <main id="main-content" className="relative z-10 flex-1 overflow-y-auto pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
