"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { StubHomePage } from "@/lib/stubContent";

type Arch = { l: number; r: number; t: number; b: number; cy: number };

const CLOSED: Arch = { l: 38, r: 62, t: 8, b: 92, cy: 22 };
const OPEN: Arch = { l: -20, r: 120, t: -20, b: 120, cy: -20 };

function archD({ l, r, t, b, cy }: Arch): string {
  const cx = (l + r) / 2;
  return [
    `M${l},${b}`,
    `L${l},${cy}`,
    `Q${l},${t} ${cx},${t}`,
    `Q${r},${t} ${r},${cy}`,
    `L${r},${b}`,
    "Z",
  ].join(" ");
}

export function IntroModal({ intro }: { intro: StubHomePage["intro"] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [exiting, setExiting] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleEnter = useCallback(() => {
    if (exiting) return;
    const svg = svgRef.current;
    const path = pathRef.current;
    const content = contentRef.current;
    const button = buttonRef.current;
    if (!svg || !path || !content || !button) return;
    setExiting(true);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      window.dispatchEvent(new CustomEvent("karst:enter"));
      gsap.to(svg, { opacity: 0, duration: 0.3 });
      gsap.to(content, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => setDismissed(true),
      });
      return;
    }

    const arch = { ...CLOSED };
    const tl = gsap.timeline({ onComplete: () => setDismissed(true) });

    // 1. Button settles
    tl.to(button, { scale: 0.96, duration: 0.08, ease: "power2.out" }).to(
      button,
      { scale: 1, duration: 0.12, ease: "power2.out" },
    );

    // 2. Content dissolves
    tl.to(
      content,
      { opacity: 0, y: -10, duration: 0.5, ease: "power2.inOut" },
      "+=0.06",
    );

    // 3. Arch breathes open — reveals the actual hero underneath
    tl.to(
      arch,
      {
        ...OPEN,
        duration: 1.6,
        ease: "power3.inOut",
        onUpdate: () => path.setAttribute("d", archD(arch)),
      },
      "-=0.28",
    );

    // 4. As arch opens wide, tell hero to materialize its text
    tl.call(
      () => window.dispatchEvent(new CustomEvent("karst:enter")),
      [],
      "-=0.9",
    );

    // 5. Overlay opacity fades to catch any residual mask edge
    tl.to(svg, { opacity: 0, duration: 0.35, ease: "power2.out" }, "-=0.5");
  }, [exiting]);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  if (dismissed) return null;

  return (
    <div
      data-intro-modal
      className={cn("fixed inset-0 z-[100]", exiting && "pointer-events-none")}
      aria-hidden={exiting}
    >
      {/*
        SVG overlay — solid dark fill with a soft-edged arch cutout.
        The hero section renders underneath in the normal document flow
        and is visible through the arch. No duplicate video.
      */}
      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <filter id="intro-blur">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
          <mask id="intro-mask">
            <rect width="100" height="100" fill="white" />
            <path
              ref={pathRef}
              d={archD(CLOSED)}
              fill="black"
              filter="url(#intro-blur)"
            />
          </mask>
        </defs>
        <rect
          width="100"
          height="100"
          mask="url(#intro-mask)"
          style={{ fill: "var(--color-modal-bg, #1a1614)" }}
        />
      </svg>

      {/* Content — positioned at bottom of viewport, below the arch window */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col text-page"
      >
        {/* Top spacer pushes content down so it sits below the arch */}
        <div className="flex-1" />

        {/* Wordmark + tagline + button cluster */}
        <div className="flex flex-col items-center gap-5 px-6 pb-6 text-center md:pb-10">
          <div className="flex items-baseline gap-3">
            <span aria-hidden className="text-copper text-xl leading-none">
              ◆
            </span>
            <span className="font-display text-4xl leading-none md:text-5xl">
              karst<span className="text-copper">.</span>
            </span>
          </div>
          <p className="max-w-xs font-body text-sm leading-tight text-page/60 md:text-base">
            {intro.tagline}
          </p>
          <button
            ref={buttonRef}
            type="button"
            onClick={handleEnter}
            disabled={exiting}
            className={cn(
              "rounded-full bg-copper px-8 py-3",
              "font-body text-sm font-medium text-modal-bg",
              "will-change-transform disabled:cursor-default",
            )}
          >
            {intro.enterButtonLabel}
          </button>
        </div>

        <footer className="px-6 pb-6 text-center font-body text-[10px] uppercase tracking-[0.06em] text-page/60 md:px-10 md:pb-8 md:text-right md:text-[11px]">
          <p>Terms · Privacy · Press · Careers · Contact</p>
          <p className="mt-1 normal-case tracking-normal">
            © 2026 Karst. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
