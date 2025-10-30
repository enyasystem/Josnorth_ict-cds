"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function PatientCentered() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="px-6 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className="space-y-6"
            style={{
              animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
            }}
          >
            {/* Logo Badge */}
            <div className="inline-block bg-gradient-to-r from-cyan-300 to-teal-300 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">+</span>
                </div>
                <span className="text-teal-900 font-bold text-sm">NYSC Jos North CDS</span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">Community-Centered Promise</h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              You deserve service that works for your community—not the other way around.
            </p>

            {/* Promise Points */}
            <div className="space-y-4">
              {["Always listen first", "Respect community needs", "Build lasting impact"].map((point, index) => (
                <div
                  key={point}
                  className="flex items-center gap-3"
                  style={{
                    animation: isVisible ? `fadeInUp 0.6s ease-out ${0.2 + index * 0.1}s both` : "none",
                  }}
                >
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-2 gap-4">
            {[0, 1].map((index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-2xl overflow-hidden h-64 flex items-center justify-center hover:shadow-lg transition-shadow"
                style={{
                  animation: isVisible ? `fadeInUp 0.8s ease-out ${0.3 + index * 0.15}s both` : "none",
                }}
              >
                <Image
                  src={
                    ["/user-experience-design-interface.jpg", "/tech-team-collaboration.png"][index] ||
                    "/placeholder.svg"
                  }
                  alt={["Community engagement", "Team collaboration"][index]}
                  width={200}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
