"use client"

import { useState, useEffect } from "react"

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

  useEffect(() => {
    // Reset when the text prop changes
    setDisplayText("")
    setCurrentIndex(0)
    setIsDeleting(false)
  }, [text])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

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
  }, [currentIndex, isDeleting, text, speed, loop, delay])

  return <span className={className}>{displayText}</span>
}
