"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface TypewriterProps {
  words: string[]
  className?: string
}

export function Typewriter({ words, className = "" }: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const delayBeforeDelete = 2000

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), delayBeforeDelete)
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, currentWordIndex, words])

  return (
    <motion.span className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        className="ml-1"
      >
        |
      </motion.span>
    </motion.span>
  )
}
