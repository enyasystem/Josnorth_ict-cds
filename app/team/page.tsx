"use client"

"use client"

import { PageLayout } from "@/components/page-layout"
import dynamic from "next/dynamic"
const FloatingNav = dynamic(() => import("@/components/floating-nav"), { ssr: false })
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, MapPin, Calendar, Award } from "lucide-react"
import { useDevelopers, useExcos } from "@/lib/hooks/useTeam"
import { Skeleton } from "@/components/ui/skeleton"

export default function TeamPage() {
  const { data: devResp, isLoading: devLoading } = useDevelopers()
  const { data: excosResp, isLoading: excosLoading } = useExcos()

  const developers = devResp?.data ?? []
  const excos = excosResp?.data ?? []

  let teamCards: React.ReactNode

  if (devLoading) {
    teamCards = Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-lg" />)
  } else if (developers.length > 0) {
    teamCards = developers.map((member: any) => {
      return (
        <Card
          key={member.id}
          className="bg-white border-green-100 hover:border-green-200 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
        >
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={member.img || member.avatar || "/placeholder.svg"}
                alt={member.name}
                className="w-16 h-16 rounded-full border-2 border-green-100 group-hover:border-green-200 transition-colors"
              />
              <div>
                <CardTitle className="text-green-800 text-lg">{member.name}</CardTitle>
                <CardDescription className="text-green-700 font-medium">{member.role}</CardDescription>
              </div>
            </div>
            <CardDescription className="text-gray-600 text-sm leading-relaxed">{member.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {(member.skills || []).map((skill: string, index: number) => (
                  <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-green-600" />
                  {member.experience} experience
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  {member.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  Joined {member.joinDate}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-green-700">Key Achievements:</p>
                {(member.achievements || []).map((achievement: string, index: number) => (
                  <p key={index} className="text-xs text-gray-600">
                    • {achievement}
                  </p>
                ))}
              </div>

              <div className="flex justify-center gap-3 pt-3 border-t border-green-100">
                <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full transition-colors">
                  <Github className="h-4 w-4" />
                </button>
                <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full transition-colors">
                  <Linkedin className="h-4 w-4" />
                </button>
                <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full transition-colors">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    })
  } else {
    teamCards = <p className="text-center col-span-full text-gray-600">No team members found.</p>
  }

  return (
    <PageLayout showHeader={false}>
      <FloatingNav />
      <div className="pt-28 px-6 py-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-green-800 mb-6 text-balance">Meet Our Team</h1>
            <p className="text-xl text-green-600 mb-8 max-w-3xl mx-auto text-pretty">
              The dedicated developers, designers, and engineers building the future of NYSC Jos North digital platform.
              Our diverse team brings together expertise in modern web technologies, user experience design, and
              scalable infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamCards}
          </div>

          <div className="text-center bg-green-50 rounded-lg p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Join Our Team</h3>
            <p className="text-green-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about technology and making a positive
              impact in the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-500 text-white px-8 py-3">View Open Positions</Button>
              <Button
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 bg-transparent"
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
