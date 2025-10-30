"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function EventsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const events = [
    {
      id: 1,
      title: "Community Cleanup",
      date: "Sep 28, 2025",
      time: "8:00 AM - 12:00 PM",
      description: "Join us to clean up local parks and community spaces. Bring your gloves and enthusiasm!",
      location: "Jos North Community Parks",
      attendees: 45,
      category: "Community Service",
    },
    {
      id: 2,
      title: "Skills Workshop",
      date: "Oct 10, 2025",
      time: "10:00 AM - 4:00 PM",
      description: "Practical workshops on digital skills and CV building. Learn essential career development skills.",
      location: "NYSC Secretariat Hall",
      attendees: 32,
      category: "Professional Development",
    },
    {
      id: 3,
      title: "Health Outreach",
      date: "Nov 5, 2025",
      time: "9:00 AM - 3:00 PM",
      description: "Free basic health screenings for community members. Medical professionals will be available.",
      location: "Primary Health Center Jos",
      attendees: 28,
      category: "Health & Wellness",
    },
    {
      id: 4,
      title: "Career Fair",
      date: "Dec 2, 2025",
      time: "10:00 AM - 5:00 PM",
      description: "Meet local employers and learn about opportunities. Network with industry professionals.",
      location: "Jos Convention Center",
      attendees: 67,
      category: "Career Development",
    },
    {
      id: 5,
      title: "Coding Bootcamp",
      date: "Jan 12, 2026",
      time: "9:00 AM - 5:00 PM",
      description: "Intro to web development for beginners. Learn HTML, CSS, and JavaScript fundamentals.",
      location: "ICT Training Center",
      attendees: 24,
      category: "Technology",
    },
    {
      id: 6,
      title: "Fundraising Gala",
      date: "Feb 20, 2026",
      time: "6:00 PM - 11:00 PM",
      description: "Annual gala to support community programs. Join us for an evening of celebration and giving.",
      location: "Grand Ballroom Jos",
      attendees: 120,
      category: "Fundraising",
    },
  ]

  return (
    <PageLayout>
      <div className="px-6 py-16 bg-gradient-to-br from-cyan-50 via-white to-teal-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
            style={{
              animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
            }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">Events & News</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
              Stay updated with upcoming events, workshops, and community outreach programs. Join hundreds of corps
              members in making a positive impact in Jos North.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {events.map((event, index) => (
              <Card
                key={event.id}
                className="bg-white border-2 border-cyan-200 hover:border-teal-400 transition-all duration-300 hover:shadow-2xl group overflow-hidden transform hover:scale-105"
                style={{
                  animation: isVisible ? `fadeInUp 0.8s ease-out ${0.1 + index * 0.08}s both` : "none",
                }}
              >
                <div className="h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400" />
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full">
                      {event.category}
                    </span>
                    <div className="flex items-center gap-1 text-teal-600 text-sm font-semibold">
                      <Users className="h-4 w-4" />
                      {event.attendees}
                    </div>
                  </div>
                  <CardTitle className="text-gray-900 text-xl mb-2 group-hover:text-teal-600 transition-colors">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <Calendar className="h-4 w-4 text-cyan-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <Clock className="h-4 w-4 text-teal-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <MapPin className="h-4 w-4 text-cyan-500" />
                      {event.location}
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white transition-all duration-300 group-hover:shadow-lg transform hover:scale-105"
                    size="sm"
                  >
                    Register Now
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className="text-center bg-gradient-to-r from-cyan-100 via-teal-50 to-cyan-100 rounded-2xl p-12 border-2 border-teal-200 shadow-lg"
            style={{
              animation: isVisible ? "fadeInUp 0.8s ease-out 0.6s both" : "none",
            }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Don't Miss Out!</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
              Subscribe to our newsletter to get notified about new events and important updates.
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-8 py-3 transition-all duration-300 hover:shadow-lg transform hover:scale-105 font-semibold">
              Subscribe to Updates
            </Button>
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
