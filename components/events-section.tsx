import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"

const upcomingEvents = [
  {
    id: 1,
    title: "Community Cleanup",
    date: "Sep 28, 2025",
    description: "Join us to clean up local parks and community spaces.",
    location: "Jos North Community",
    attendees: 45,
  },
  {
    id: 2,
    title: "Skills Workshop",
    date: "Oct 10, 2025",
    description: "Practical workshops on digital skills and CV building.",
    location: "NYSC Secretariat",
    attendees: 32,
  },
  {
    id: 3,
    title: "Health Outreach",
    date: "Nov 5, 2025",
    description: "Free basic health screenings for community members.",
    location: "Primary Health Center",
    attendees: 28,
  },
  {
    id: 4,
    title: "Career Fair",
    date: "Dec 2, 2025",
    description: "Meet local employers and learn about opportunities.",
    location: "Jos Convention Center",
    attendees: 67,
  },
]

export function EventsSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-50 mb-4 text-balance">Upcoming Events</h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto text-pretty">
            Stay updated with upcoming events, workshops, and community outreach programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {upcomingEvents.map((event) => (
            <Card
              key={event.id}
              className="bg-emerald-900/20 border-emerald-700/30 hover:bg-emerald-900/30 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center gap-2 text-emerald-300 text-sm mb-2">
                  <Calendar className="h-4 w-4" />
                  {event.date}
                </div>
                <CardTitle className="text-emerald-50 text-lg">{event.title}</CardTitle>
                <CardDescription className="text-emerald-200">{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 text-sm">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300 text-sm">
                    <Users className="h-4 w-4" />
                    {event.attendees} attending
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-emerald-600 text-emerald-100 hover:bg-emerald-800/50 bg-transparent"
          >
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
