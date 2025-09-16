"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Reveal } from "./reveal"

const devs = [
  { name: "Alice Johnson", role: "Frontend Developer" },
  { name: "Mohammed Ali", role: "Backend Developer" },
  { name: "Grace Lee", role: "Fullstack Developer" },
  { name: "Emeka Obi", role: "Mobile Developer" },
  { name: "Lina Yusuf", role: "UI/UX Designer" },
  { name: "David E", role: "DevOps" },
]

const excos = [
  { name: "Chairman A", role: "Chairman" },
  { name: "Secretary B", role: "Secretary" },
  { name: "Treasurer C", role: "Treasurer" },
  { name: "Publicity D", role: "Publicity Secretary" },
  { name: "Welfare E", role: "Welfare Officer" },
  { name: "Events F", role: "Events Coordinator" },
]

export function TeamSection() {
  const [tab, setTab] = useState<"devs" | "excos">("devs")

  const list = tab === "devs" ? devs : excos

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Team</h2>
          <div className="flex items-center gap-3">
            <div role="tablist" aria-label="Team tabs" className="inline-flex rounded-md bg-emerald-900/30 p-1">
              <button
                role="tab"
                aria-selected={tab === "devs"}
                onClick={() => setTab("devs")}
                className={`px-3 py-1 rounded-md text-sm ${tab === "devs" ? "bg-emerald-500 text-white" : "text-emerald-200"}`}
              >
                Devs
              </button>
              <button
                role="tab"
                aria-selected={tab === "excos"}
                onClick={() => setTab("excos")}
                className={`px-3 py-1 rounded-md text-sm ${tab === "excos" ? "bg-emerald-500 text-white" : "text-emerald-200"}`}
              >
                Excos
              </button>
            </div>

            <Button asChild variant="ghost" className="text-emerald-200">
              <Link href="/team">View all</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((m, idx) => (
            <Reveal key={idx} index={idx} className="animate-scale-in">
              <article className="bg-emerald-900/30 border border-emerald-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                <p className="text-emerald-200 mt-1">{m.role}</p>
                <div className="mt-4">
                  <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    <Link href="/team">View more</Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
