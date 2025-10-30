"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  type: "node" | "circuit" | "icon"
}

export function AnimatedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const hoverRef = useRef(false)
  const opacityRef = useRef(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(20, Math.floor((canvas.width * canvas.height) / 25000))

      for (let i = 0; i < particleCount; i++) {
        // remove the 'icon' type (previously rendered as a rectangular tech icon
        // which could be misread as a trophy). Keep only node and circuit shapes.
        const types: ("node" | "circuit")[] = ["node", "circuit"]
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.2 + 0.08,
          type: types[Math.floor(Math.random() * types.length)],
        })
      }

      particlesRef.current = particles
    }

    const drawTechIcon = (x: number, y: number, size: number, opacity: number, type: string) => {
      ctx.save()
      ctx.globalAlpha = opacity

      if (type === "node") {
        // Draw tech node (circle with smaller circles around it)
        ctx.fillStyle = "rgba(16, 185, 129, 0.6)"
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = "rgba(16, 185, 129, 0.4)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(x, y, size * 1.5, 0, Math.PI * 2)
        ctx.stroke()
      } else if (type === "circuit") {
        // Draw circuit pattern
        ctx.strokeStyle = "rgba(16, 185, 129, 0.5)"
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x - size, y)
        ctx.lineTo(x + size, y)
        ctx.moveTo(x, y - size)
        ctx.lineTo(x, y + size)
        ctx.stroke()

        // Corner nodes
        ctx.fillStyle = "rgba(16, 185, 129, 0.7)"
        const corners = [
          [x - size, y - size],
          [x + size, y - size],
          [x - size, y + size],
          [x + size, y + size],
        ]
        corners.forEach(([cx, cy]) => {
          ctx.beginPath()
          ctx.arc(cx, cy, size * 0.3, 0, Math.PI * 2)
          ctx.fill()
        })
      } else {
        // Draw tech icon (simplified computer/tech symbol)
        ctx.strokeStyle = "rgba(16, 185, 129, 0.6)"
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.rect(x - size, y - size * 0.7, size * 2, size * 1.4)
        ctx.stroke()

        // Screen lines
        ctx.beginPath()
        ctx.moveTo(x - size + 2, y - size * 0.5)
        ctx.lineTo(x + size - 2, y - size * 0.5)
        ctx.stroke()
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Smoothly interpolate opacity toward target (0 when hovered, 1 otherwise)
      const target = hoverRef.current ? 0 : 1
      opacityRef.current += (target - opacityRef.current) * 0.12
      // apply overall canvas opacity for a cheap fade
      canvas.style.opacity = String(opacityRef.current)

      const time = Date.now() * 0.0002

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx + Math.sin(time + index * 0.5) * 0.04
        particle.y += particle.vy + Math.cos(time * 0.5 + index * 0.5) * 0.04

        // Wrap around screen edges
        if (particle.x < -20) particle.x = canvas.width + 20
        if (particle.x > canvas.width + 20) particle.x = -20
        if (particle.y < -20) particle.y = canvas.height + 20
        if (particle.y > canvas.height + 20) particle.y = -20

        const currentOpacity = particle.opacity + Math.sin(time * 2 + index) * 0.04

        // multiply by overall opacityRef so icons fade out on hover
        drawTechIcon(particle.x, particle.y, particle.size, Math.max(0, currentOpacity) * opacityRef.current, particle.type)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener("resize", handleResize)

    // Hover handlers on the container: we'll capture hover on wrapper div below

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Container captures hover. Canvas stays pointer-events-none so it doesn't block clicks.
  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => {
        hoverRef.current = true
      }}
      onMouseLeave={() => {
        hoverRef.current = false
      }}
      // touch devices: hide on touchstart and show again on touchend
      onTouchStart={() => (hoverRef.current = true)}
      onTouchEnd={() => (hoverRef.current = false)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1, transition: "opacity 220ms linear" }} />
    </div>
  )
}
