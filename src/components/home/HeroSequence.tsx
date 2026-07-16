"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { StubHomePage } from "@/lib/stubContent";

/**
 * HeroSequence — the pinned scroll-scrubbed hero experience.
 *
 * Architecture:
 *   • Video 1 is FULL-BLEED from the start, not a card. The user's scroll
 *     drives `video.currentTime` — the camera literally walks forward through
 *     the hallway as they scroll. Stops when they stop. Reverses if they
 *     scroll up. This is what "feeling like entering the arch" means.
 *
 *   • Text acts overlay the moving video at specific scroll progress points.
 *     Each text line uses a mask-reveal (translate from under a `overflow: hidden`
 *     wrapper) — feels theatrical, not just a fade.
 *
 *   • Dim overlay is always present but varies opacity slightly per act so
 *     text stays readable while still letting the video breathe through.
 *
 * Scroll acts (across 500dvh outer container):
 *   0.00 – 0.05  Hero text mask-reveals from below
 *   0.05 – 0.30  DWELL — user reads hero, video walks forward slightly
 *   0.30 – 0.35  Hero text exits up + Manifesto mask-reveals
 *   0.35 – 0.65  DWELL — user reads manifesto, video continues walking
 *   0.65 – 0.70  Manifesto exits up + Transition mask-reveals
 *   0.70 – 1.00  DWELL — user reads transition, video reaches the window
 *
 * Video scrubbing: `video.currentTime = self.progress * video.duration`
 * driven by ScrollTrigger.onUpdate. Under reduced-motion, video shows its
 * poster still and text renders in place with no animation.
 */
export function HeroSequence({ content }: { content: StubHomePage }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const heroActRef = useRef<HTMLDivElement>(null);
  const manifestoActRef = useRef<HTMLDivElement>(null);
  const transitionActRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const outer = outerRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const dim = dimRef.current;
    const heroAct = heroActRef.current;
    const manifestoAct = manifestoActRef.current;
    const transitionAct = transitionActRef.current;
    if (!outer || !stage || !video || !dim || !heroAct || !manifestoAct || !transitionAct) return;

    const setup = () => {
      const ctx = gsap.context(() => {
        // Pause the video — scroll owns it now
        video.pause();

        const heroInners = heroAct.querySelectorAll<HTMLElement>("[data-mask-inner]");
        const manifestoInners = manifestoAct.querySelectorAll<HTMLElement>("[data-mask-inner]");
        const transitionInners = transitionAct.querySelectorAll<HTMLElement>("[data-mask-inner]");

        // Hero starts VISIBLE (welcome state at scroll 0). Others start below their masks.
        gsap.set(heroInners, { yPercent: 0 });
        gsap.set([...manifestoInners, ...transitionInners], { yPercent: 110 });
        gsap.set([manifestoAct, transitionAct], { autoAlpha: 0 });
        gsap.set(dim, { opacity: 0.3 });

        // Master ScrollTrigger — pins + drives the video
        ScrollTrigger.create({
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          pin: stage,
          onUpdate: (self) => {
            if (video.duration && Number.isFinite(video.duration)) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });

        // Master timeline — text-act sequencing
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
          },
          defaults: { ease: "power3.out" },
        });

        // Hero exits upward as user starts scrolling into the hallway
        tl.to(heroInners, { yPercent: -110, duration: 0.06, stagger: 0.01, ease: "power3.in" }, 0.24);
        // Dim deepens slightly as we shift into manifesto reading state
        tl.to(dim, { opacity: 0.5, duration: 0.06 }, 0.28);

        // Manifesto appears + reveals
        tl.set(manifestoAct, { autoAlpha: 1 }, 0.33);
        tl.to(manifestoInners, { yPercent: 0, duration: 0.06, stagger: 0.02 }, 0.33);

        // Manifesto exits
        tl.to(manifestoInners, { yPercent: -110, duration: 0.04, stagger: 0.008, ease: "power3.in" }, 0.65);
        tl.set(manifestoAct, { autoAlpha: 0 }, 0.7);

        // Transition appears + reveals
        tl.set(transitionAct, { autoAlpha: 1 }, 0.68);
        tl.to(transitionInners, { yPercent: 0, duration: 0.06, stagger: 0.02 }, 0.68);
      }, outerRef);

      return ctx;
    };

    // Wait for video metadata so duration is known
    let ctx: gsap.Context | undefined;
    if (video.readyState >= 1 /* HAVE_METADATA */) {
      ctx = setup();
    } else {
      const onMeta = () => {
        ctx = setup();
      };
      video.addEventListener("loadedmetadata", onMeta, { once: true });
      // Also fall back to trying setup after a short delay in case metadata never fires
      const fallback = window.setTimeout(() => {
        if (!ctx) ctx = setup();
      }, 2000);
      return () => {
        video.removeEventListener("loadedmetadata", onMeta);
        window.clearTimeout(fallback);
        ctx?.revert();
      };
    }

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={outerRef} className="relative w-full" style={{ height: "500dvh" }}>
      {/* Sticky stage — always full-bleed, video is the whole picture */}
      <div ref={stageRef} className="relative h-dvh w-full overflow-hidden bg-modal-bg">
        {/* Scroll-scrubbed video — full stage */}
        <video
          ref={videoRef}
          src={content.hero.heroVideoPath}
          poster={content.hero.heroVideoPoster}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="A slow dolly through a residential hallway toward an arched window at golden hour."
        />
        {/* Dim overlay — protects text legibility */}
        <div ref={dimRef} aria-hidden className="pointer-events-none absolute inset-0 bg-modal-bg" />

        {/* ─── Act A · Hero text ─────────────────────────────── */}
        <div
          ref={heroActRef}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-12 lg:px-16"
        >
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-end gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <div>
              <MaskLine className="mb-6 block font-mono text-[11px] uppercase tracking-[0.08em] text-page/70">
                Scroll to explore
              </MaskLine>
              <h1 className="font-display leading-[0.95] text-page">
                <MaskLine className="block text-[13vw] md:text-[9vw] lg:text-[9rem]">
                  ROOMS THAT
                </MaskLine>
                <MaskLine className="block text-[13vw] md:text-[9vw] lg:text-[9rem]">
                  HOLD THE DAY.
                </MaskLine>
              </h1>
            </div>
            <div className="pb-4 md:pb-10">
              <MaskLine className="block max-w-md font-body text-base leading-relaxed text-page/85 md:text-lg">
                {content.hero.subline}
              </MaskLine>
            </div>
          </div>
        </div>

        {/* ─── Act B · Manifesto ─────────────────────────────── */}
        <div
          ref={manifestoActRef}
          className="pointer-events-none absolute inset-0 z-10 flex items-center px-6 md:px-12 lg:px-16"
        >
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 md:grid-cols-[200px_1fr] md:gap-16">
            <div>
              <MaskLine className="block font-mono text-[11px] uppercase tracking-[0.08em] text-page/70">
                How we work
              </MaskLine>
              <MaskLine className="mt-1 block font-mono text-[11px] uppercase tracking-[0.08em] text-page/70">
                Our process
              </MaskLine>
            </div>
            <div className="space-y-8 md:space-y-12 md:pr-16">
              {content.manifesto.map((para, i) => (
                <p
                  key={i}
                  className="max-w-3xl font-display text-[5.5vw] leading-[1.2] text-page md:text-[2.2rem] lg:text-[2.6rem]"
                >
                  <MaskLine className="block">
                    {i === 0 && <span className="mr-2 text-copper">◆</span>}
                    {para}
                  </MaskLine>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Act C · Transition ────────────────────────────── */}
        <div
          ref={transitionActRef}
          className="pointer-events-none absolute inset-0 z-10 flex items-center px-6 md:px-12 lg:px-16"
        >
          <div className="mx-auto w-full max-w-[1440px]">
            <h2 className="font-display leading-[0.95] text-page">
              <MaskLine className="block text-[15vw] md:text-[9vw] lg:text-[9.5rem]">BEGIN</MaskLine>
              <MaskLine className="block text-[15vw] md:text-[9vw] lg:text-[9.5rem]">A HOME</MaskLine>
              <MaskLine className="block text-[15vw] md:text-[9vw] lg:text-[9.5rem]">WITH US</MaskLine>
            </h2>
            <div className="mt-8">
              <MaskLine className="block max-w-md font-body text-base text-page/70 md:text-lg">
                {content.transitionSubline}
              </MaskLine>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Inline mask-reveal wrapper. Each line renders inside a `overflow: hidden`
 * span; the timeline in HeroSequence animates the inner span from
 * `translateY(110%)` → `0` for a curtain-rise effect.
 */
function MaskLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`overflow-hidden ${className ?? ""}`} style={{ display: "block" }}>
      <span data-mask-inner style={{ display: "inline-block", willChange: "transform" }}>
        {children}
      </span>
    </span>
  );
}
