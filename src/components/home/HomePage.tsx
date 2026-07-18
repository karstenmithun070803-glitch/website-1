import type { StubHomePage } from "@/lib/stubContent";
import { Header } from "@/components/chrome/Header";
import { ChromeShell } from "@/components/chrome/ChromeShell";
import { IntroModal } from "./IntroModal";
import { HeroSequence } from "./HeroSequence";
import { PhaseDiorama } from "./PhaseDiorama";
import { PhaseSketch } from "./PhaseSketch";
import { PhaseBuild } from "./PhaseBuild";
import { TourIntro } from "./TourIntro";
import { VirtualTour } from "./VirtualTour";

/**
 * HomePage — composes all 11 sections + persistent chrome.
 * M2 status: Sections 0-10 real. Chrome placeholders in M2·G.
 */
export function HomePage({ content }: { content: StubHomePage }) {
  const [listen, sketch, refine, build, live] = content.phases;

  return (
    <>
      <IntroModal intro={content.intro} />
      <Header />
      <ChromeShell content={content} />

      <main>
        <HeroSequence content={content} />

        {/* Sec 4 — Phase 1: Listen (diorama) */}
        <PhaseDiorama phase={listen} scrollLength="350dvh" />

        {/* Sec 5 — Phase 2: Sketch (natural-flow two-column) */}
        <PhaseSketch phase={sketch} />

        {/* Sec 6 — Phase 3: Refine (diorama) */}
        <PhaseDiorama phase={refine} scrollLength="350dvh" videoPreload="metadata" />

        {/* Sec 7 — Phase 4: Build (horizontal cards) */}
        <PhaseBuild phase={build} />

        {/* Sec 8 — Phase 5: Live (diorama) */}
        <PhaseDiorama phase={live} scrollLength="250dvh" videoPreload="metadata" />

        {/* Sec 9 — Virtual Tour Intro */}
        <TourIntro tour={content.tour} />

        {/* Sec 10 — Virtual Tour */}
        <VirtualTour tour={content.tour} />
      </main>
    </>
  );
}