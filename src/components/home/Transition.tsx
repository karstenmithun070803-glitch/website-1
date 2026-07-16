import { Section } from "@/components/ui/Section";
import type { StubHomePage } from "@/lib/stubContent";

/**
 * Section 3 — "Begin a Home With Us" transition.
 * M2: static full-bleed video with display headline overlaid center-left.
 * The bottom-right "Scroll to Phase 1" CTA will render inside chrome (M2·G).
 * M4 wires copper-fill on the headline + pins the video with Sec 2.
 */
export function Transition({
  headline,
  subline,
  heroVideoPath,
  heroVideoPoster,
}: {
  headline: StubHomePage["transitionHeadline"];
  subline: StubHomePage["transitionSubline"];
  heroVideoPath: string;
  heroVideoPoster: string;
}) {
  // Headline splits on space so we can stack it in the reference's 3-line layout
  const lines = headline.split(" ").reduce<string[][]>((acc, word) => {
    // "BEGIN A HOME WITH US" → ["BEGIN", "A HOME", "WITH US"]
    if (acc.length === 0) return [[word]];
    const last = acc[acc.length - 1];
    if (last.length < 2 && acc.length < 3) {
      last.push(word);
      return acc;
    }
    return [...acc, [word]];
  }, []);

  return (
    <Section id="transition" variant="dark" minH="screen">
      <video
        src={heroVideoPath}
        poster={heroVideoPoster}
        muted
        playsInline
        autoPlay
        loop
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        aria-hidden
      />
      <div aria-hidden className="absolute inset-0 bg-modal-bg/50" />

      <div className="relative z-10 flex h-full min-h-dvh w-full items-center px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto w-full max-w-[1440px]">
          <h2 className="font-display text-[15vw] leading-[0.95] text-page md:text-[9vw] lg:text-[9rem]">
            {lines.map((line, i) => (
              <span key={i} className="block">
                {line.join(" ")}
              </span>
            ))}
          </h2>
          <p className="mt-10 max-w-md font-body text-base text-page/70 md:text-lg">
            {subline}
          </p>
        </div>
      </div>
    </Section>
  );
}
