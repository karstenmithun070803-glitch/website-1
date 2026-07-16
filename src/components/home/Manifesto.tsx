import { Section } from "@/components/ui/Section";
import type { StubHomePage } from "@/lib/stubContent";

/**
 * Section 2 — Manifesto over hero film.
 * M2: full-bleed video at 100vh, text overlaid. M4 will pin the video and
 * layer the copper-fill scroll animation on each paragraph.
 */
export function Manifesto({
  manifesto,
  heroVideoPath,
  heroVideoPoster,
}: {
  manifesto: StubHomePage["manifesto"];
  heroVideoPath: string;
  heroVideoPoster: string;
}) {
  return (
    <Section id="manifesto" variant="dark" minH="screen">
      {/* Background video */}
      <video
        src={heroVideoPath}
        poster={heroVideoPoster}
        muted
        playsInline
        autoPlay
        loop
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        aria-hidden
      />
      {/* Dim overlay for text legibility */}
      <div aria-hidden className="absolute inset-0 bg-modal-bg/60" />

      {/* Text content */}
      <div className="relative z-10 flex h-full min-h-dvh w-full items-center px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-page/60">
              How we work
              <br />
              Our process
            </p>
          </div>
          <div className="space-y-10 md:space-y-14 md:pr-16">
            {manifesto.map((para, i) => (
              <p
                key={i}
                className="max-w-3xl font-display text-[7vw] leading-[1.15] text-page md:text-4xl lg:text-[2.75rem]"
              >
                {i === 0 && <span className="text-copper">◆ </span>}
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
