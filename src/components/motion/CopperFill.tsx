"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  /** Text to render. Split into character spans for the fill animation. */
  text: string;
  className?: string;
  /**
   * Final settled color. Defaults to `--ink` (deep espresso).
   * Use `var(--page)` (cream) on dark backgrounds so text lands readable.
   */
  finalColor?: string;
  /** ScrollTrigger start. Defaults to when the top of the element hits 80% of the viewport. */
  start?: string;
  /** ScrollTrigger end. Defaults to when the top hits 20%. */
  end?: string;
  /**
   * If the copy needs to preserve wrapping at word boundaries (long headlines),
   * pass `respectWords` — we wrap words in extra spans so lines break cleanly.
   */
  respectWords?: boolean;
};

/**
 * CopperFill — the signature motion. As the user scrolls into the element,
 * each character fills character-by-character from `--gray-faded` → `--copper`
 * (the leading edge) → the final color. Feels like a highlighter being drawn
 * across the words.
 *
 * Reduced-motion / touch: static — text renders in final color immediately.
 * (Reduced-motion handled by LenisProvider disabling smooth scroll AND by
 *  ScrollTrigger.scrub not firing under the same media query in modern browsers,
 *  but we also short-circuit here for safety.)
 */
export function CopperFill({
  text,
  className,
  finalColor = "var(--ink)",
  start = "top 80%",
  end = "top 20%",
  respectWords = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const chars = Array.from(
      ref.current.querySelectorAll<HTMLElement>("[data-char]"),
    );
    if (chars.length === 0) return;

    // Initial state: pale gray, waiting
    gsap.set(chars, { color: "var(--gray-faded)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start,
        end,
        scrub: 0.5,
      },
    });

    chars.forEach((char, i) => {
      const t = i / chars.length;
      const step = 1 / chars.length;
      // Pass through copper leading edge…
      tl.to(char, { color: "var(--copper)", duration: step * 0.4 }, t);
      // …then settle to the final color
      tl.to(char, { color: finalColor, duration: step * 0.6 }, t + step * 0.4);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [text, finalColor, start, end]);

  // Split into words (preserving whitespace) then chars-within-words
  const words = respectWords ? text.split(/(\s+)/) : [text];

  return (
    <span ref={ref} className={cn("inline", className)}>
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) {
          // Preserve whitespace with a single char span — still fills copper
          return (
            <span key={wi} data-char>
              {" "}
            </span>
          );
        }
        return (
          <span key={wi} className="inline-block">
            {Array.from(word).map((c, ci) => (
              <span key={ci} data-char>
                {c}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
