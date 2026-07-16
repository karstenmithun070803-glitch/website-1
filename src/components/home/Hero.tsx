import { Section } from "@/components/ui/Section";
import type { StubHomePage } from "@/lib/stubContent";

/**
 * Section 1 — Hero.
 * M2: static. Headline + subline stacked; video card sits below the fold.
 * M4 will replace with the copper-fill scroll animation + Hero Video Slide-Up.
 */
export function Hero({ hero }: { hero: StubHomePage["hero"] }) {
  return (
    <Section id="hero" minH="tall" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 md:px-10">
        {/* Headline + subline row (mirrors reference: display left, body right) */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.08em] text-gray-faded">
              Scroll to explore
            </p>
            <h1 className="font-display text-[13vw] leading-[0.95] md:text-[9vw] lg:text-[8.5rem]">
              {hero.headline}
            </h1>
          </div>
          <div className="mt-6 md:mt-40">
            <p className="max-w-md font-body text-lg leading-relaxed text-ink md:text-xl">
              {hero.subline}
            </p>
          </div>
        </div>

        {/* Hero video card — sits below the fold in the flow */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-modal-bg">
          <video
            src={hero.heroVideoPath}
            poster={hero.heroVideoPoster}
            muted
            playsInline
            autoPlay
            loop
            className="h-full w-full object-cover"
            aria-label="A slow dolly through a residential hallway at golden hour."
          />
        </div>
      </div>
    </Section>
  );
}
