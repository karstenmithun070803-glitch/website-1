"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { StubHomePage } from "@/lib/stubContent";

export function IntroModal({ intro }: { intro: StubHomePage["intro"] }) {
  const modalRef     = useRef<HTMLDivElement>(null);
  const panelLeftRef  = useRef<HTMLDivElement>(null);
  const panelRightRef = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const buttonRef    = useRef<HTMLButtonElement>(null);
  const [exiting, setExiting]   = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleEnter = () => {
    if (exiting) return;
    const panelL  = panelLeftRef.current;
    const panelR  = panelRightRef.current;
    const content = contentRef.current;
    const button  = buttonRef.current;
    if (!panelL || !panelR || !content || !button) return;
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

    const tl = gsap.timeline({ onComplete: () => setDismissed(true) });

    // 1. Button settles — barely perceptible, just enough tactile feedback
    tl.to(button, { scale: 0.96, duration: 0.1, ease: "power2.out" })
      .to(button, { scale: 1,    duration: 0.14, ease: "power2.out" });

    // 2. Content dissolves — unhurried, before the panels move
    tl.to(
      content,
      { opacity: 0, y: -12, duration: 0.5, ease: "power2.inOut" },
      "+=0.06",
    );

    // 3. Panels part like heavy interior doors — left leads by one beat
    //    Long ease-in gives the impression of overcoming inertia (weight)
    //    then they clear completely in one confident sweep.
    tl.to(
      panelL,
      { xPercent: -100, duration: 2.0, ease: "power3.inOut" },
      "-=0.18",
    );
    tl.to(
      panelR,
      { xPercent: 100, duration: 2.0, ease: "power3.inOut" },
      "<0.07",   // right door follows left by 70 ms — slight human asymmetry
    );
  };

  if (dismissed) return null;

  return (
    <div
      ref={modalRef}
      aria-hidden={exiting}
      className="fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Left door panel */}
      <div
        ref={panelLeftRef}
        className="absolute left-0 top-0 h-full w-1/2 bg-modal-bg will-change-transform"
      />

      {/* Right door panel */}
      <div
        ref={panelRightRef}
        className="absolute right-0 top-0 h-full w-1/2 bg-modal-bg will-change-transform"
      />

      {/* Content — above both panels, fades out first */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col text-page"
      >
        <div className="mx-auto flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="flex items-baseline gap-3">
            <span aria-hidden className="text-copper text-xl leading-none">◆</span>
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
          <p className="mt-1 normal-case tracking-normal">© 2026 Karst. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
