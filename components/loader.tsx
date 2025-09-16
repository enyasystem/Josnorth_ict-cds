"use client"

import { useEffect, useState } from "react"

export function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hide = () => setTimeout(() => setVisible(false), 400)

    if (document.readyState === "complete") {
      hide()
    } else {
      window.addEventListener("load", hide, { once: true })
      const t = setTimeout(hide, 3000)
      return () => clearTimeout(t)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-emerald-950/90 to-black/70 backdrop-blur-sm loader-fade">
      <div className="flex flex-col items-center gap-4">
        <svg className="w-28 h-28" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <g>
            <circle cx="60" cy="60" r="34" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
            <circle cx="60" cy="60" r="28" stroke="url(#g2)" strokeWidth="4" strokeLinecap="round" className="loader-ring-smooth" strokeDasharray="120" strokeDashoffset="0" />
            <circle cx="60" cy="60" r="8" fill="#10b981" className="loader-core-smooth" />
          </g>
        </svg>
  <div className="text-emerald-200 text-sm tracking-wide loader-text-shimmer">Loading — NYSC Jos North</div>
      </div>
    </div>
  )
}
