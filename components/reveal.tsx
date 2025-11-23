"use client"

import { useEffect, useRef, useState } from "react"

interface RevealProps {
  children: React.ReactNode
  index?: number
  className?: string
  rootMargin?: string
  threshold?: number
  // allow callers to pass variant/style without breaking existing usages
  variant?: string
  style?: React.CSSProperties
  stagger?: number
}

export function Reveal({ children, index = 0, className = "", rootMargin = "0px", threshold = 0.12, variant, style: styleProp, stagger = 80 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(el)
          }
        })
      },
      { root: null, rootMargin, threshold }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  const animStyle = { animationDelay: `${index * (stagger ?? 80)}ms` }
  const combinedStyle = { ...(styleProp as any), ...animStyle }

  return (
    <div
      ref={ref}
      style={combinedStyle as any}
      data-variant={variant}
      className={`reveal ${visible ? "in-view" : ""} ${className}`}
    >
      {children}
    </div>
  )
}
