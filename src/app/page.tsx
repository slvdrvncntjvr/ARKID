import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { EventsSection } from "@/components/events-section";
import { WorkshopsSection } from "@/components/workshops-section";
import { TeamSection } from "@/components/team-section";
import { ContactSection } from "@/components/contact-section";
import { DevelopersSection } from "@/components/developers-section";
import { DepthTransitions } from "@/components/depth-transitions";
import { CaveBackground } from "@/components/cave-background";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main className="relative">
      {/* Cave/Mining themed background effects */}
      <CaveBackground />
      
      {/* Depth-based transitions and markers */}
      <DepthTransitions />
      
      {/* Main content */}
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <EventsSection />
      <WorkshopsSection />
      <TeamSection />
      <ContactSection />
      <DevelopersSection />
      <Footer />
    </main>
  );
}
