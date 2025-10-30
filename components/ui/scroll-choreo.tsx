"use client"

import { useEffect } from "react"

export default function ScrollChoreographer() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let ctx: any = null
    let registered = false

    ;(async () => {
      try {
        const gsapModule = await import("gsap")
        const ScrollTriggerModule = await import("gsap/ScrollTrigger")

        const gsap = (gsapModule as any).gsap ?? (gsapModule as any).default ?? gsapModule
        const ScrollTrigger = (ScrollTriggerModule as any).default ?? ScrollTriggerModule

        if (!gsap || !ScrollTrigger) return

        gsap.registerPlugin(ScrollTrigger)
        registered = true

        ctx = gsap.context(() => {
          const hero = document.querySelector("#home") as HTMLElement | null
          if (!hero) return

          // hero container subtle vertical movement
          gsap.to(hero, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })

          // lottie element, if present, moves slightly opposite for depth
          const lottie = hero.querySelector(".lottie-hero") as HTMLElement | null
          if (lottie) {
            gsap.to(lottie, {
              yPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            })
          }

          // particles (canvas) element
          const particles = hero.querySelector(".animated-particles-canvas") as HTMLElement | null
          if (particles) {
            gsap.to(particles, {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            })
          }
        }, document.body)
      } catch (e) {
        // silent
      }
    })()

    return () => {
      try {
        if (ctx && typeof ctx.revert === "function") ctx.revert()
        if (registered) {
          try {
            const all = (window as any).gsap?.context ? [] : []
            const ST = (window as any).ScrollTrigger
            if (ST && typeof ST.getAll === "function") {
              ST.getAll().forEach((t: any) => t.kill && t.kill())
            }
          } catch (e) {
            // ignore
          }
        }
      } catch (e) {
        // ignore
      }
    }
  }, [])

  return null
}
