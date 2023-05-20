import { HeroSection } from "./components/pages/home/hero-section";
import { KnownTechs } from "./components/pages/home/known-techs";
import { HighlightedProjects } from "./components/pages/home/highlighted-projects";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <KnownTechs />
      <HighlightedProjects/>
    </>
  )
}
