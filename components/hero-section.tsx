"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="px-6 py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className="space-y-8"
            style={{
              animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
            }}
          >
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-sm font-semibold text-primary bg-secondary px-4 py-2 rounded-full">
                  Welcome to NYSC Jos North
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Empowering Corps Members to Make Impact
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg text-pretty">
                Join our community of dedicated corps members making lasting impact in Jos North through skills
                development, community outreach, and collaborative initiatives.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-secondary bg-transparent"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <p className="text-sm text-muted-foreground">Corps Members</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <p className="text-sm text-muted-foreground">Events Hosted</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">1000+</div>
                <p className="text-sm text-muted-foreground">Lives Impacted</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div
              className="col-span-1 flex flex-col gap-4"
              style={{
                animation: isVisible ? "fadeInUp 0.8s ease-out 0.2s both" : "none",
              }}
            >
              <div className="bg-gradient-to-br from-teal-100 to-teal-50 rounded-xl overflow-hidden h-48 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/corps-members-volunteering.jpg"
                  alt="Corps members volunteering"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl overflow-hidden h-40 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/community-service.png"
                  alt="Community service"
                  width={200}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div
              className="col-span-1 flex flex-col gap-4 pt-8"
              style={{
                animation: isVisible ? "fadeInUp 0.8s ease-out 0.3s both" : "none",
              }}
            >
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl overflow-hidden h-40 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/skills-training.png"
                  alt="Skills training"
                  width={200}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gradient-to-br from-teal-100 to-teal-50 rounded-xl overflow-hidden h-48 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src="/team-collaboration.png"
                  alt="Team collaboration"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
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
