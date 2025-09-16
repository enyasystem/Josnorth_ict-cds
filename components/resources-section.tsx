import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "./reveal"

export function ResourcesSection() {
  const resources = [
    { title: "Biodata Template", excerpt: "Download the official biodata template for NYSC Jos North." },
    { title: "Event Guidelines", excerpt: "How to prepare and participate in community events." },
    { title: "Volunteer Guide", excerpt: "How to sign up and help run local events." },
    { title: "Resource Center", excerpt: "Where to find learning materials and tools." },
    { title: "Safety Checklist", excerpt: "Best practices for event safety and coordination." },
    { title: "Mentorship Program", excerpt: "Join a mentor-led skills development circle." },
  ]

  return (
    <section className="py-16 px-6 bg-emerald-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Resources</h2>
          <Button asChild variant="ghost" className="text-emerald-200">
            <Link href="/resources">All resources</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, idx) => (
            <Reveal key={idx} index={idx} className="animate-fade-in">
              <article className="bg-emerald-900/30 border border-emerald-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white">{r.title}</h3>
                <p className="text-emerald-100 mt-3">{r.excerpt}</p>
                <div className="mt-4">
                  <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    <Link href="/resources">View more</Link>
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
