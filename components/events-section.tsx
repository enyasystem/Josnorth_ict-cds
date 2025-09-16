import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "./reveal"

export function EventsSection() {
  const events = [
    { title: "Community Cleanup", date: "Sep 28, 2025", excerpt: "Join us to clean up local parks and community spaces." },
    { title: "Skills Workshop", date: "Oct 10, 2025", excerpt: "Practical workshops on digital skills and CV building." },
    { title: "Health Outreach", date: "Nov 5, 2025", excerpt: "Free basic health screenings for community members." },
    { title: "Career Fair", date: "Dec 2, 2025", excerpt: "Meet local employers and learn about opportunities." },
    { title: "Coding Bootcamp", date: "Jan 12, 2026", excerpt: "Intro to web development for beginners." },
    { title: "Fundraising Gala", date: "Feb 20, 2026", excerpt: "Annual gala to support community programs." },
  ]

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
          <Button asChild variant="ghost" className="text-emerald-200">
            <Link href="/events">View all events</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e, idx) => (
            <Reveal key={idx} index={idx} className="animate-fade-in">
              <article className="bg-emerald-900/30 border border-emerald-800 p-6 rounded-lg card-hover">
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" alt={`${e.title} image`} className="rounded-md mb-3 w-full h-40 object-cover" />
                <h3 className="text-lg font-semibold text-white">{e.title}</h3>
                <p className="text-sm text-emerald-200 mt-1">{e.date}</p>
                <p className="text-emerald-100 mt-3">{e.excerpt}</p>
                <div className="mt-4">
                  <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white button-press">
                    <Link href={`/events`}>View more</Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
