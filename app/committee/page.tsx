import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"

export default function CommitteePage() {
  const members = [
    {
      name: "Tunde",
      position: "Chairperson",
      initials: "TU",
    },
    {
      name: "Ruth",
      position: "Secretary",
      initials: "RU",
    },
    {
      name: "Bala",
      position: "Treasurer",
      initials: "BA",
    },
  ]

  return (
    <PageLayout>
      <div className="px-6 py-16 bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Executive Committee</h1>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
            Meet the branch executive committee members leading events and outreach.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {members.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-teal-200 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-teal-300 transition-colors">
                  <span className="text-3xl font-bold text-teal-800">{member.initials}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>

          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3">View full committee</Button>
        </div>
      </div>
    </PageLayout>
  )
}
