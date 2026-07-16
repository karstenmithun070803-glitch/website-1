"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { StubHomePage } from "@/lib/stubContent";

/**
 * HeroSequence — Sections 1 (Hero) + 2 (Manifesto) + 3 (Transition)
 * consolidated into one pinned scroll experience.
 *
 * Architecture: ONE master GSAP timeline scrubbed to scroll progress
 * over the outer container. All acts are positioned inside the same
 * sticky stage; the timeline switches between them.
 *
 *   Progress   State
 *   ────────   ────────────────────────────────────────────────────
 *   0.00       Act A: hero text visible, video card at bottom
 *   0.02–0.28  Video card grows to full-bleed (Hero Video Slide-Up)
 *   0.05–0.20  Hero text fades out
 *   0.20–0.30  Dim overlay fades in on video
 *   0.30–0.45  Manifesto fades in
 *   0.45–0.60  DWELL — manifesto fully visible for reading
 *   0.60–0.70  Manifesto fades out, transition fades in
 *   0.70–1.00  DWELL — transition fully visible for reading
 *
 * Fixes applied vs prior version:
 *   • Animations start at p=0.02 (no dead zone).
 *   • Video position: single-transform (scale+translate) instead of
 *     left/xPercent split — no visible jump.
 *   • pinSpacing: true (default) so the pin releases cleanly.
 *   • Explicit dwell zones so user can stop and read each act.
 *   • Outer reduced from 500dvh → 380dvh for tighter, more responsive scroll.
 */
export function HeroSequence({ content }: { content: StubHomePage }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const heroActRef = useRef<HTMLDivElement>(null);
  const manifestoActRef = useRef<HTMLDivElement>(null);
  const transitionActRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;
    if (
      !outerRef.current ||
      !stageRef.current ||
      !videoCardRef.current ||
      !dimRef.current ||
      !heroActRef.current ||
      !manifestoActRef.current ||
      !transitionActRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // ── Initial states ─────────────────────────────────────────
      //
      // Video card: use scale + translateY to size it as a "card at
      // the bottom of the viewport." Only ONE transform origin so the
      // animation doesn't split into two conflicting motions.
      gsap.set(videoCardRef.current, {
        scale: 0.82,
        y: "18vh", // pushes the (already-full-size) card downward
        transformOrigin: "50% 100%",
        borderRadius: 12,
      });
      gsap.set(dimRef.current, { opacity: 0 });
      gsap.set(heroActRef.current, { opacity: 1, y: 0 });
      gsap.set(manifestoActRef.current, { opacity: 0, y: 30 });
      gsap.set(transitionActRef.current, { opacity: 0, y: 30 });

      // ── Master timeline, scrubbed to scroll ────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current!,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: stageRef.current!,
          // pinSpacing: true is the default — leave it, so the pin
          // releases without jumping the layout.
        },
        defaults: { ease: "power2.inOut" },
      });

      // Video card grows to full-bleed (Hero Video Slide-Up).
      // Starts immediately (p 0.02) — no dead zone.
      tl.to(
        videoCardRef.current,
        { scale: 1, y: 0, borderRadius: 0, duration: 0.28 },
        0.02,
      );
      // Hero text fades out early — the video should take over the eye
      tl.to(
        heroActRef.current,
        { opacity: 0, y: -30, duration: 0.15 },
        0.05,
      );
      // Dim overlay eases in once video is nearly full-bleed
      tl.to(dimRef.current, { opacity: 0.55, duration: 0.12 }, 0.2);

      // Manifesto appears
      tl.to(
        manifestoActRef.current,
        { opacity: 1, y: 0, duration: 0.15 },
        0.32,
      );
      // …then dwells (nothing happens between 0.47 and 0.60 — reading time)
      // Manifesto fades out
      tl.to(
        manifestoActRef.current,
        { opacity: 0, y: -20, duration: 0.1 },
        0.6,
      );

      // Transition appears
      tl.to(
        transitionActRef.current,
        { opacity: 1, y: 0, duration: 0.12 },
        0.66,
      );
      // …then dwells until end of pinned scroll (0.78 → 1.0 is reading time)
    }, outerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={outerRef}
      className="relative w-full"
      style={{ height: "380dvh" }}
    >
      {/* Sticky stage — 100dvh, pinned across the outer container */}
      <div
        ref={stageRef}
        className="relative h-dvh w-full overflow-hidden bg-page"
      >
        {/* Video 1 always mounted, absolutely fills the stage.
            Scale + translateY start it looking like a bottom card. */}
        <div
          ref={videoCardRef}
          className="absolute inset-0 overflow-hidden bg-modal-bg will-change-transform"
        >
          <video
            src={content.hero.heroVideoPath}
            poster={content.hero.heroVideoPoster}
            muted
            playsInline
            autoPlay
            loop
            className="h-full w-full object-cover"
            aria-label="A slow dolly through a residential hallway at golden hour."
          />
          <div
            ref={dimRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-modal-bg"
          />
        </div>

        {/* ─── Act A · Hero text ─────────────────────────────── */}
        <div
          ref={heroActRef}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-start pt-24 md:pt-32"
        >
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-6 md:grid-cols-2 md:gap-16 md:px-10">
            <div>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.08em] text-gray-faded">
                Scroll to explore
              </p>
              <h1 className="font-display text-[13vw] leading-[0.95] text-ink md:text-[9vw] lg:text-[8.5rem]">
                {content.hero.headline}
              </h1>
            </div>
            <div className="mt-2 md:mt-40">
              <p className="max-w-md font-body text-lg leading-relaxed text-ink md:text-xl">
                {content.hero.subline}
              </p>
            </div>
          </div>
        </div>

        {/* ─── Act B · Manifesto ─────────────────────────────── */}
        <div
          ref={manifestoActRef}
          className="pointer-events-none absolute inset-0 z-20 flex items-center"
        >
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 md:grid-cols-[220px_1fr] md:gap-16 md:px-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-page/70">
                How we work
                <br />
                Our process
              </p>
            </div>
            <div className="space-y-10 md:space-y-14 md:pr-16">
              {content.manifesto.map((para, i) => (
                <p
                  key={i}
                  className="max-w-3xl font-display text-[6vw] leading-[1.18] text-page md:text-[2.4rem] lg:text-[2.75rem]"
                >
                  {i === 0 && <span className="mr-2 text-copper">◆</span>}
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Act C · Transition headline ───────────────────── */}
        <div
          ref={transitionActRef}
          className="pointer-events-none absolute inset-0 z-20 flex items-center"
        >
          <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
            <h2 className="font-display text-[15vw] leading-[0.95] text-page md:text-[9vw] lg:text-[9rem]">
              <span className="block">BEGIN</span>
              <span className="block">A HOME</span>
              <span className="block">WITH US</span>
            </h2>
            <p className="mt-10 max-w-md font-body text-base text-page/70 md:text-lg">
              {content.transitionSubline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
