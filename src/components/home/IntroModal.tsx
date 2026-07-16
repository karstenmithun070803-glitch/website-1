"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { StubHomePage } from "@/lib/stubContent";

/**
 * Section 0 — Intro modal.
 *
 * On `Enter` click: a theatrical exit sequence (button pressed micro-anim
 * → brief hold → curtain lift with slight scale + fade), revealing the
 * scroll-scrubbed hero underneath. Total ~1.1s. Under reduced-motion, a
 * simple 200ms fade replaces the whole thing.
 */
export function IntroModal({ intro }: { intro: StubHomePage["intro"] }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [exiting, setExiting] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleEnter = () => {
    if (exiting || !modalRef.current || !buttonRef.current || !contentRef.current) return;
    setExiting(true);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => setDismissed(true),
      });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setDismissed(true),
    });

    // 1. Button pressed micro-anim
    tl.to(buttonRef.current, {
      scale: 0.94,
      duration: 0.14,
      ease: "power2.out",
    })
      .to(buttonRef.current, {
        scale: 1,
        duration: 0.16,
        ease: "power2.out",
      })
      // 2. Content lifts slightly + fades before the modal itself moves
      .to(
        contentRef.current,
        {
          y: -24,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
        },
        "+=0.05",
      )
      // 3. Modal curtain rises upward with a subtle scale — feels like a veil lifting
      .to(
        modalRef.current,
        {
          yPercent: -100,
          scale: 0.985,
          duration: 0.95,
          ease: "expo.inOut",
        },
        "-=0.35",
      );
  };

  if (dismissed) return null;

  return (
    <div
      ref={modalRef}
      aria-hidden={exiting}
      className="fixed inset-0 z-[100] flex flex-col bg-modal-bg text-page will-change-transform"
      style={{ transformOrigin: "50% 50%" }}
    >
      {/* Content wrapper — animates independently for a two-stage exit */}
      <div
        ref={contentRef}
        className="mx-auto flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center"
      >
        <div className="flex items-baseline gap-3">
          <span aria-hidden className="text-copper text-xl leading-none">
            ◆
          </span>
          <span className="font-display text-4xl leading-none md:text-5xl">
            karst<span className="text-copper">.</span>
          </span>
          <span className="ml-2 font-body text-lg leading-tight tracking-tight md:text-xl">
            Build Your Home
          </span>
        </div>
        <p className="max-w-xs font-body text-base leading-tight text-page/70 md:text-lg">
          {intro.tagline}
        </p>
        <button
          ref={buttonRef}
          type="button"
          onClick={handleEnter}
          disabled={exiting}
          className={cn(
            "mt-4 rounded-full bg-copper px-8 py-3",
            "font-body text-sm font-medium text-modal-bg",
            "will-change-transform disabled:cursor-default",
          )}
        >
          {intro.enterButtonLabel}
        </button>
      </div>

      <footer className="px-6 pb-8 text-right font-body text-[10px] uppercase tracking-[0.06em] text-page/50 md:px-10 md:pb-10 md:text-[11px]">
        <p>Terms · Privacy · Press · Careers · Contact</p>
        <p className="mt-1 normal-case tracking-normal">
          © 2026 Karst. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
