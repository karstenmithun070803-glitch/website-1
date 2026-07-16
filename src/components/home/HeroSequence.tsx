"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CopperFill } from "@/components/motion/CopperFill";
import type { StubHomePage } from "@/lib/stubContent";

/**
 * HeroSequence — consolidates Sections 1 (Hero), 2 (Manifesto), 3 (Transition)
 * into a single pinned scroll experience. The video pins once at ~30% scroll
 * progress, then text acts change above it while it stays sticky.
 *
 * Scroll acts (across a ~500vh outer container):
 *   • Act A (p 0.00 – 0.28) — Hero: display headline + subline. Video is
 *     a bordered card at the bottom of the viewport, awaiting entry.
 *   • Transition (p 0.28 – 0.42) — video card scales up + rises to fill
 *     the viewport (the "Hero Video Slide-Up"). Hero text fades out.
 *   • Act B (p 0.42 – 0.75) — Manifesto: two paragraphs appear over the
 *     now-full-bleed video, each copper-filling as its scroll region passes.
 *   • Act C (p 0.75 – 1.00) — Transition: massive "BEGIN A HOME WITH US"
 *     headline appears over the same pinned video, copper-fills.
 *
 * Under reduced-motion or on touch (no smooth-scroll), we skip pinning and
 * render a simpler static layout so nothing breaks.
 */
export function HeroSequence({ content }: { content: StubHomePage }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const dimOverlayRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const manifestoParasRef = useRef<Array<HTMLElement | null>>([]);
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
      !videoWrapRef.current ||
      !heroTextRef.current ||
      !dimOverlayRef.current ||
      !manifestoRef.current ||
      !transitionActRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // Pin the sticky stage across the entire outer container
      const scroll = {
        trigger: outerRef.current!,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      } as const;

      // ── Video card → full-bleed ────────────────────────────────
      // Card sits at bottom of viewport in Act A, then rises + scales
      gsap.set(videoWrapRef.current, {
        // Initial position: card near bottom of stage, ~70vw wide, ~40vh tall
        top: "auto",
        bottom: "6vh",
        left: "50%",
        width: "88%",
        height: "42dvh",
        borderRadius: "12px",
        xPercent: -50,
      });
      gsap.set(dimOverlayRef.current, { opacity: 0 });

      gsap.timeline({ scrollTrigger: { ...scroll, start: "top+=20% top", end: "top+=42% top" } })
        .to(videoWrapRef.current, {
          top: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: 0,
          xPercent: 0,
          ease: "power2.inOut",
        })
        .to(dimOverlayRef.current, { opacity: 0.55, ease: "power2.inOut" }, "<");

      // ── Hero text fades out as video takes over ────────────────
      gsap.timeline({ scrollTrigger: { ...scroll, start: "top+=15% top", end: "top+=32% top" } })
        .to(heroTextRef.current, {
          opacity: 0,
          y: -40,
          ease: "power2.in",
        });

      // ── Manifesto: appears + fades out at handoff to Transition ──
      gsap.set(manifestoRef.current, { opacity: 0, y: 40 });
      gsap.timeline({ scrollTrigger: { ...scroll, start: "top+=40% top", end: "top+=48% top" } })
        .to(manifestoRef.current, { opacity: 1, y: 0, ease: "power2.out" });

      gsap.timeline({ scrollTrigger: { ...scroll, start: "top+=72% top", end: "top+=80% top" } })
        .to(manifestoRef.current, { opacity: 0, y: -30, ease: "power2.in" });

      // ── Transition act: appears near the end ───────────────────
      gsap.set(transitionActRef.current, { opacity: 0, y: 40 });
      gsap.timeline({ scrollTrigger: { ...scroll, start: "top+=78% top", end: "top+=88% top" } })
        .to(transitionActRef.current, { opacity: 1, y: 0, ease: "power2.out" });

      // ── Pin the stage ──────────────────────────────────────────
      ScrollTrigger.create({
        trigger: outerRef.current!,
        start: "top top",
        end: "bottom bottom",
        pin: stageRef.current!,
        pinSpacing: false,
      });
    }, outerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={outerRef} className="relative w-full" style={{ height: "500dvh" }}>
      {/* Sticky stage — 100dvh, pinned across the whole outer container */}
      <div
        ref={stageRef}
        className="relative h-dvh w-full overflow-hidden bg-page"
      >
        {/* Video 1 — starts as a card, expands to fill */}
        <div
          ref={videoWrapRef}
          className="absolute overflow-hidden bg-modal-bg will-change-transform"
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
          {/* Dim overlay animates in once the video is full-bleed */}
          <div
            ref={dimOverlayRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-modal-bg"
          />
        </div>

        {/* ─── Act A: Hero text ────────────────────────────────── */}
        <div
          ref={heroTextRef}
          className="absolute inset-0 flex flex-col justify-start pt-24 md:pt-32"
        >
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-10">
            <div>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.08em] text-gray-faded">
                Scroll to explore
              </p>
              <h1 className="font-display text-[13vw] leading-[0.95] md:text-[9vw] lg:text-[8.5rem]">
                <CopperFill text={content.hero.headline} finalColor="var(--ink)" />
              </h1>
            </div>
            <div className="mt-4 md:mt-40">
              <p className="max-w-md font-body text-lg leading-relaxed text-ink md:text-xl">
                {content.hero.subline}
              </p>
            </div>
          </div>
        </div>

        {/* ─── Act B: Manifesto (over pinned video) ─────────────── */}
        <div
          ref={manifestoRef}
          className="absolute inset-0 z-10 flex items-center"
        >
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 md:grid-cols-[220px_1fr] md:gap-16 md:px-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-page/60">
                How we work
                <br />
                Our process
              </p>
            </div>
            <div className="space-y-10 md:space-y-14 md:pr-16">
              {content.manifesto.map((para, i) => (
                <p
                  key={i}
                  ref={(el) => {
                    manifestoParasRef.current[i] = el;
                  }}
                  className="max-w-3xl font-display text-[7vw] leading-[1.15] md:text-4xl lg:text-[2.75rem]"
                >
                  {i === 0 && <span className="mr-2 text-copper">◆</span>}
                  <CopperFill text={para} finalColor="var(--page)" />
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Act C: Transition headline (over pinned video) ────── */}
        <div
          ref={transitionActRef}
          className="absolute inset-0 z-10 flex items-center"
        >
          <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
            <h2 className="font-display text-[15vw] leading-[0.95] md:text-[9vw] lg:text-[9rem]">
              <span className="block">
                <CopperFill text="BEGIN" finalColor="var(--page)" />
              </span>
              <span className="block">
                <CopperFill text="A HOME" finalColor="var(--page)" />
              </span>
              <span className="block">
                <CopperFill text="WITH US" finalColor="var(--page)" />
              </span>
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
