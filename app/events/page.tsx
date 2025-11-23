"use client"

import { PageLayout } from "@/components/page-layout"
import dynamic from "next/dynamic"
const FloatingNav = dynamic(() => import("@/components/floating-nav"), { ssr: false })
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useEvents } from "@/lib/hooks/useEvents"
import { Skeleton } from "@/components/ui/skeleton"

export default function EventsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const { data: eventsResp, isLoading: eventsLoading } = useEvents({ limit: 12, status: "published" })
  const events = eventsResp?.data ?? []

  return (
    <PageLayout showHeader={false}>
      <FloatingNav />
      <div className="pt-28 px-6 py-8 bg-green-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
            style={{
              animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
            }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-green-800 mb-6 text-balance">Events & News</h1>
            <p className="text-xl text-green-600 mb-8 max-w-3xl mx-auto text-pretty">
              Stay updated with upcoming events, workshops, and community outreach programs. Join hundreds of corps
              members in making a positive impact in Jos North.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {eventsLoading ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-lg" />)
            ) : events.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">No events yet. Check back later.</p>
            ) : (
              events.map((event: any, index: number) => (
                <Card
                  key={event.id}
                  className="bg-white border-2 border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg group overflow-hidden transform hover:scale-105"
                  style={{
                    animation: isVisible ? `fadeInUp 0.8s ease-out ${0.1 + index * 0.08}s both` : "none",
                  }}
                >
                  <div className="h-1 bg-gradient-to-r from-green-400 via-green-600 to-green-500" />
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                        {event.category}
                      </span>
                      <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                        <Users className="h-4 w-4" />
                        {event.attendees}
                      </div>
                    </div>
                    <CardTitle className="text-green-800 text-xl mb-2 group-hover:text-green-600 transition-colors">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-green-700 text-sm">
                        <Calendar className="h-4 w-4 text-green-500" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-green-700 text-sm">
                        <Clock className="h-4 w-4 text-green-500" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-green-700 text-sm">
                        <MapPin className="h-4 w-4 text-green-500" />
                        {event.location}
                      </div>
                    </div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-500 text-white transition-all duration-300 group-hover:shadow transform hover:scale-105"
                      size="sm"
                    >
                      Register Now
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
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
    </PageLayout>
  )
}
