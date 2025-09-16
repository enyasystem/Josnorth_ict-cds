import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "./reveal"

export function EventsSection() {
  const events = [
    { title: "Community Cleanup", date: "Sep 28, 2025", excerpt: "Join us to clean up local parks and community spaces.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" },
    { title: "Skills Workshop", date: "Oct 10, 2025", excerpt: "Practical workshops on digital skills and CV building.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" },
    { title: "Health Outreach", date: "Nov 5, 2025", excerpt: "Free basic health screenings for community members.", image: "https://images.unsplash.com/photo-1584467735877-6a3f0b3b5c77?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" },
    { title: "Career Fair", date: "Dec 2, 2025", excerpt: "Meet local employers and learn about opportunities.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" },
    { title: "Coding Bootcamp", date: "Jan 12, 2026", excerpt: "Intro to web development for beginners.", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" },
    { title: "Fundraising Gala", date: "Feb 20, 2026", excerpt: "Annual gala to support community programs.", image: "https://images.unsplash.com/photo-1508847154049-3a7f85c0c0f8?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" },
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
              <article className="bg-emerald-900/30 border border-emerald-800 p-3 rounded-lg card-hover h-40 overflow-hidden flex flex-col">
                <div className="w-full h-20 overflow-hidden rounded-md">
                  <img src={e.image} alt={`${e.title} image`} className="w-full h-full object-cover" />
                </div>
                <div className="mt-2 flex-1">
                  <h3 className="text-sm font-semibold text-white">{e.title}</h3>
                  <p className="text-emerald-200 text-xs mt-1">{e.date}</p>
                  <p className="text-emerald-100 mt-1 text-xs line-clamp-2">{e.excerpt}</p>
                </div>
                <div className="mt-2">
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
