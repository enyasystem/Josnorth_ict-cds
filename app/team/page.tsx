import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, MapPin, Calendar, Award } from "lucide-react"

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Frontend Developer",
      description:
        "Passionate about UX and building accessible interfaces that make technology inclusive for everyone.",
      avatar: "/professional-woman-developer.png",
      skills: ["React", "TypeScript", "UI/UX", "Accessibility", "Figma"],
      experience: "3 years",
      location: "Jos, Nigeria",
      joinDate: "Jan 2024",
      achievements: ["Led UI redesign project", "Accessibility champion"],
    },
    {
      id: 2,
      name: "Mohammed Ali",
      role: "Backend Developer",
      description: "Expert in APIs, databases and server-side best practices with a focus on scalable architecture.",
      avatar: "/professional-backend-developer.png",
      skills: ["Node.js", "PostgreSQL", "API Design", "Docker", "AWS"],
      experience: "4 years",
      location: "Jos, Nigeria",
      joinDate: "Feb 2024",
      achievements: ["Database optimization expert", "API security specialist"],
    },
    {
      id: 3,
      name: "Grace Lee",
      role: "Fullstack Developer",
      description: "Fullstack engineer focused on performance optimization and developer experience improvements.",
      avatar: "/professional-woman-fullstack-developer.jpg",
      skills: ["Next.js", "Python", "DevOps", "Performance", "Testing"],
      experience: "5 years",
      location: "Jos, Nigeria",
      joinDate: "Dec 2023",
      achievements: ["Performance optimization lead", "CI/CD implementation"],
    },
    {
      id: 4,
      name: "Emeka Obi",
      role: "Mobile Developer",
      description:
        "Builds delightful cross-platform mobile applications with focus on user experience and performance.",
      avatar: "/professional-mobile-developer.png",
      skills: ["React Native", "Flutter", "iOS", "Android", "Mobile UX"],
      experience: "3 years",
      location: "Jos, Nigeria",
      joinDate: "Mar 2024",
      achievements: ["Mobile app launch success", "Cross-platform expert"],
    },
    {
      id: 5,
      name: "Lina Yusuf",
      role: "UI/UX Designer",
      description:
        "Design systems specialist focused on accessibility and creating cohesive visual language across platforms.",
      avatar: "/professional-woman-designer.png",
      skills: ["Design Systems", "Accessibility", "Figma", "User Research", "Prototyping"],
      experience: "4 years",
      location: "Jos, Nigeria",
      joinDate: "Jan 2024",
      achievements: ["Design system creator", "User research lead"],
    },
    {
      id: 6,
      name: "David E",
      role: "DevOps Engineer",
      description:
        "Infrastructure specialist implementing CI/CD pipelines and ensuring reliable, scalable deployments.",
      avatar: "/professional-devops-engineer.png",
      skills: ["CI/CD", "Docker", "Kubernetes", "AWS", "Monitoring"],
      experience: "6 years",
      location: "Jos, Nigeria",
      joinDate: "Nov 2023",
      achievements: ["Infrastructure automation", "Zero-downtime deployments"],
    },
  ]

  return (
    <PageLayout>
      <div className="px-6 py-16 bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">Meet Our Team</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
              The dedicated developers, designers, and engineers building the future of NYSC Jos North digital platform.
              Our diverse team brings together expertise in modern web technologies, user experience design, and
              scalable infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="bg-white border-teal-200 hover:border-teal-400 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-16 h-16 rounded-full border-2 border-teal-400 group-hover:border-teal-600 transition-colors"
                    />
                    <div>
                      <CardTitle className="text-gray-900 text-lg">{member.name}</CardTitle>
                      <CardDescription className="text-teal-700 font-medium">{member.role}</CardDescription>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, index) => (
                        <span key={index} className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-teal-600" />
                        {member.experience} experience
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-teal-600" />
                        {member.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-teal-600" />
                        Joined {member.joinDate}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-teal-700">Key Achievements:</p>
                      {member.achievements.map((achievement, index) => (
                        <p key={index} className="text-xs text-gray-600">
                          • {achievement}
                        </p>
                      ))}
                    </div>

                    <div className="flex justify-center gap-3 pt-3 border-t border-teal-200">
                      <button className="p-2 text-teal-600 hover:text-teal-800 hover:bg-teal-100 rounded-full transition-colors">
                        <Github className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-teal-600 hover:text-teal-800 hover:bg-teal-100 rounded-full transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-teal-600 hover:text-teal-800 hover:bg-teal-100 rounded-full transition-colors">
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center bg-teal-50 rounded-lg p-8 border border-teal-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about technology and making a positive
              impact in the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3">View Open Positions</Button>
              <Button
                variant="outline"
                className="border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-3 bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
