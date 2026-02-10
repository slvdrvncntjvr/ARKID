import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { MissionVisionSection } from "@/components/mission-vision";
import { HeroesSection } from "@/components/heroes";
import { ProjectsSection } from "@/components/projects-section";
import { IdFinderSection } from "@/components/id-finder-section";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MissionVisionSection />
      <HeroesSection />
      <ProjectsSection />
      <IdFinderSection />
      <Footer />
    </main>
  );
}