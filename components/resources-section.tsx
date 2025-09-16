import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "./reveal"

export function ResourcesSection() {
  const resources = [
    { title: "Biodata Template", excerpt: "Download the official biodata template for NYSC Jos North.", image: "https://images.unsplash.com/photo-1581091012184-7b9c1d9d0d7e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" },
    { title: "Event Guidelines", excerpt: "How to prepare and participate in community events.", image: "https://images.unsplash.com/photo-1580281657520-9e0d2a2f9a8b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" },
    { title: "Volunteer Guide", excerpt: "How to sign up and help run local events.", image: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" },
    { title: "Resource Center", excerpt: "Where to find learning materials and tools.", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" },
    { title: "Safety Checklist", excerpt: "Best practices for event safety and coordination.", image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" },
    { title: "Mentorship Program", excerpt: "Join a mentor-led skills development circle.", image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" },
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
                <article className="bg-emerald-900/30 border border-emerald-800 p-3 rounded-lg card-hover h-40 overflow-hidden flex flex-col">
                  <div className="w-full h-20 overflow-hidden rounded-md">
                    <img src={r.image} alt={`${r.title} image`} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-2 flex-1">
                    <h3 className="text-sm font-semibold text-white">{r.title}</h3>
                    <p className="text-emerald-100 mt-1 text-xs line-clamp-2">{r.excerpt}</p>
                  </div>
                  <div className="mt-2">
                    <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white button-press">
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
