"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function DefiningBrand() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="px-6 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div
            className="order-2 lg:order-1"
            style={{
              animation: isVisible ? "fadeInLeft 0.8s ease-out" : "none",
            }}
          >
            <div className="bg-gray-200 rounded-3xl overflow-hidden h-96 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/technology-innovation-digital-transformation.jpg"
                alt="Defining our brand"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div
            className="order-1 lg:order-2 space-y-6"
            style={{
              animation: isVisible ? "fadeInRight 0.8s ease-out" : "none",
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
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">Defining Our Brand</h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Our brand is about service with purpose. It's the confidence you feel knowing that corps members genuinely
              care about community development and positive change.
            </p>
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
      `}</style>
    </section>
  )
}
