"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { StubHomePage } from "@/lib/stubContent";

export function TourIntro({ tour }: { tour: StubHomePage["tour"] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const outer = outerRef.current;
    const stage = stageRef.current;
    const headline = headlineRef.current;
    const chip = chipRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    if (!outer || !stage || !headline || !chip || !body || !cta) return;

    // Pause ambient video for reduced motion
    if (prefersReduced && videoRef.current) {
      videoRef.current.pause();
    }

    const ctx = gsap.context(() => {
      // Copper Fill: wrap each character
      const headlineText = headline.textContent || "";
      headline.innerHTML = "";
      const chars: HTMLSpanElement[] = [];
      for (const char of headlineText) {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.color = "var(--gray-faded)";
        span.style.opacity = "0.3";
        span.style.transition = "none";
        headline.appendChild(span);
        chars.push(span);
      }

      gsap.set(chip, { autoAlpha: 0, y: 10 });
      gsap.set(body, { autoAlpha: 0, y: 16 });
      gsap.set(cta, { autoAlpha: 0, y: 12 });

      if (prefersReduced) {
        chars.forEach((s) => {
          s.style.color = "var(--ink)";
          s.style.opacity = "1";
        });
        gsap.set([chip, body, cta], { autoAlpha: 1, y: 0 });
        return;
      }

      ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Chip fades in early
      tl.to(chip, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.02);

      // Copper Fill across first 60% of scroll
      const fillDuration = 0.55;
      chars.forEach((span, i) => {
        const charOffset = 0.05 + (i / chars.length) * fillDuration;
        const charDur = fillDuration / chars.length + 0.02;
        tl.to(
          span,
          { color: "var(--copper)", opacity: 1, duration: charDur * 0.4, ease: "none" },
          charOffset,
        );
        tl.to(
          span,
          { color: "var(--ink)", duration: charDur * 0.6, ease: "none" },
          charOffset + charDur * 0.4,
        );
      });

      // Body fades in at ~40%
      tl.to(body, { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, 0.35);

      // CTA fades in at ~55%
      tl.to(cta, { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.55);
    }, outerRef);

    return () => ctx.revert();
  }, [tour]);

  return (
    <section
      id="tour-intro"
      data-section="tour-intro"
      ref={outerRef}
      className="relative w-full"
      style={{ height: "120dvh" }}
    >
      <div
        ref={stageRef}
        className="relative flex h-dvh w-full items-center justify-center overflow-hidden"
      >
        {/* Ambient video background */}
        {tour.introVideoPath && (
          <video
            ref={videoRef}
            src={tour.introVideoPath}
            muted
            autoPlay
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Cream overlay — dims the video so text reads clearly */}
        <div
          aria-hidden
          className="absolute inset-0 bg-page/[0.88]"
        />

        <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
          {/* Chip */}
          <span
            ref={chipRef}
            className="mb-6 inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-copper"
          >
            {tour.introChip}
          </span>

          {/* Headline */}
          <h2
            ref={headlineRef}
            className="mb-10 font-display text-[13vw] uppercase leading-[0.92] text-ink md:text-[9vw] lg:text-[8.5rem]"
          >
            {tour.introHeadline}
          </h2>

          {/* Bottom row: body left, CTA right */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p
              ref={bodyRef}
              className="max-w-lg font-body text-base leading-relaxed text-ink/70 md:text-lg"
            >
              {tour.introBody}
            </p>

            <div ref={ctaRef}>
              <span className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 font-body text-sm font-medium text-modal-bg transition-colors hover:bg-sage/90">
                Scroll to enter
                <span aria-hidden className="text-xs">↓</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
