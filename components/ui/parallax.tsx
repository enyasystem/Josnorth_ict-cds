"use client"

import React, { useEffect, useRef } from "react"

type ParallaxProps = {
  children: React.ReactNode
  speed?: number // positive => move down slower, negative => move up
  className?: string
  style?: React.CSSProperties
}

export default function Parallax({ children, speed = 0.2, className = "", style }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Respect prefers-reduced-motion
    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      el.style.transform = "none"
      return
    }

    let mounted = true

    const onFrame = () => {
      if (!mounted || !el) return
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      // distance from center (negative when above center)
      const distance = rect.top + rect.height / 2 - windowHeight / 2
      const translate = -(distance * speed)
      el.style.transform = `translate3d(0, ${translate}px, 0)`
      raf.current = requestAnimationFrame(onFrame)
    }

    raf.current = requestAnimationFrame(onFrame)

    const onResize = () => {
      // recalc on resize
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(onFrame)
    }

    window.addEventListener("resize", onResize)

    return () => {
      mounted = false
      if (raf.current) cancelAnimationFrame(raf.current)
      window.removeEventListener("resize", onResize)
    }
  }, [speed])

  return (
    <div ref={ref} className={`parallax ${className}`} style={{ willChange: "transform", transition: "transform 0.1s linear", ...style }}>
      {children}
    </div>
  )
}
