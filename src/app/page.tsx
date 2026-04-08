import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { MissionVisionSection } from "@/components/mission-vision";
import { HeroesSection } from "@/components/heroes";
import { ProjectsSection } from "@/components/projects-section";
import { GamesSection } from "@/components/games-section";
import { IdFinderSection } from "@/components/id-finder-section";
import { Footer } from "@/components/footer";
import { GlobalEmbers } from "@/components/global-embers";
import { waitForLoadingWindow } from "@/lib/loading-delay";

export default async function Page() {
  await waitForLoadingWindow();

  return (
    <main className="relative">
      {/* Unified background textures — shared across all sections */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Diagonal hatching — parchment/tome texture */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              hsl(42 70% 55% / 0.02) 0px,
              hsl(42 70% 55% / 0.02) 1px,
              transparent 1px,
              transparent 60px
            )`,
          }}
        />

        {/* Warm radial glow anchored at the bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 40% at 50% 100%, hsl(42 60% 20% / 0.10), transparent 70%)",
          }}
        />

        {/* Subtle top-down vignette for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, transparent 40%, hsl(180 30% 6% / 0.3) 100%)",
          }}
        />
      </div>

      {/* Global rising embers — behind content, above background */}
      <GlobalEmbers />

      {/* Page content — above all background layers */}
      <div className="relative" style={{ zIndex: 15 }}>
        <Navigation />
        <HeroSection />
        <AboutSection />
        <MissionVisionSection />
        <HeroesSection />
        <ProjectsSection />
        <GamesSection />
        <IdFinderSection />
        <Footer />
      </div>
    </main>
  );
}
