"use client"

import { useEffect, useState } from "react"

export function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hide = () => {
      setTimeout(() => setVisible(false), 350)
    }

    if (document.readyState === "complete") {
      hide()
    } else {
      window.addEventListener("load", hide, { once: true })
      // Fallback: hide after 3s in case load doesn't fire
      const t = setTimeout(hide, 3000)
      return () => clearTimeout(t)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-emerald-950/95 backdrop-blur-sm loader-fade">
      <div className="flex flex-col items-center gap-6">
        <svg className="w-28 h-28" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="28" stroke="url(#g1)" strokeWidth="4" strokeLinecap="round" className="loader-ring" />
          <g className="loader-orbit">
            <rect x="58" y="18" width="4" height="8" rx="1" fill="#10b981" />
            <rect x="92" y="58" width="4" height="8" rx="1" fill="#059669" transform="rotate(90 92 58)" />
            <rect x="58" y="92" width="4" height="8" rx="1" fill="#34d399" />
            <rect x="18" y="58" width="4" height="8" rx="1" fill="#059669" transform="rotate(90 18 58)" />
          </g>
          <circle cx="60" cy="60" r="6" fill="#047857" className="loader-core" />
        </svg>
        <div className="text-emerald-200 text-sm">Loading — NYSC Jos North</div>
      </div>
    </div>
  )
}
