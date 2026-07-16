"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * LenisProvider — smooth-scroll on desktop only.
 * Wired at root so every scroll-driven primitive on the page uses the
 * same scroller. Disabled under reduced-motion and on touch devices
 * (per BUILD-PLAN §5.1). Also bridges Lenis → ScrollTrigger so pinned
 * scenes stay in sync with the smooth scroll.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isPointerFine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (prefersReduced || !isPointerFine) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    // Feed Lenis's scroll events into ScrollTrigger so pinned scenes update
    lenis.on("scroll", ScrollTrigger.update);

    // Let GSAP's ticker drive Lenis's rAF loop (single ticker, no double-work)
    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
