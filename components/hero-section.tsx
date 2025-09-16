import { Button } from "@/components/ui/button"
import { Calendar, FileText, Users } from "lucide-react"
import Link from "next/link"
import { TypewriterText } from "./typewriter-text"
import Image from "next/image"
import { AnimatedParticles } from "./animated-particles"

export function HeroSection() {
  return (
    <section className="px-6 py-16 relative overflow-hidden">
      <AnimatedParticles />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* User Icon */}
            <div className="w-20 h-20 bg-emerald-700/50 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                <TypewriterText text="NYSC Jos North" speed={120} loop={true} delay={1000} className="typewriter-glow text-emerald-200" />
              </h1>
              <p className="text-xl text-emerald-50 leading-relaxed max-w-lg">
                Official biodata management platform for NYSC Jos North — register, find resources, and join events.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <Link href="/events" className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  View Events
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-emerald-300 text-emerald-50 hover:bg-emerald-700 hover:text-white bg-transparent"
              >
                <Link href="/resources" className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Browse Resources
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-xl xl:max-w-2xl">
              <Image
                src="/ict-hero-illustration.png"
                alt="ICT Technology Ecosystem - Servers, Databases, and Digital Infrastructure"
                width={900}
                height={600}
                className="w-full h-auto object-contain opacity-95 drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
