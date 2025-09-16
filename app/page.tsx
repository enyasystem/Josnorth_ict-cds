import { HeroSection } from "@/components/hero-section"
import { PageLayout } from "@/components/page-layout"
import { FeaturesSection } from "@/components/features-section"
import { EventsSection } from "@/components/events-section"
import { ResourcesSection } from "@/components/resources-section"
import { TeamSection } from "@/components/team-section"

export default function HomePage() {
  return (
    <PageLayout>
    <HeroSection />
    <FeaturesSection />
    <EventsSection />
    <ResourcesSection />
    <TeamSection />
    </PageLayout>
  )
}
