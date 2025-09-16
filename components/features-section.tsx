import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, FileText, Shield, Globe, Zap } from "lucide-react"

export function FeaturesSection() {
  const features = [
    // {
    //   icon: Users,
    //   title: "Member Management",
    //   description: "Comprehensive biodata management system for all corps members with secure data handling.",
    // },
    {
      icon: Calendar,
      title: "Event Organization",
      description: "Stay updated with upcoming events, workshops, and community outreach programs.",
    },
    {
      icon: FileText,
      title: "Resource Library",
      description: "Access guides, forms, and documentation curated specifically for corps members.",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security and privacy measures.",
    },
    // {
    //   icon: Globe,
    //   title: "Community Connect",
    //   description: "Connect with fellow corps members and build lasting professional relationships.",
    // },
    // {
    //   icon: Zap,
    //   title: "Quick Access",
    //   description: "Fast, intuitive interface designed for efficient navigation and task completion.",
    // },
  ]

  return (
    <section className="py-20 px-6 bg-emerald-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Platform Features</h2>
          <p className="text-xl text-emerald-50 max-w-2xl mx-auto">
            Discover the powerful tools and features designed to enhance your NYSC experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-emerald-800/50 border-emerald-700 hover:bg-emerald-800/70 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-emerald-50 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
