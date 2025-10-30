import { Card, CardContent } from "@/components/ui/card"

export function StatsSection() {
  const stats = [
    { number: "500+", label: "Active Corps Members" },
    { number: "50+", label: "Events Organized" },
    { number: "25+", label: "Resources Available" },
    { number: "99%", label: "Platform Uptime" },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Platform Impact</h2>
          <p className="text-xl text-emerald-50 max-w-2xl mx-auto">
            See how our platform is making a difference in the NYSC Jos North community
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-emerald-800/30 border-emerald-700 text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                <div className="text-emerald-50 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
