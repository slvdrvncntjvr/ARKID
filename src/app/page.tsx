import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { IdFinderSection } from "@/components/id-finder-section";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <IdFinderSection />
      <Footer />
    </main>
  );
}
