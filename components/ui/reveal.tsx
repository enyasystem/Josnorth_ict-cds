"use client"

import React, { useEffect, useRef, useState } from "react"

type RevealProps = {
  children: React.ReactNode
  className?: string
  threshold?: number
  once?: boolean
  variant?: "fade-up" | "fade" | "slide-left" | "zoom-in"
  rootMargin?: string
  style?: React.CSSProperties
  /** stagger between child reveals in ms (if children is a list) */
  stagger?: number
}

export default function Reveal({
  children,
  className = "",
  threshold = 0.12,
  once = false,
  variant = "fade-up",
  rootMargin = "0px",
  style,
  stagger = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      setInView(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) obs.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, once, rootMargin])

  return (
    <div ref={ref} className={`reveal ${inView ? "in-view" : ""} ${className}`} data-variant={variant} style={style}>
      {React.Children.toArray(children).map((child, i) => {
        if (!stagger) return child
        if (!React.isValidElement(child)) return child

        const delay = `${i * stagger}ms`
        const existingStyle = (child.props && child.props.style) || {}
        const existingClass = (child.props && child.props.className) || ""

        return React.cloneElement(child as React.ReactElement, {
          className: `${existingClass} reveal-child`,
          style: { transitionDelay: delay, ...existingStyle },
          key: child && (child as any).key ? (child as any).key : i,
        })
      })}
    </div>
  )
}
