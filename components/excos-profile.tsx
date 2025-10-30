"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useState } from "react"

const execMembers = [
  {
    id: 1,
    name: "Chioma Adeyemi",
    role: "Coordinator",
    description: "Leading NYSC Jos North CDS initiatives",
    avatar: "/professional-woman-coordinator.jpg",
  },
  {
    id: 2,
    name: "Tunde Okafor",
    role: "Vice Coordinator",
    description: "Supporting community programs",
    avatar: "/professional-man-vice-coordinator.jpg",
  },
  {
    id: 3,
    name: "Zainab Hassan",
    role: "Secretary",
    description: "Managing communications and records",
    avatar: "/professional-woman-secretary.jpg",
  },
  {
    id: 4,
    name: "David Okoro",
    role: "Treasurer",
    description: "Overseeing financial management",
    avatar: "/professional-man-treasurer.jpg",
  },
]

export function ExcosProfile() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-white via-cyan-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div
          className="text-center mb-16"
          style={{
            animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
          }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Executive Council</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            Meet the dedicated leaders steering NYSC Jos North CDS towards excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {execMembers.map((member, index) => (
            <Card
              key={member.id}
              className="bg-white border-cyan-200 hover:border-teal-400 hover:shadow-lg transition-all duration-300 group"
              style={{
                animation: isVisible ? `fadeInUp 0.8s ease-out ${0.1 + index * 0.1}s both` : "none",
              }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto border-3 border-cyan-300 group-hover:border-teal-400 transition-colors"
                  />
                </div>
                <CardTitle className="text-gray-900 text-lg">{member.name}</CardTitle>
                <CardDescription className="text-teal-600 font-semibold">{member.role}</CardDescription>
                <p className="text-gray-600 text-sm mt-2">{member.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-3">
                  <button className="p-2 text-gray-600 hover:text-teal-600 hover:bg-cyan-100 rounded-full transition-colors">
                    <Github className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-teal-600 hover:bg-cyan-100 rounded-full transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-teal-600 hover:bg-cyan-100 rounded-full transition-colors">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
