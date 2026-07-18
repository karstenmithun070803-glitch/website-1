"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { StubPhase } from "@/lib/stubContent";
import { track } from "@/lib/analytics";

const ENTRY_GLYPHS = ["✏", "📄", "◆", "◻", "📐", "🪑"];

/**
 * PhaseSketch — matches the reference site's Phase 2 exactly:
 * natural-flow two-column layout (no pin, no scroll-scrub, no curtain
 * wipes between entries). Each entry is a normal grid row with an icon +
 * heading + body on one side and its photograph on the other. The
 * left/right layout flips at the midpoint of the entry list — a visual
 * punctuation between the first and second halves.
 *
 * The cream background of this section naturally covers the previous
 * phase's diorama as the user scrolls into it (no explicit curtain JS —
 * just page flow + a solid `bg-page` color).
 *
 * Copper Fill runs per-entry (and once on the intro) as each heading
 * enters the viewport — light, local work spread across the whole
 * section's scroll rather than concentrated at the intro.
 */
export function PhaseSketch({ phase }: { phase: StubPhase }) {
  const rootRef = useRef<HTMLElement>(null);
  const introHeadlineRef = useRef<HTMLHeadingElement>(null);
  const entryHeadingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const entries = phase.subScenes;
  const flipAt = Math.ceil(entries.length / 2);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const root = rootRef.current;
    const introHeadline = introHeadlineRef.current;
    if (!root || !introHeadline) return;

    const ctx = gsap.context(() => {
      // Wrap each character in a span so we can drive the Copper Fill.
      // Returns the char array and the ScrollTrigger start hint.
      const setupCopperFill = (
        heading: HTMLElement,
        startAt: string,
      ) => {
        const text = heading.textContent || "";
        heading.innerHTML = "";
        const chars: HTMLSpanElement[] = [];
        for (const char of text) {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.color = "var(--gray-faded)";
          span.style.opacity = "0.4";
          span.style.transition = "none";
          span.style.willChange = "color, opacity";
          heading.appendChild(span);
          chars.push(span);
        }

        if (prefersReduced) {
          chars.forEach((c) => {
            c.style.color = "var(--ink)";
            c.style.opacity = "1";
          });
          return;
        }

        // One-shot fill when heading enters viewport. Not scrubbed —
        // plays at its own comfortable speed so the sweep reads clearly.
        const perChar = 0.055;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: startAt,
            once: true,
          },
        });
        tl.to(
          chars,
          {
            color: "var(--copper)",
            opacity: 1,
            duration: perChar * 1.3,
            ease: "none",
            stagger: { each: perChar, from: "start" },
          },
          0,
        );
        tl.to(
          chars,
          {
            color: "var(--ink)",
            duration: perChar * 1.6,
            ease: "none",
            stagger: { each: perChar, from: "start" },
          },
          perChar * 0.5,
        );
      };

      // Intro fires early — big display headline dominates first viewport.
      setupCopperFill(introHeadline, "top 70%");

      // Per-entry headings fire when they cross 75% of viewport.
      entryHeadingRefs.current.forEach((h) => {
        if (h) setupCopperFill(h, "top 75%");
      });

      // Spotlight opacity + subtle image parallax per row.
      // Whole row fades 0.15 → 1 → 0.15 as it travels through the viewport
      // (peak brightness at center). Image drifts ±8% inside its container
      // for a subtle parallax that reinforces the "grid wipes image" feel.
      if (!prefersReduced) {
        rowRefs.current.forEach((row) => {
          if (!row) return;
          gsap.set(row, { opacity: 0.03 });
          gsap
            .timeline({
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.4,
              },
            })
            .to(row, { opacity: 1, ease: "sine.inOut", duration: 0.5 }, 0)
            .to(row, { opacity: 0.03, ease: "sine.inOut", duration: 0.5 }, 0.5);
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [phase]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          track("phase_reached", { phase_name: phase.name });
          ob.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [phase.name]);

  return (
    <section
      id={`phase-${phase.number}`}
      data-section={`phase-${phase.number}`}
      ref={rootRef}
      className="relative z-[2] w-full bg-page"
    >
      {/* ── Intro band — full viewport, scrolls with page ─────────── */}
      <div className="flex min-h-dvh w-full items-center px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 md:grid-cols-[1.6fr_1fr] md:gap-16 md:items-end">
          <div>
            <p className="mb-6 inline-block rounded-full border border-ink/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink/60">
              Phase {phase.number}
            </p>
            <h2
              ref={introHeadlineRef}
              className="font-display text-[18vw] uppercase leading-[0.9] text-ink md:text-[10vw] lg:text-[8.5rem]"
            >
              {phase.name}
            </h2>
          </div>
          <p className="max-w-md font-body text-base leading-relaxed text-ink/70 md:text-lg md:pb-4">
            {phase.introBody}
          </p>
        </div>
      </div>

      {/* ── Entries — natural-flow grid rows, 3 image-right then 3 image-left ─ */}
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        {entries.map((entry, i) => {
          const isFlipped = i >= flipAt;
          const image = entry.hotspots[0]?.cardImagePath;
          const label = entry.hotspots[0]?.label ?? entry.stepLabel;

          const TextBlock = (
            <div className="flex flex-col justify-center">
              <div className="flex items-start gap-5">
                <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-copper/10 text-xl text-copper">
                  {ENTRY_GLYPHS[i] || "◆"}
                </span>
                <div>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                    {entry.stepLabel}
                  </p>
                  <h3
                    ref={(el) => {
                      entryHeadingRefs.current[i] = el;
                    }}
                    className="mb-4 font-display text-3xl leading-tight text-ink md:text-4xl lg:text-[2.5rem]"
                  >
                    {label}
                  </h3>
                  <p className="max-w-md font-body text-base leading-relaxed text-ink/70">
                    {entry.stepDescription}
                  </p>
                </div>
              </div>
            </div>
          );

          const ImageBlock = (
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-modal-bg/10 md:aspect-[3/4]">
              {image && (
                <img
                  ref={(el) => {
                    imageRefs.current[i] = el;
                  }}
                  src={image}
                  alt=""
                  className="absolute -inset-y-[30%] h-[160%] w-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
          );

          return (
            <div
              key={i}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="grid grid-cols-1 gap-10 py-6 md:grid-cols-2 md:gap-16 md:py-8 lg:gap-24"
            >
              {isFlipped ? (
                <>
                  {ImageBlock}
                  {TextBlock}
                </>
              ) : (
                <>
                  {TextBlock}
                  {ImageBlock}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* ── End-of-phase card — full width, own scroll region ─────── */}
      {phase.endOfPhaseCard && (
        <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <h3 className="font-display text-3xl leading-tight text-ink md:text-[3rem] lg:text-[3.5rem]">
              {phase.endOfPhaseCard.heading}
            </h3>
            <div>
              <p className="mb-8 max-w-md font-body text-base leading-relaxed text-ink/70 md:text-lg">
                {phase.endOfPhaseCard.body}
              </p>
              <button className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 font-body text-sm font-medium text-modal-bg transition-colors hover:bg-sage/90">
                {phase.endOfPhaseCard.ctaLabel}
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
