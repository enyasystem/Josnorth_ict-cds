"use client";

import { PageLayout } from "@/components/page-layout";
import dynamic from "next/dynamic";
const FloatingNav = dynamic(() => import("@/components/floating-nav"), {
  ssr: false,
});
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Download,
  BookOpen,
  Package,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useResources } from "@/lib/hooks/useResources";
import { Skeleton } from "@/components/ui/skeleton";
import type { Resource } from "@/lib/types/api";

export default function ResourcesPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { data: resourcesResp, isLoading: resourcesLoading } = useResources({
    limit: 12,
  });
  const resources: Resource[] = resourcesResp?.data ?? [];

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "document":
        return <FileText className="h-6 w-6 text-green-600" />;
      case "video":
        return <BookOpen className="h-6 w-6 text-green-600" />;
      case "tool":
        return <Package className="h-6 w-6 text-green-600" />;
      default:
        return <FileText className="h-6 w-6 text-green-600" />;
    }
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case "document":
        return "Document";
      case "video":
        return "Video";
      case "link":
        return "Link";
      case "tool":
        return "Tool";
      default:
        return "Resource";
    }
  };

  return (
    <PageLayout showHeader={false}>
      <FloatingNav />
      <div className="pt-28 px-6 py-8 bg-green-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
            style={{
              animation: isVisible ? "fadeInUp 0.8s ease-out" : "none",
            }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-green-800 mb-6 text-balance">
              Resources
            </h1>
            <p className="text-xl text-green-600 mb-8 max-w-3xl mx-auto text-pretty">
              Access comprehensive guides, forms, and documentation curated
              specifically for NYSC Jos North corps members.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {resourcesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))
            ) : resources.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">
                No resources available right now.
              </p>
            ) : (
              resources.map((resource, index) => {
                const href = resource.fileUrl || resource.url || "";
                const isExternal = href.startsWith("http");
                const categoryLabel = getCategoryLabel(resource.category);

                return (
                  <Card
                    key={resource.id}
                    className="bg-white border-2 border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg group overflow-hidden transform hover:scale-105"
                    style={{
                      animation: isVisible
                        ? `fadeInUp 0.8s ease-out ${0.1 + index * 0.08}s both`
                        : "none",
                    }}
                  >
                    <div className="h-1 bg-gradient-to-r from-green-400 via-green-600 to-green-500" />
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-3 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-lg group-hover:from-cyan-200 group-hover:to-teal-200 transition-all">
                          {getCategoryIcon(resource.category)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-teal-100 text-teal-700">
                            {categoryLabel}
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
                        <div className="flex items-center justify-between text-green-700 text-sm">
                          <span className="font-semibold">{categoryLabel}</span>
                          {resource.createdAt && (
                            <span className="text-green-500 text-xs">
                              {new Date(
                                resource.createdAt
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-green-700 text-sm">
                          <div className="flex items-center gap-1 font-medium">
                            <Download className="h-4 w-4 text-green-600" />
                            <span>{href ? "Available" : "Not available"}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-500 text-white transition-all duration-300 group-hover:shadow transform hover:scale-105 font-semibold"
                        size="sm"
                        disabled={!href}
                        asChild={!!href}
                      >
                        {href ? (
                          <a
                            href={href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                          >
                            Download
                            <ArrowRight className="h-4 w-4 ml-2 inline-block" />
                          </a>
                        ) : (
                          <span>No file available</span>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
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
  );
}
