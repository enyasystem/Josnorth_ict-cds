"use client"

import { useEffect, useRef } from "react"

export function AnimatedGlobe() {
  const globeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    // Add continuous rotation animation
    globe.style.animation = "rotateGlobe 20s linear infinite"

    // Add CSS keyframes for rotation
    const style = document.createElement("style")
    style.textContent = `
      @keyframes rotateGlobe {
        from {
          transform: rotateY(0deg) rotateX(-10deg);
        }
        to {
          transform: rotateY(360deg) rotateX(-10deg);
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0px) rotateY(0deg) rotateX(-10deg);
        }
        50% {
          transform: translateY(-10px) rotateY(180deg) rotateX(-10deg);
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl scale-110 animate-pulse" />

        {/* Main globe container with 3D effects */}
        <div
          ref={globeRef}
          className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          <img
            src="/realistic-earth-globe-from-space-showing-africa-an.jpg"
            alt="Earth globe showing Africa"
            className="w-full h-full object-cover rounded-full"
            style={{
              filter: "brightness(1.1) contrast(1.2) saturate(1.1)",
            }}
          />

          {/* Atmospheric glow overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/10 via-transparent to-emerald-400/20 pointer-events-none" />

          {/* Highlight effect */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-white/20 rounded-full blur-md" />
        </div>

        {/* Orbital rings for extra 3D effect */}
        <div
          className="absolute inset-0 rounded-full border border-emerald-300/30 scale-110 animate-spin"
          style={{ animationDuration: "30s" }}
        />
        <div
          className="absolute inset-0 rounded-full border border-emerald-300/20 scale-125 animate-spin"
          style={{ animationDuration: "45s", animationDirection: "reverse" }}
        />
      </div>
    </div>
  )
}
