"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Reveal } from "./reveal"

const devs = [
  { name: "Alice Johnson", role: "Frontend Developer", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder", bio: "Passionate about UX and building accessible interfaces." },
  { name: "Mohammed Ali", role: "Backend Developer", img: "https://images.unsplash.com/photo-1531123414780-f55b1f4f6b1a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder", bio: "APIs, databases and server-side best practices." },
  { name: "Grace Lee", role: "Fullstack Developer", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder", bio: "Fullstack engineer focused on performance and DX." },
  { name: "Emeka Obi", role: "Mobile Developer", img: "https://images.unsplash.com/photo-1545996124-1c4a4f0f3a3d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder", bio: "Builds delightful cross-platform mobile apps." },
  { name: "Lina Yusuf", role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder", bio: "Design systems, accessibility and visual language." },
  { name: "David E", role: "DevOps", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder", bio: "CI/CD, infrastructure as code and reliability." },
]

const excos = [
  { name: "Chairman A", role: "Chairman", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder", bio: "Leads the committee and coordinates activities." },
  { name: "Secretary B", role: "Secretary", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder", bio: "Keeps records and manages communications." },
  { name: "Treasurer C", role: "Treasurer", img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder", bio: "Handles budgeting and financial records." },
  { name: "Publicity D", role: "Publicity Secretary", img: "https://images.unsplash.com/photo-1541534401786-0b0c3c7f1f1d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder", bio: "Manages outreach and publicity." },
  { name: "Welfare E", role: "Welfare Officer", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder", bio: "Supports member welfare and wellbeing." },
  { name: "Events F", role: "Events Coordinator", img: "https://images.unsplash.com/photo-1520975913840-8f1b2f8c0557?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder", bio: "Organizes events and logistics." },
]

export function TeamSection() {
  const [tab, setTab] = useState<"devs" | "excos">("devs")
  const [selected, setSelected] = useState<any | null>(null)

  const list = tab === "devs" ? devs : excos

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

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
              <article className="bg-emerald-900/30 border border-emerald-800 p-3 rounded-lg card-hover h-40 overflow-hidden flex flex-col">
                <div className="flex items-center gap-3">
                  <img src={m.img} alt={`${m.name} photo`} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">{m.name}</h3>
                    <p className="text-emerald-200 text-xs">{m.role}</p>
                  </div>
                </div>
                <p className="text-emerald-100 mt-2 text-xs line-clamp-2 flex-1">{m.bio}</p>
                <div className="mt-2">
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white button-press" onClick={() => setSelected(m)}>
                    View profile
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {selected ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
            <div className="relative bg-white/5 border border-emerald-800 rounded-lg p-6 w-full max-w-xl mx-4">
              <button aria-label="Close profile" className="absolute top-3 right-3 text-emerald-200" onClick={() => setSelected(null)}>
                ✕
              </button>
              <div className="flex gap-6 items-start">
                <img src={selected.img} alt={`${selected.name} photo`} className="w-28 h-28 rounded-lg object-cover" />
                <div>
                  <h3 className="text-2xl font-bold text-white">{selected.name}</h3>
                  <p className="text-emerald-200">{selected.role}</p>
                  <p className="text-emerald-100 mt-4">{selected.bio}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
