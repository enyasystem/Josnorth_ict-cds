"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

const eventsAndNews = [
  {
    id: 1,
    title: "Community Cleanup Drive",
    date: "Sep 28, 2025",
    description: "Join us to clean up local parks and community spaces.",
    location: "Jos North Community",
    attendees: 45,
    type: "event",
  },
  {
    id: 2,
    title: "NYSC Celebrates 50 Years",
    date: "Sep 20, 2025",
    description: "Commemorating five decades of service to the nation.",
    location: "National",
    attendees: 0,
    type: "news",
  },
  {
    id: 3,
    title: "Digital Skills Workshop",
    date: "Oct 10, 2025",
    description: "Practical workshops on digital skills and CV building.",
    location: "NYSC Secretariat",
    attendees: 32,
    type: "event",
  },
  {
    id: 4,
    title: "New Batch Orientation",
    date: "Oct 1, 2025",
    description: "Welcome session for newly posted corps members.",
    location: "Jos North",
    attendees: 120,
    type: "news",
  },
];

export function EventsNewsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div
          className="text-center mb-16"
          style={{
            animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
          }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Events & News
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Stay updated with upcoming events and latest news from NYSC Jos
            North
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {eventsAndNews.map((item, index) => (
            <Card
              key={item.id}
              className="bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group overflow-hidden"
              style={{
                animation: isVisible
                  ? `fadeInUp 0.8s ease-out ${0.1 + index * 0.1}s both`
                  : "none",
              }}
            >
              <div
                className={`h-1 ${
                  item.type === "event" ? "bg-primary" : "bg-accent"
                }`}
              />
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      item.type === "event"
                        ? "bg-secondary text-primary"
                        : "bg-accent/20 text-accent"
                    }`}
                  >
                    {item.type === "event" ? "EVENT" : "NEWS"}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {item.date}
                  </div>
                </div>
                <CardTitle className="text-foreground text-lg group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {item.type === "event" && (
                    <>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <svg
                          className="h-4 w-4 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {item.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <svg
                          className="h-4 w-4 text-accent"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3a6 6 0 016-6h6a6 6 0 016 6h-2a4 4 0 00-4-4H9a4 4 0 00-4 4h12z"
                          />
                        </svg>
                        {item.attendees} attending
                      </div>
                    </>
                  )}
                  <div className="pt-2 flex justify-end">
                    <button className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium group/btn cursor-pointer">
                      Learn more
                      <svg
                        className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
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
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="/events" className="cursor-pointer">
              View All Events & News
            </Link>
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
  );
}
