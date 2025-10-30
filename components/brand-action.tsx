"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function BrandAction() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="px-6 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Image */}
        <div
          className="mb-12"
          style={{
            animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
          }}
        >
          <div className="bg-gray-200 rounded-3xl overflow-hidden h-64 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/digital-platform-interface-technology.jpg"
              alt="Brand in action"
              width={800}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className="space-y-6"
            style={{
              animation: isVisible ? "fadeInLeft 0.8s ease-out 0.2s both" : "none",
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
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">Our Brand in Action</h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Every interaction, from community outreach to volunteer coordination, reflects our commitment. You'll
              notice the difference in how we show up consistently.
            </p>
          </div>

          {/* Right Image */}
          <div
            className="bg-gray-200 rounded-3xl overflow-hidden h-96 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            style={{
              animation: isVisible ? "fadeInRight 0.8s ease-out 0.2s both" : "none",
            }}
          >
            <Image
              src="/consistent-brand-experience-digital.jpg"
              alt="Brand consistency"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
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
