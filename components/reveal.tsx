"use client"

import { useEffect, useRef, useState } from "react"

interface RevealProps {
  children: React.ReactNode
  index?: number
  className?: string
  rootMargin?: string
  threshold?: number
}

export function Reveal({ children, index = 0, className = "", rootMargin = "0px", threshold = 0.12 }: RevealProps) {
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

  const style = { animationDelay: `${index * 80}ms` }

  return (
    <div
      ref={ref}
      style={style as any}
      className={`${visible ? "reveal-visible" : "reveal-hidden"} ${visible ? className : ""}`}
    >
      {children}
    </div>
  )
}
