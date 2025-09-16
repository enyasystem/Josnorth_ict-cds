import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { FileText, Package, Download } from "lucide-react"

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Guides",
      description: "Registration and mobilisation guides",
      icon: FileText,
    },
    {
      title: "Event Kits",
      description: "Materials for running events",
      icon: Package,
    },
    {
      title: "Forms",
      description: "Downloadable forms and templates",
      icon: Download,
    },
  ]

  return (
    <PageLayout>
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Resources</h1>
          <p className="text-xl text-emerald-100 mb-16 max-w-2xl mx-auto">
            Browse available resources and documentation curated for corps members.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {resourceCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <div
                  key={index}
                  className="bg-emerald-800/30 backdrop-blur-sm rounded-lg p-8 border border-emerald-700/30 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-emerald-200">{category.description}</p>
                </div>
              )
            })}
          </div>

          <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3">View more resources</Button>
        </div>
      </div>
    </PageLayout>
  )
}
