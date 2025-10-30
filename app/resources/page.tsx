"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  Download,
  BookOpen,
  Shield,
  Users,
  GraduationCap,
  Package,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react"
import { useEffect, useState } from "react"

export default function ResourcesPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const resources = [
    {
      id: 1,
      title: "Biodata Template",
      description: "Download the official biodata template for NYSC Jos North registration and data collection.",
      icon: FileText,
      category: "Templates",
      fileSize: "2.5 MB",
      downloads: 234,
      lastUpdated: "Sep 15, 2025",
      status: "Updated",
    },
    {
      id: 2,
      title: "Event Guidelines",
      description: "Comprehensive guide on how to prepare and participate in community events and outreach programs.",
      icon: BookOpen,
      category: "Guides",
      fileSize: "1.8 MB",
      downloads: 156,
      lastUpdated: "Aug 28, 2025",
      status: "Current",
    },
    {
      id: 3,
      title: "Volunteer Guide",
      description: "Step-by-step instructions on how to sign up and help run local events and community programs.",
      icon: Users,
      category: "Guides",
      fileSize: "3.2 MB",
      downloads: 189,
      lastUpdated: "Sep 10, 2025",
      status: "Updated",
    },
    {
      id: 4,
      title: "Resource Center Directory",
      description: "Complete directory of where to find learning materials, tools, and educational resources.",
      icon: GraduationCap,
      category: "Directory",
      fileSize: "1.5 MB",
      downloads: 98,
      lastUpdated: "Sep 5, 2025",
      status: "Current",
    },
    {
      id: 5,
      title: "Safety Checklist",
      description: "Essential best practices for event safety, coordination, and emergency procedures.",
      icon: Shield,
      category: "Checklists",
      fileSize: "0.8 MB",
      downloads: 145,
      lastUpdated: "Sep 12, 2025",
      status: "Critical",
    },
    {
      id: 6,
      title: "Mentorship Program Guide",
      description: "Information on how to join mentor-led skills development circles and professional growth programs.",
      icon: Users,
      category: "Programs",
      fileSize: "2.1 MB",
      downloads: 203,
      lastUpdated: "Sep 8, 2025",
      status: "Updated",
    },
    {
      id: 7,
      title: "Event Kit Materials",
      description: "Complete package of materials, templates, and resources needed for organizing community events.",
      icon: Package,
      category: "Event Kits",
      fileSize: "5.4 MB",
      downloads: 87,
      lastUpdated: "Sep 3, 2025",
      status: "Current",
    },
    {
      id: 8,
      title: "Registration Forms",
      description: "Official forms for various NYSC programs, events, and administrative processes.",
      icon: FileText,
      category: "Forms",
      fileSize: "1.2 MB",
      downloads: 312,
      lastUpdated: "Sep 18, 2025",
      status: "Updated",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Updated":
        return <CheckCircle className="h-4 w-4 text-cyan-400" />
      case "Critical":
        return <AlertCircle className="h-4 w-4 text-amber-400" />
      default:
        return <CheckCircle className="h-4 w-4 text-teal-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Updated":
        return "bg-cyan-100 text-cyan-700"
      case "Critical":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-teal-100 text-teal-700"
    }
  }

  return (
    <PageLayout>
      <div className="px-6 py-16 bg-gradient-to-br from-cyan-50 via-white to-teal-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
            style={{
              animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
            }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">Resources</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
              Access comprehensive guides, forms, and documentation curated specifically for NYSC Jos North corps
              members. Everything you need for a successful service year.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon
              return (
                <Card
                  key={resource.id}
                  className="bg-white border-2 border-cyan-200 hover:border-teal-400 transition-all duration-300 hover:shadow-2xl group overflow-hidden transform hover:scale-105"
                  style={{
                    animation: isVisible ? `fadeInUp 0.8s ease-out ${0.1 + index * 0.08}s both` : "none",
                  }}
                >
                  <div className="h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400" />
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-lg group-hover:from-cyan-200 group-hover:to-teal-200 transition-all">
                        <IconComponent className="h-6 w-6 text-teal-600" />
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(resource.status)}
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(resource.status)}`}>
                          {resource.status}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-gray-900 text-lg mb-2 group-hover:text-teal-600 transition-colors">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-gray-700 text-sm">
                        <span className="font-semibold">{resource.category}</span>
                        <span className="text-gray-500 text-xs">{resource.fileSize}</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-700 text-sm">
                        <div className="flex items-center gap-1 font-medium">
                          <Download className="h-4 w-4 text-teal-600" />
                          <span>{resource.downloads}</span>
                        </div>
                        <span className="text-gray-500 text-xs">{resource.lastUpdated}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white transition-all duration-300 group-hover:shadow-lg transform hover:scale-105 font-semibold"
                      size="sm"
                    >
                      Download
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div
            className="text-center bg-gradient-to-r from-cyan-100 via-teal-50 to-cyan-100 rounded-2xl p-12 border-2 border-teal-200 shadow-lg"
            style={{
              animation: isVisible ? "fadeInUp 0.8s ease-out 0.6s both" : "none",
            }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
              Can't find what you're looking for? Contact our support team for assistance with resources and
              documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-8 py-3 transition-all duration-300 hover:shadow-lg transform hover:scale-105 font-semibold">
                Contact Support
              </Button>
              <Button
                variant="outline"
                className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-3 bg-white transition-all duration-300 font-semibold"
              >
                Request Resource
              </Button>
            </div>
          </div>
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
    </PageLayout>
  )
}
