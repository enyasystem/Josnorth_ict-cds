"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
  loop?: boolean
  delay?: number
}

export function TypewriterText({ text, speed = 50, className = "", loop = false, delay = 1200 }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)
  const [minWidth, setMinWidth] = useState<number | undefined>(undefined)
  const hiddenRef = useRef<HTMLSpanElement | null>(null)
  const visibleRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    // Measure the full text width using the hidden span and clamp it to the visible parent's width
    const el = hiddenRef.current
    const vis = visibleRef.current
    if (el) {
      const rect = el.getBoundingClientRect()
      let measured = rect.width ? Math.ceil(rect.width) : undefined

      // Try to get the available width from the visible element's parent (fallback to window)
      let available = undefined as number | undefined
      const parent = vis?.parentElement
      if (parent) {
        const pRect = parent.getBoundingClientRect()
        available = pRect.width
      } else if (typeof window !== "undefined") {
        available = window.innerWidth
      }

      if (measured && available) {
        // leave a small pad so controls (like menu button) have space
        const pad = Math.max(40, Math.round(available * 0.05))
        // If the measured width is smaller than available space minus pad, we can safely reserve it.
        if (measured <= Math.max(0, Math.floor(available - pad))) {
          setMinWidth(measured)
        } else {
          // otherwise, allow wrapping by clearing minWidth
          setMinWidth(undefined)
        }
      } else {
        setMinWidth(measured)
      }
    }
  }, [text, className])

  useEffect(() => {
    // Reset when the text prop changes
    setDisplayText("")
    setCurrentIndex(0)
    setIsDeleting(false)
  }, [text])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setPrefersReduced(mq.matches)
    handler()
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else mq.addListener(handler)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else mq.removeListener(handler)
    }
  }, [])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (prefersReduced) {
      setDisplayText(text)
      return
    }

    if (!isDeleting && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
    } else if (!isDeleting && currentIndex === text.length) {
      if (loop) {
        // Pause at full text, then start deleting
        timeout = setTimeout(() => setIsDeleting(true), delay)
      }
    } else if (isDeleting && currentIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
        setCurrentIndex((prev) => prev - 1)
      }, Math.max(30, speed / 2))
    } else if (isDeleting && currentIndex === 0) {
      // restart typing
      setIsDeleting(false)
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, isDeleting, text, speed, loop, delay, prefersReduced])

  return (
    <>
      <span
        ref={visibleRef}
        className={className}
        aria-live="polite"
        style={
          minWidth
            ? { minWidth: `${minWidth}px`, display: "inline-block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
            : { display: "inline-block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
        }
      >
        {displayText}
      </span>
      <span ref={hiddenRef} aria-hidden style={{ position: "absolute", left: -9999, top: -9999, visibility: "hidden", whiteSpace: "nowrap" }}>
        {text}
      </span>
    </>
  )
}
