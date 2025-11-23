"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

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
    avatar: "/professional-devops-engineer.png",
    skills: ["Docker", "Kubernetes", "CI/CD"],
  },
];

export function DevProfile() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto">
        <div
          className="text-center mb-16"
          style={{
            animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
          }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-balance">
            Development Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            Talented developers and engineers powering the NYSC Jos North
            digital platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {devTeam.map((dev, index) => (
            <Card
              key={dev.id}
              className="bg-white border-teal-200 hover:border-cyan-400 hover:shadow-lg transition-all duration-300 group"
              style={{
                animation: isVisible
                  ? `fadeInUp 0.8s ease-out ${0.1 + index * 0.1}s both`
                  : "none",
              }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <img
                    src={dev.avatar || "/placeholder.svg"}
                    alt={dev.name}
                    className="w-24 h-24 rounded-full mx-auto border-3 border-teal-300 group-hover:border-cyan-400 transition-colors"
                  />
                </div>
                <CardTitle className="text-gray-900 text-lg">
                  {dev.name}
                </CardTitle>
                <CardDescription className="text-cyan-600 font-semibold">
                  {dev.role}
                </CardDescription>
                <p className="text-gray-600 text-sm mt-2">{dev.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {dev.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <button className="p-2 text-gray-600 hover:text-cyan-600 hover:bg-cyan-100 rounded-full transition-colors cursor-pointer">
                      <Github className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-cyan-600 hover:bg-cyan-100 rounded-full transition-colors cursor-pointer">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-cyan-600 hover:bg-cyan-100 rounded-full transition-colors cursor-pointer">
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
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
