import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Frontend Developer",
    description: "Passionate about UX and building accessible interfaces.",
    avatar: "/professional-woman-developer.png",
    skills: ["React", "TypeScript", "UI/UX"],
  },
  {
    id: 2,
    name: "Mohammed Ali",
    role: "Backend Developer",
    description: "APIs, databases and server-side best practices.",
    avatar: "/professional-backend-developer.png",
    skills: ["Node.js", "PostgreSQL", "API Design"],
  },
  {
    id: 3,
    name: "Grace Lee",
    role: "Fullstack Developer",
    description: "Fullstack engineer focused on performance and DX.",
    avatar: "/professional-woman-fullstack-developer.jpg",
    skills: ["Next.js", "Python", "DevOps"],
  },
  {
    id: 4,
    name: "Emeka Obi",
    role: "Mobile Developer",
    description: "Builds delightful cross-platform mobile apps.",
    avatar: "/professional-mobile-developer.png",
    skills: ["React Native", "Flutter", "iOS"],
  },
]

export function TeamSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-50 mb-4 text-balance">Meet Our Team</h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto text-pretty">
            The dedicated developers and designers building the future of NYSC Jos North digital platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="bg-emerald-900/20 border-emerald-700/30 hover:bg-emerald-900/30 transition-all duration-300 hover:scale-105 group text-center"
            >
              <CardHeader>
                <div className="mx-auto mb-4">
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto border-2 border-emerald-600 group-hover:border-emerald-500 transition-colors"
                  />
                </div>
                <CardTitle className="text-emerald-50 text-lg">{member.name}</CardTitle>
                <CardDescription className="text-emerald-300 font-medium">{member.role}</CardDescription>
                <CardDescription className="text-emerald-200 text-sm mt-2">{member.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.skills.map((skill, index) => (
                      <span key={index} className="text-xs bg-emerald-800/30 text-emerald-300 px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <button className="p-2 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-800/30 rounded-full transition-colors">
                      <Github className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-800/30 rounded-full transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-800/30 rounded-full transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-emerald-600 text-emerald-100 hover:bg-emerald-800/50 bg-transparent"
          >
            <Link href="/team">View All Team Members</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
