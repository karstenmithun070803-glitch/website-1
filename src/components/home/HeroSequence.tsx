"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { StubHomePage } from "@/lib/stubContent";

/**
 * HeroSequence — pinned, scroll-scrubbed hero experience.
 *
 * Video 1 plays only as the user scrolls (`video.currentTime = p × duration`).
 * The camera literally walks forward through the hallway as they scroll.
 * Uses the SCRUB-encoded variant (short GOP) for smooth seeking.
 *
 * Text acts overlay the moving video. Each word rises into place with a
 * subtle y-translate + fade + blur — theatrical without being harsh. Words
 * are staggered so lines "breathe in" rather than snap.
 *
 * Scroll acts (across 500dvh):
 *   0.00 – 0.24  Act A · Hero copy visible; video walks forward slowly
 *   0.24 – 0.32  Hero exits (word-stagger fade+lift); dim deepens
 *   0.32 – 0.42  Act B · Manifesto reveals (word-stagger fade+rise+blur)
 *   0.42 – 0.62  DWELL — reading time; video continues walking
 *   0.62 – 0.70  Manifesto exits (word-stagger fade+lift)
 *   0.68 – 0.80  Act C · Transition reveals (word-stagger fade+rise+blur)
 *   0.80 – 1.00  DWELL — reading time; video reaches the arched window
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
        video.pause();

        const heroWords = heroAct.querySelectorAll<HTMLElement>("[data-word]");
        const manifestoWords = manifestoAct.querySelectorAll<HTMLElement>("[data-word]");
        const transitionWords = transitionAct.querySelectorAll<HTMLElement>("[data-word]");

        // Hero visible at rest (welcome state). Others fully hidden.
        gsap.set(heroWords, { y: 0, opacity: 1, filter: "blur(0px)" });
        gsap.set([...manifestoWords, ...transitionWords], {
          y: 24,
          opacity: 0,
          filter: "blur(8px)",
        });
        gsap.set([manifestoAct, transitionAct], { autoAlpha: 0 });
        gsap.set(dim, { opacity: 0.32 });

        // Master ScrollTrigger — pins + drives video currentTime
        ScrollTrigger.create({
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          pin: stage,
          onUpdate: (self) => {
            if (video.duration && Number.isFinite(video.duration)) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });

        // Text-act timeline (separate ScrollTrigger, higher scrub for
        // softer motion on text without slowing the video seek)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // Hero exits — words lift out with slight stagger + fade + blur
        tl.to(
          heroWords,
          {
            y: -18,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.08,
            stagger: 0.006,
            ease: "power2.in",
          },
          0.22,
        );

        // Dim deepens for manifesto reading
        tl.to(dim, { opacity: 0.5, duration: 0.06, ease: "none" }, 0.24);

        // Manifesto: appears + reveals word-by-word (breath, not snap)
        tl.set(manifestoAct, { autoAlpha: 1 }, 0.3);
        tl.to(
          manifestoWords,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.11,
            stagger: 0.008,
            ease: "power2.out",
          },
          0.3,
        );

        // Manifesto exits — completes at p=0.66 (0.60 + 0.06 duration + stagger tail)
        tl.to(
          manifestoWords,
          {
            y: -14,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.06,
            stagger: 0.004,
            ease: "power2.in",
          },
          0.60,
        );
        // Hide manifesto container fully once words are out (avoid ghost overlap)
        tl.set(manifestoAct, { autoAlpha: 0 }, 0.67);

        // Beat — video alone for ~1% of scroll, then Transition arrives
        tl.set(transitionAct, { autoAlpha: 1 }, 0.68);
        tl.to(
          transitionWords,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.11,
            stagger: 0.02,
            ease: "power2.out",
          },
          0.68,
        );
      }, outerRef);

      return ctx;
    };

    let ctx: gsap.Context | undefined;
    if (video.readyState >= 1) {
      ctx = setup();
    } else {
      const onMeta = () => {
        ctx = setup();
      };
      video.addEventListener("loadedmetadata", onMeta, { once: true });
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
      <div ref={stageRef} className="relative h-dvh w-full overflow-hidden bg-modal-bg">
        <video
          ref={videoRef}
          src={content.hero.heroVideoPath}
          poster={content.hero.heroVideoPoster}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
          aria-label="A slow dolly through a residential hallway toward an arched window at golden hour."
        />
        <div ref={dimRef} aria-hidden className="pointer-events-none absolute inset-0 bg-modal-bg" />

        {/* ─── Act A · Hero ────────────────────────────────── */}
        <div
          ref={heroActRef}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-12 lg:px-16"
        >
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-end gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <div>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.08em] text-page/70">
                <Words text="Scroll to explore" />
              </p>
              <h1 className="font-display leading-[0.95] text-page">
                <span className="block text-[13vw] md:text-[9vw] lg:text-[9rem]">
                  <Words text="ROOMS THAT" />
                </span>
                <span className="block text-[13vw] md:text-[9vw] lg:text-[9rem]">
                  <Words text="HOLD THE DAY." />
                </span>
              </h1>
            </div>
            <div className="pb-4 md:pb-10">
              <p className="max-w-md font-body text-base leading-relaxed text-page/85 md:text-lg">
                <Words text={content.hero.subline} />
              </p>
            </div>
          </div>
        </div>

        {/* ─── Act B · Manifesto ───────────────────────────── */}
        <div
          ref={manifestoActRef}
          className="pointer-events-none absolute inset-0 z-10 flex items-center px-6 md:px-12 lg:px-16"
        >
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 md:grid-cols-[200px_1fr] md:gap-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-page/70">
                <Words text="How we work" />
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-page/70">
                <Words text="Our process" />
              </p>
            </div>
            <div className="space-y-8 md:space-y-12 md:pr-16">
              {content.manifesto.map((para, i) => (
                <p
                  key={i}
                  className="max-w-3xl font-display text-[5.5vw] leading-[1.22] text-page md:text-[2.2rem] lg:text-[2.6rem]"
                >
                  {i === 0 && <span className="mr-2 text-copper">◆</span>}
                  <Words text={para} />
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Act C · Transition ──────────────────────────── */}
        <div
          ref={transitionActRef}
          className="pointer-events-none absolute inset-0 z-10 flex items-center px-6 md:px-12 lg:px-16"
        >
          <div className="mx-auto w-full max-w-[1440px]">
            <h2 className="font-display leading-[0.95] text-page">
              <span className="block text-[15vw] md:text-[9vw] lg:text-[9.5rem]">
                <Words text="BEGIN" />
              </span>
              <span className="block text-[15vw] md:text-[9vw] lg:text-[9.5rem]">
                <Words text="A HOME" />
              </span>
              <span className="block text-[15vw] md:text-[9vw] lg:text-[9.5rem]">
                <Words text="WITH US" />
              </span>
            </h2>
            <div className="mt-8">
              <p className="max-w-md font-body text-base text-page/70 md:text-lg">
                <Words text={content.transitionSubline} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Splits `text` into per-word spans with `data-word` for GSAP to target.
 * Preserves whitespace so wrapping behaves normally. Each word is
 * `inline-block` so transforms don't break line-height / wrapping.
 */
function Words({ text }: { text: string }) {
  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((part, i) => {
        if (/^\s+$/.test(part)) return <span key={i}>{part}</span>;
        return (
          <span
            key={i}
            data-word
            className="inline-block"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {part}
          </span>
        );
      })}
    </>
  );
}
