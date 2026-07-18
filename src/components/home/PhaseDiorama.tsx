"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { StubPhase } from "@/lib/stubContent";
import { track } from "@/lib/analytics";

/**
 * PhaseDiorama — pinned scroll-story section used by Listen (4), Refine (6),
 * and Live (8). Scroll scrubs the background video while text acts and
 * hotspot overlays reveal in sequence.
 *
 * Sub-scenes:
 *   0  Phase intro — headline with Copper Fill + body text
 *   1+ Hotspot scenes — step label, description, floating hotspot pills
 */
export function PhaseDiorama({
  phase,
  scrollLength = "350dvh",
  videoPreload = "auto",
}: {
  phase: StubPhase;
  scrollLength?: string;
  videoPreload?: "auto" | "metadata" | "none";
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subSceneRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile tap-to-open: "sceneIndex-hotspotIndex" or null
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const dismissHotspot = useCallback(() => setActiveHotspot(null), []);
  const handleHotspotToggle = useCallback(
    (id: string | null, hotspotName?: string) => {
      setActiveHotspot(id);
      if (id && hotspotName) {
        track("hotspot_opened", { hotspot_name: hotspotName, phase_name: phase.name });
      }
    },
    [phase.name],
  );

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const outer = outerRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const dim = dimRef.current;
    const intro = introRef.current;
    const headline = headlineRef.current;
    if (!outer || !stage || !video || !dim || !intro || !headline) return;

    const subSceneEls = subSceneRefs.current.filter(Boolean) as HTMLDivElement[];
    const totalSubScenes = phase.subScenes.length;

    const setup = () => {
      const ctx = gsap.context(() => {
        video.pause();
        // Seek to a mid-frame so first paint shows interesting motion,
        // not the static frame 0. Also force decode of that frame by
        // touching play/pause — browsers otherwise defer decode until the
        // element is on-screen, which causes jank on first-scroll into a
        // pinned diorama (especially Phase 1, right after HeroSequence's
        // heavy video-scrub).
        if (video.duration && Number.isFinite(video.duration)) {
          video.currentTime = video.duration * 0.15;
          video
            .play()
            .then(() => video.pause())
            .catch(() => {});
        }

        // Copper Fill: wrap each character in a span for color interpolation
        const headlineText = headline.textContent || "";
        headline.innerHTML = "";
        const chars: HTMLSpanElement[] = [];
        for (const char of headlineText) {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.color = "var(--gray-faded)";
          span.style.opacity = "0.45";
          span.style.transition = "none";
          span.style.willChange = "color, opacity";
          span.style.transform = "translateZ(0)";
          headline.appendChild(span);
          chars.push(span);
        }

        // Hide sub-scenes initially
        subSceneEls.forEach((el) => gsap.set(el, { autoAlpha: 0 }));

        // Dim overlay — starts dark; section slides up over previous
        gsap.set(dim, { opacity: 0.65 });

        if (prefersReduced) {
          // Static: show everything, no animation
          chars.forEach((s) => {
            s.style.color = "var(--ink)";
            s.style.opacity = "1";
          });
          subSceneEls.forEach((el) => gsap.set(el, { autoAlpha: 1 }));
          return;
        }

        const introEnd = 0.3;

        // Pin + video scrub — hold video nearly still during intro,
        // then scrub the full range during sub-scenes
        ScrollTrigger.create({
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          pin: stage,
          onUpdate: (self) => {
            if (!(video.duration && Number.isFinite(video.duration))) return;
            const p = self.progress;
            // Freeze video at the mid-frame set on mount during the intro
            // band — this is when Copper Fill sweeps, and any video.currentTime
            // writes here compete with the char color paints. Scrub only kicks
            // in once sub-scenes begin, when the headline is already resolved.
            if (p <= introEnd) return;
            const videoProgress =
              0.15 + ((p - introEnd) / (1 - introEnd)) * 0.85;
            video.currentTime = videoProgress * video.duration;
          },
        });

        // Scroll-driven timeline
        const sceneBand = (1 - introEnd) / totalSubScenes;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // Dim eases down as the section "lights up" during intro
        tl.to(dim, { opacity: 0.3, duration: introEnd * 0.6, ease: "power2.out" }, 0.02);

        // Copper Fill across intro band — two staggered tweens rather than
        // 2×N individual tweens, so GSAP batches per-frame writes and paint
        // contention with the video scrub drops sharply.
        const fillDuration = introEnd * 0.85;
        const perChar = fillDuration / chars.length;
        tl.to(
          chars,
          {
            color: "var(--copper)",
            opacity: 1,
            duration: perChar * 0.4 + 0.02,
            ease: "none",
            stagger: { each: perChar, from: "start" },
          },
          0,
        );
        tl.to(
          chars,
          {
            color: "var(--page)",
            duration: perChar * 0.6 + 0.02,
            ease: "none",
            stagger: { each: perChar, from: "start" },
          },
          perChar * 0.4,
        );

        // Intro body fades out as first sub-scene arrives
        tl.to(
          intro,
          {
            autoAlpha: 0,
            y: -12,
            duration: 0.06,
            ease: "power2.in",
          },
          introEnd - 0.04,
        );

        // Dim deepens for sub-scenes
        tl.to(dim, { opacity: 0.45, duration: 0.08, ease: "none" }, introEnd - 0.02);

        // Sub-scene reveals
        subSceneEls.forEach((el, i) => {
          const sceneStart = introEnd + i * sceneBand;
          const sceneEnd = sceneStart + sceneBand;

          // Find hotspot pills inside this sub-scene
          const pills = el.querySelectorAll<HTMLElement>("[data-hotspot]");
          const stepInfo = el.querySelector<HTMLElement>("[data-step-info]");

          // Reveal container
          tl.set(el, { autoAlpha: 1 }, sceneStart);

          // Step info rises in
          if (stepInfo) {
            gsap.set(stepInfo, { y: 16, opacity: 0 });
            tl.to(
              stepInfo,
              {
                y: 0,
                opacity: 1,
                duration: 0.05,
                ease: "power2.out",
              },
              sceneStart + 0.01,
            );
          }

          // Pills stagger in (Overlay Reveal)
          pills.forEach((pill, pi) => {
            gsap.set(pill, { scale: 0.85, opacity: 0 });
            tl.to(
              pill,
              {
                scale: 1,
                opacity: 1,
                duration: 0.04,
                ease: "power2.out",
              },
              sceneStart + 0.03 + pi * 0.015,
            );
          });

          // Fade out before next sub-scene (except the last one which stays)
          if (i < totalSubScenes - 1) {
            tl.to(
              el,
              {
                autoAlpha: 0,
                duration: 0.04,
                ease: "power2.in",
              },
              sceneEnd - 0.03,
            );
          }

          // Last sub-scene fades out at section exit
          if (i === totalSubScenes - 1) {
            tl.to(
              el,
              { autoAlpha: 0, duration: 0.06, ease: "power2.in" },
              0.88,
            );
          }
        });

        // Exit: dim deepens moderately for handoff
        tl.to(dim, { opacity: 0.7, duration: 0.08, ease: "power2.in" }, 0.90);
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

    return () => {
      ctx?.revert();
    };
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
      className="relative z-10 w-full"
      style={{ height: scrollLength }}
    >
      <div
        ref={stageRef}
        className="relative h-dvh w-full overflow-hidden bg-modal-bg"
        onClick={activeHotspot ? dismissHotspot : undefined}
      >
        {/* Scroll-scrubbed video */}
        <video
          ref={videoRef}
          src={phase.backgroundVideoPath}
          muted
          playsInline
          preload={videoPreload}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
        />

        {/* Dim overlay */}
        <div
          ref={dimRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-modal-bg"
        />

        {/* Top gradient — softens the wipe edge when section slides over previous */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[5]"
          style={{
            height: "40vh",
            background:
              "linear-gradient(to bottom, var(--modal-bg) 0%, var(--modal-bg) 15%, transparent 100%)",
          }}
        />

        {/* Phase intro overlay */}
        <div
          ref={introRef}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end px-6 pb-24 md:flex-row md:items-end md:justify-between md:px-12 md:pb-16 lg:px-16"
        >
          <div className="mb-8 md:mb-0">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-page/60">
              Phase {phase.number}
            </p>
            <h2
              ref={headlineRef}
              className="font-display text-[18vw] uppercase leading-[0.9] text-page md:text-[12vw] lg:text-[10rem]"
            >
              {phase.name}
            </h2>
          </div>
          <div className="max-w-md md:pb-4">
            <p className="font-body text-base leading-relaxed text-page/80 md:text-lg">
              {phase.introBody}
            </p>
          </div>
        </div>

        {/* Sub-scene overlays */}
        {phase.subScenes.map((subScene, i) => (
          <div
            key={i}
            ref={(el) => {
              subSceneRefs.current[i] = el;
            }}
            className="pointer-events-none absolute inset-0 z-10"
          >
            {/* Step info — right column */}
            <div
              data-step-info
              className="absolute right-6 top-1/2 -translate-y-1/2 max-w-sm text-right md:right-12 lg:right-16"
            >
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-page/60">
                {subScene.stepLabel}
              </p>
              <p className="font-body text-sm leading-relaxed text-page/75 md:text-base">
                {subScene.stepDescription}
              </p>
            </div>

            {/* Hotspot pills */}
            <div className="absolute bottom-24 left-6 flex flex-wrap gap-3 md:bottom-auto md:left-12 md:top-1/3 md:flex-col lg:left-16">
              {subScene.hotspots.map((hotspot, hi) => (
                <HotspotPill
                  key={hi}
                  hotspot={hotspot}
                  id={`${i}-${hi}`}
                  activeId={activeHotspot}
                  onToggle={handleHotspotToggle}
                />
              ))}
            </div>

            {/* Progress dots */}
            <div className="absolute right-6 bottom-16 flex gap-2 md:right-12 md:bottom-auto md:top-1/3 md:mt-24 md:flex-col lg:right-16">
              {phase.subScenes.map((_, di) => (
                <span
                  key={di}
                  className={`block h-1.5 w-1.5 rounded-full ${di === i ? "bg-page" : "bg-page/30"}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HotspotPill({
  hotspot,
  id,
  activeId,
  onToggle,
}: {
  hotspot: { label: string; description: string; cardImagePath?: string };
  id: string;
  activeId: string | null;
  onToggle: (id: string | null, hotspotName?: string) => void;
}) {
  const isOpen = activeId === id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(isOpen ? null : id, hotspot.label);
  };

  return (
    <div data-hotspot className="pointer-events-auto group relative">
      <button
        type="button"
        onClick={handleClick}
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full bg-modal-bg/60 px-4 py-2 backdrop-blur-sm transition-colors duration-200 hover:bg-modal-bg/80"
      >
        <span className="text-copper text-xs">◆</span>
        <span className="font-body text-xs text-page/90 md:text-sm">
          {hotspot.label}
        </span>
      </button>

      {hotspot.description && (
        <div
          className={`absolute bottom-full left-0 mb-2 w-72 max-w-[calc(100vw-3rem)] origin-bottom rounded-lg bg-page p-4 shadow-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:bottom-auto md:left-full md:top-0 md:mb-0 md:ml-3 md:origin-left ${
            isOpen
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0 [@media(hover:hover)]:group-hover:pointer-events-auto [@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-hover:opacity-100"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {hotspot.cardImagePath && (
            <img
              src={hotspot.cardImagePath}
              alt=""
              className="mb-3 h-32 w-full rounded object-cover"
            />
          )}
          <p className="font-body text-sm leading-relaxed text-ink/80">
            {hotspot.description}
          </p>
        </div>
      )}
    </div>
  );
}
