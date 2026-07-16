import type { StubHomePage } from "@/lib/stubContent";
import { Header } from "@/components/chrome/Header";
import { IntroModal } from "./IntroModal";
import { HeroSequence } from "./HeroSequence";

/**
 * HomePage — composes all 11 sections + persistent chrome.
 * M2 status: Sections 0-3 real; Sections 4-10 are placeholder stubs that
 * land in M2·C-F. Chrome placeholders in M2·G.
 */
export function HomePage({ content }: { content: StubHomePage }) {
  return (
    <>
      <IntroModal intro={content.intro} />
      <Header />

      <main>
        <HeroSequence content={content} />

        {/* Section placeholders — land in subsequent M2 tasks */}
        {content.phases.map((phase) => (
          <SectionPlaceholder
            key={phase.number}
            id={`phase-${phase.number}`}
            label={`Phase ${phase.number} — ${phase.name}`}
            body={phase.introBody}
          />
        ))}
        <SectionPlaceholder
          id="tour-intro"
          label="Sec 9 · Virtual Tour Intro"
          body={content.tour.introBody}
        />
        <SectionPlaceholder
          id="tour"
          label="Sec 10 · Virtual Tour"
          body="Interactive aerial + 6 rooms — lands in M2·F."
        />
      </main>
    </>
  );
}

/**
 * Placeholder for sections that haven't been built yet.
 * Keeps the scroll flow honest so we can validate the sequence before the
 * real content lands.
 */
function SectionPlaceholder({
  id,
  label,
  body,
}: {
  id: string;
  label: string;
  body: string;
}) {
  return (
    <section
      id={id}
      data-section={id}
      className="relative flex min-h-dvh w-full items-center border-t border-gray-faded/20 bg-page"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-faded">
          Coming in M2 — placeholder
        </p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-ink md:text-6xl">
          {label}
        </h2>
        <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ink/70 md:text-lg">
          {body}
        </p>
      </div>
    </section>
  );
}
