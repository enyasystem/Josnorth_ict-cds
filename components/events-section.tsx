"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { useEvents } from "@/lib/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

export function EventsSection() {
  const {
    data: response,
    isLoading,
    error,
  } = useEvents({
    status: "published",
    limit: 6,
  });

  if (error) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-400">
            Failed to load events. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const events = response?.data || [];

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-50 mb-4 text-balance">
            Upcoming Events
          </h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto text-pretty">
            Stay updated with upcoming events, workshops, and community outreach
            programs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-40 rounded-lg bg-emerald-900/30"
                />
              ))
            : events.map((e, idx) => (
                <Reveal key={e.id} index={idx} className="animate-fade-in">
                  <article className="bg-emerald-900/30 border border-emerald-800 p-3 rounded-lg card-hover h-40 overflow-hidden flex flex-col">
                    <div className="w-full h-20 overflow-hidden rounded-md bg-emerald-800/50 flex items-center justify-center">
                      {e.image ? (
                        <img
                          src={e.image}
                          alt={`${e.title} image`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Calendar className="w-8 h-8 text-emerald-200" />
                      )}
                    </div>
                    <div className="mt-2 flex-1">
                      <h3 className="text-sm font-semibold text-white">
                        {e.title}
                      </h3>
                      <p className="text-emerald-200 text-xs mt-1">
                        {new Date(e.date).toLocaleDateString()}
                      </p>
                      <p className="text-emerald-100 mt-1 text-xs line-clamp-2">
                        {e.excerpt}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Button
                        asChild
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white button-press"
                      >
                        <Link
                          href={`/events/${e.id}`}
                          className="cursor-pointer"
                        >
                          View more
                        </Link>
                      </Button>
                    </div>
                  </article>
                </Reveal>
              ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-emerald-600 text-emerald-100 hover:bg-emerald-800/50 bg-transparent"
          >
            <Link href="/events" className="cursor-pointer">
              View All Events
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
