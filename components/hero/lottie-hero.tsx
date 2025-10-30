"use client"

import { useEffect, useState } from "react"

type Props = {
  className?: string
  src?: string // path to lottie json (optional)
}

export default function LottieHero({ className, src = "/lottie/hero.json" }: Props) {
  const [LottieComp, setLottieComp] = useState<any>(null)
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let mounted = true
    ;(async () => {
      try {
        const mod = await import("lottie-react")
        if (!mounted) return
        setLottieComp(() => mod.default ?? mod)

        // try to fetch animation data from provided src; if missing, we'll fallback to SVG
        try {
          const res = await fetch(src)
          if (res.ok) {
            const data = await res.json()
            if (mounted) setAnimationData(data)
          }
        } catch (e) {
          // ignore, fallback will render
        }
      } catch (e) {
        // lottie not available; fallback will render
      }
    })()

    return () => {
      mounted = false
    }
  }, [src])

  if (LottieComp && animationData) {
    const Lottie = LottieComp
    return (
      <div className={className + " lottie-hero"} aria-hidden>
        <Lottie animationData={animationData} loop autoplay />
      </div>
    )
  }

  // fallback simple animated SVG (small, performant)
  return (
    <div className={className + " lottie-hero"} aria-hidden>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="32" fill="url(#g)">
          <animate
            attributeName="r"
            values="28;34;28"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <g fill="#fff" opacity="0.85">
          <rect x="48" y="48" width="24" height="6" rx="3">
            <animate attributeName="y" values="48;44;48" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="48" y="66" width="24" height="6" rx="3">
            <animate attributeName="y" values="66;70;66" dur="3s" repeatCount="indefinite" />
          </rect>
        </g>
      </svg>
    </div>
  )
}

