"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { StubPhase } from "@/lib/stubContent";
import { track } from "@/lib/analytics";

/**
 * PhaseBuild — Phase 4 "Build".
 *
 * Matches the reference video exactly:
 *  • A single PINNED horizontal-scroll stage. Vertical scroll drives
 *    horizontal translation of a strip:
 *      [intro panel] [opening image] [card 01] … [card 05] [trailer]
 *  • Because the intro panel is INSIDE the strip, the intro slides left
 *    into view of the opening image the way the reference does — no
 *    discrete jump between intro-scroll and pin-activation.
 *  • Per-card spotlight brightens the card closest to viewport horizontal
 *    center; other cards fade toward invisible. Number chip lights copper
 *    when active; heading Copper-Fills as it hits the spotlight zone.
 *
 * The section overlaps Phase 3 slightly at its top via z-index so the
 * cream card visually slides over the dark diorama below on entry.
 */
export function PhaseBuild({ phase }: { phase: StubPhase }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const introHeadlineRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardHeadingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const cards = phase.cards || [];
  const openingImage = phase.backgroundVideoPoster;

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const outer = outerRef.current;
    const stage = stageRef.current;
    const strip = stripRef.current;
    const introHeadline = introHeadlineRef.current;
    if (!outer || !stage || !strip || !introHeadline) return;

    const cardEls = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cardEls.length === 0) return;

    const ctx = gsap.context(() => {
      // ── Copper Fill helper ─────────────────────────────────────
      const setupCopperFill = (heading: HTMLElement) => {
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
        return chars;
      };

      const runCopperFill = (chars: HTMLSpanElement[]) => {
        const perChar = 0.055;
        const tl = gsap.timeline();
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

      const introChars = setupCopperFill(introHeadline);
      const cardCharsList = cardHeadingRefs.current
        .filter(Boolean)
        .map((h) => setupCopperFill(h!));

      if (prefersReduced) {
        [introChars, ...cardCharsList].forEach((cs) => {
          cs.forEach((c) => {
            c.style.color = "var(--ink)";
            c.style.opacity = "1";
          });
        });
        cardEls.forEach((el) => (el.style.opacity = "1"));
        chipRefs.current.forEach((chip) => {
          if (chip) {
            chip.style.backgroundColor = "var(--copper)";
            chip.style.color = "var(--modal-bg)";
          }
        });
        return;
      }

      // Cards start faded — spotlight lifts each as it hits center.
      cardEls.forEach((el) => (el.style.opacity = "0.15"));

      let introFilled = false;
      const runIntroFillOnce = () => {
        if (introFilled) return;
        introFilled = true;
        runCopperFill(introChars);
      };

      // Spotlight: peaks when card's horizontal center is at viewport
      // center. Also lights the number chip and Copper-Fills the heading.
      const updateSpotlight = () => {
        const vw = window.innerWidth;
        const center = vw / 2;

        // Fire the intro Copper Fill as soon as the intro panel is at
        // (or past) the horizontal center — matches reference behaviour.
        const introRect = introHeadline.getBoundingClientRect();
        if (
          !introFilled &&
          introRect.left < center &&
          introRect.right > 0
        ) {
          runIntroFillOnce();
        }

        cardEls.forEach((el, i) => {
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.abs(cardCenter - center);
          const norm = Math.min(1, dist / (rect.width || 1));
          const t = Math.max(0, (norm - 0.15) / 0.85);
          el.style.opacity = String(1 - t * 0.92);

          const chip = chipRefs.current[i];
          if (chip) {
            const active = norm < 0.4;
            chip.style.backgroundColor = active
              ? "var(--copper)"
              : "rgba(184, 115, 51, 0.15)";
            chip.style.color = active ? "var(--modal-bg)" : "var(--copper)";
          }

          if (norm < 0.3 && !el.dataset.filled) {
            el.dataset.filled = "1";
            const chars = cardCharsList[i];
            if (chars) runCopperFill(chars);
          }
        });
      };

      // ── Horizontal-scroll pin ─────────────────────────────────
      // Use function-form for x and end so ScrollTrigger recomputes on
      // refresh — critical because strip.scrollWidth is only reliable
      // once panel widths and images have laid out. invalidateOnRefresh
      // triggers a fresh measurement on every window resize / layout.
      const getDistance = () =>
        Math.max(0, strip.scrollWidth - window.innerWidth);

      gsap.to(strip, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: updateSpotlight,
          onRefresh: updateSpotlight,
        },
      });

      // Also refresh once after images arrive — accounts for any late
      // layout shifts that would otherwise leave the pin with a stale
      // scroll length.
      const images = Array.from(strip.querySelectorAll("img"));
      const pending = images.filter((img) => !img.complete);
      pending.forEach((img) => {
        const on = () => ScrollTrigger.refresh();
        img.addEventListener("load", on, { once: true });
        img.addEventListener("error", on, { once: true });
      });
    }, outerRef);

    return () => ctx.revert();
  }, [phase]);

  useEffect(() => {
    const el = outerRef.current;
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
      ref={outerRef}
      className="relative z-[2] w-full bg-page"
    >
      {/* ── Pinned horizontal-scroll stage ───────────────────────── */}
      <div ref={stageRef} className="relative h-dvh w-full overflow-hidden">
        <div
          ref={stripRef}
          className="flex h-full items-stretch will-change-transform"
        >
          {/* Intro panel — full viewport, first item in the strip so it
              slides LEFT into the opening image as the horizontal scroll
              begins (matches reference's curtain-like transition). */}
          <div className="relative flex h-full w-screen shrink-0 items-center px-6 md:px-10 lg:px-16">
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

          {/* Opening image — full viewport width */}
          {openingImage && (
            <div className="relative h-full w-screen shrink-0 overflow-hidden">
              <img
                src={openingImage}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          )}

          {/* Card panels */}
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`relative flex h-full w-[80vw] shrink-0 flex-col justify-center px-8 md:w-[45vw] md:px-12 lg:w-[38vw] lg:px-16 ${
                i > 0 ? "border-l border-ink/10" : ""
              }`}
            >
              <span
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                className="mb-6 flex h-10 w-10 items-center justify-center rounded-full font-mono text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: "rgba(184, 115, 51, 0.15)",
                  color: "var(--copper)",
                }}
              >
                {card.number}
              </span>
              <h3
                ref={(el) => {
                  cardHeadingRefs.current[i] = el;
                }}
                className="mb-6 font-display text-[2rem] leading-[1.1] text-ink md:text-[2.2rem] lg:text-[2.5rem]"
              >
                {card.heading}
              </h3>
              <p className="max-w-md font-body text-[15px] leading-relaxed text-ink/70 md:text-base">
                {card.body}
              </p>
            </div>
          ))}

          {/* Trailing spacer so the last card reaches viewport center */}
          <div className="h-full w-[30vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}
