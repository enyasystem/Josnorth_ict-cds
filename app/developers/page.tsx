import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Github, Mail } from "lucide-react"

export default function DevelopersPage() {
  const developers = [
    {
      name: "Ada",
      role: "Frontend Engineer",
      initials: "AD",
    },
    {
      name: "Chinedu",
      role: "Backend Engineer",
      initials: "CH",
    },
    {
      name: "Sade",
      role: "Fullstack Developer",
      initials: "SA",
    },
  ]

  return (
    <PageLayout>
      <div className="px-6 py-16 bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Meet the Dev Team</h1>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
            Short bios and contact links for the developers who built and maintain this platform.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {developers.map((dev, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-teal-200 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-teal-300 transition-colors">
                  <span className="text-3xl font-bold text-teal-800">{dev.initials}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{dev.name}</h3>
                <p className="text-gray-600 mb-4">{dev.role}</p>
                <div className="flex justify-center gap-4">
                  <Button variant="ghost" size="sm" className="text-teal-700 hover:text-teal-900 hover:bg-teal-100">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="ghost" size="sm" className="text-teal-700 hover:text-teal-900 hover:bg-teal-100">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3">View all developers</Button>
        </div>
      </div>
    </PageLayout>
  )
}
