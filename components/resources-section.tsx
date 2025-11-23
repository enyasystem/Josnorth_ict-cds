"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useResources } from "@/lib/hooks/useResources"
import { Skeleton } from "@/components/ui/skeleton"

export function ResourcesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { data: response, isLoading } = useResources({ limit: 6 })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const resources = response?.data ?? []

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div
          className="text-center mb-16"
          style={{
            animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
          }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Resources</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Access guides, forms, and documentation curated specifically for corps members
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div key={`res-skel-${idx}`} style={{ animation: isVisible ? `fadeInUp 0.8s ease-out ${0.1 + idx * 0.08}s both` : "none" }}>
                  <Skeleton className="h-48 rounded-lg" />
                </div>
              ))
            : resources.length > 0
            ? resources.map((resource, index) => {
                return (
                  <Card
                    key={resource.id}
                    className="bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group overflow-hidden"
                    style={{
                      animation: isVisible ? `fadeInUp 0.8s ease-out ${0.1 + index * 0.08}s both` : "none",
                    }}
                  >
                    <div className="h-1 bg-gradient-to-r from-primary to-accent" />
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-3 bg-secondary rounded-lg group-hover:bg-secondary/80 transition-all text-2xl">
                          {resource.icon ?? "📄"}
                        </div>
                        <span className="text-xs font-bold text-primary bg-secondary px-3 py-1 rounded-full">
                          {resource.type ?? "Resource"}
                        </span>
                      </div>
                      <CardTitle className="text-foreground text-lg group-hover:text-primary transition-colors">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-primary text-sm font-medium">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          {resource.downloads ?? "-"}
                        </div>
                        <button className="text-primary hover:text-primary/80 flex items-center gap-1 font-semibold group/btn transition-all">
                          Access
                          <svg
                            className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            : (
              <div className="col-span-full text-center">
                <p className="text-muted-foreground">No resources available.</p>
              </div>
            )}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/resources">View All Resources</Link>
          </Button>
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
