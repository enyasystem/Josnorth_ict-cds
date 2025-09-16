import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
  const events = [
    {
      title: "Orientation Workshop",
      date: "Sep 28, 2025",
    },
    {
      title: "Health Outreach",
      date: "Oct 10, 2025",
    },
    {
      title: "Skills Training",
      date: "Nov 5, 2025",
    },
  ]

  return (
    <PageLayout>
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Upcoming Events</h1>
          <p className="text-xl text-emerald-100 mb-16 max-w-2xl mx-auto">
            Join the latest events organised by NYSC Jos North.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-emerald-800/30 backdrop-blur-sm rounded-lg p-8 border border-emerald-700/30"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                <p className="text-emerald-200">{event.date}</p>
              </div>
            ))}
          </div>

          <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3">View more events</Button>
        </div>
      </div>
    </PageLayout>
  )
}
