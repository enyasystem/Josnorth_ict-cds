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
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Meet the Dev Team</h1>
          <p className="text-xl text-emerald-100 mb-16 max-w-2xl mx-auto">
            Short bios and contact links for the developers who built and maintain this platform.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {developers.map((dev, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-emerald-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">{dev.initials}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{dev.name}</h3>
                <p className="text-emerald-200 mb-4">{dev.role}</p>
                <div className="flex justify-center gap-4">
                  <Button variant="ghost" size="sm" className="text-emerald-200 hover:text-white hover:bg-emerald-700">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="ghost" size="sm" className="text-emerald-200 hover:text-white hover:bg-emerald-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3">View all developers</Button>
        </div>
      </div>
    </PageLayout>
  )
}
