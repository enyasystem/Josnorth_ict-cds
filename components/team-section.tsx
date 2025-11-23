"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Reveal } from "./reveal";
import { useDevelopers, useExcos } from "@/lib/hooks/useTeam";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";
import type { TeamMember } from "@/lib/types/api";

export function TeamSection() {
  const [tab, setTab] = useState<"devs" | "excos">("devs");
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const { data: devsResponse, isLoading: devsLoading } = useDevelopers();
  const { data: execsResponse, isLoading: execsLoading } = useExcos();

  const devs = devsResponse?.data || [];
  const excos = execsResponse?.data || [];

  const list = tab === "devs" ? devs : excos;
  const isLoading = tab === "devs" ? devsLoading : execsLoading;

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Team</h2>
          <div className="flex items-center gap-3">
            <div
              role="tablist"
              aria-label="Team tabs"
              className="inline-flex rounded-md bg-emerald-900/30 p-1"
            >
              <button
                role="tab"
                aria-selected={tab === "devs"}
                onClick={() => setTab("devs")}
                className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                  tab === "devs"
                    ? "bg-emerald-500 text-white"
                    : "text-emerald-200"
                }`}
              >
                Devs
              </button>
              <button
                role="tab"
                aria-selected={tab === "excos"}
                onClick={() => setTab("excos")}
                className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                  tab === "excos"
                    ? "bg-emerald-500 text-white"
                    : "text-emerald-200"
                }`}
              >
                Excos
              </button>
            </div>

            <Button asChild variant="ghost" className="text-emerald-200">
              <Link href="/team" className="cursor-pointer">
                View all
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-40 rounded-lg bg-emerald-900/30"
                />
              ))
            : list.slice(0, 6).map((m, idx) => (
                <Reveal key={m.id} index={idx} className="animate-scale-in">
                  <article className="bg-emerald-900/30 border border-emerald-800 p-3 rounded-lg card-hover h-40 overflow-hidden flex flex-col">
                    <div className="flex items-center gap-3">
                      {m.img ? (
                        <img
                          src={m.img}
                          alt={`${m.name} photo`}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-emerald-200" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {m.name}
                        </h3>
                        <p className="text-emerald-200 text-xs">{m.role}</p>
                      </div>
                    </div>
                    <p className="text-emerald-100 mt-2 text-xs line-clamp-2 flex-1">
                      {m.bio}
                    </p>
                    <div className="mt-2">
                      <Button
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white button-press"
                        onClick={() => setSelected(m)}
                      >
                        View profile
                      </Button>
                    </div>
                  </article>
                </Reveal>
              ))}
        </div>

        {selected ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSelected(null)}
            />
            <div className="relative bg-white/5 border border-emerald-800 rounded-lg p-6 w-full max-w-xl mx-4">
              <button
                aria-label="Close profile"
                className="absolute top-3 right-3 text-emerald-200"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
              <div className="flex gap-6 items-start">
                {selected.img ? (
                  <img
                    src={selected.img}
                    alt={`${selected.name} photo`}
                    className="w-28 h-28 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-lg bg-emerald-800/50 flex items-center justify-center flex-shrink-0">
                    <User className="w-14 h-14 text-emerald-200" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selected.name}
                  </h3>
                  <p className="text-emerald-200">{selected.role}</p>
                  <p className="text-emerald-100 mt-4">{selected.bio}</p>
                  {selected.email && (
                    <p className="text-emerald-300 text-sm mt-2">
                      {selected.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
