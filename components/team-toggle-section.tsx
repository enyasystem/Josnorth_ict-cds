"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

const execMembers = [
  {
    id: 1,
    name: "Chioma Adeyemi",
    role: "Coordinator",
    description: "Leading NYSC Jos North CDS initiatives",
    avatar: "/professional-woman-coordinator.jpg",
  },
  {
    id: 2,
    name: "Tunde Okafor",
    role: "Vice Coordinator",
    description: "Supporting community programs",
    avatar: "/professional-man-vice-coordinator.jpg",
  },
  {
    id: 3,
    name: "Zainab Hassan",
    role: "Secretary",
    description: "Managing communications and records",
    avatar: "/professional-woman-secretary.jpg",
  },
  {
    id: 4,
    name: "David Okoro",
    role: "Treasurer",
    description: "Overseeing financial management",
    avatar: "/professional-man-treasurer.jpg",
  },
];

const devTeam = [
  {
    id: 1,
    name: "Amara Nwosu",
    role: "Full Stack Developer",
    description: "Building scalable web solutions",
    avatar: "/professional-woman-developer.png",
    skills: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: 2,
    name: "Chukwu Eze",
    role: "Frontend Developer",
    description: "Creating beautiful user interfaces",
    avatar: "/professional-frontend-developer.png",
    skills: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: 3,
    name: "Fatima Abdullahi",
    role: "Backend Developer",
    description: "Designing robust APIs and databases",
    avatar: "/professional-woman-backend-developer.png",
    skills: ["Node.js", "MongoDB", "AWS"],
  },
  {
    id: 4,
    name: "Seun Adebayo",
    role: "DevOps Engineer",
    description: "Ensuring smooth deployments",
    avatar: "/professional-devops-engineer.jpg",
    skills: ["Docker", "Kubernetes", "CI/CD"],
  },
];

export function TeamToggleSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"excos" | "dev">("excos");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const members = activeTab === "excos" ? execMembers : devTeam;

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
          }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Meet the dedicated leaders and developers powering NYSC Jos North
            CDS
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveTab("excos")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer ${
              activeTab === "excos"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
            style={{
              animation: isVisible
                ? "fadeInUp 0.8s ease-out 0.1s both"
                : "none",
            }}
          >
            Executive Council
          </button>
          <button
            onClick={() => setActiveTab("dev")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer ${
              activeTab === "dev"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
            style={{
              animation: isVisible
                ? "fadeInUp 0.8s ease-out 0.15s both"
                : "none",
            }}
          >
            Development Team
          </button>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <Card
              key={member.id}
              className="bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group overflow-hidden"
              style={{
                animation: isVisible
                  ? `fadeInUp 0.8s ease-out ${0.2 + index * 0.1}s both`
                  : "none",
              }}
            >
              <div className="h-1 bg-gradient-to-r from-primary to-accent" />
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 relative">
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-secondary group-hover:border-primary transition-all"
                  />
                </div>
                <CardTitle className="text-foreground text-lg">
                  {member.name}
                </CardTitle>
                <CardDescription className="text-primary font-semibold">
                  {member.role}
                </CardDescription>
                <p className="text-muted-foreground text-sm mt-2">
                  {member.description}
                </p>
              </CardHeader>
              <CardContent>
                {activeTab === "dev" && "skills" in member && (
                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {(() => {
                      const skills = (member as any).skills as
                        | string[]
                        | undefined;
                      if (!Array.isArray(skills)) return null;
                      return skills.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-xs bg-secondary text-primary px-2 py-1 rounded-full font-medium"
                        >
                          {skill}
                        </span>
                      ));
                    })()}
                  </div>
                )}
                <div className="flex justify-center gap-3">
                  <button className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-full transition-all transform hover:scale-110 cursor-pointer">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-full transition-all transform hover:scale-110 cursor-pointer">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.659 1.191-1.599 2.896-1.599 2.117 0 3.704 1.385 3.704 4.362v5.519zM5.337 9.432c-1.144 0-1.915-.758-1.915-1.707 0-.955.771-1.71 1.958-1.71 1.187 0 1.914.757 1.938 1.71 0 .949-.751 1.707-1.981 1.707zm1.581 11.02H3.715V9.806h3.203v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-full transition-all transform hover:scale-110 cursor-pointer">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
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
