"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { StubHomePage } from "@/lib/stubContent";

type Props = {
  intro: StubHomePage["intro"];
  heroVideoPath: string;
  heroVideoPoster?: string;
};

// Arch clip-path: a tall arched opening in screen-center, like a doorway.
// "round 500px 500px 0px 0px" → top corners semicircle, bottom corners sharp.
// Browser caps radius at half the shorter dimension, giving a perfect arch.
const ARCH = "inset(16% 36% 12% 36% round 500px 500px 0px 0px)";
const FULL = "inset(0% 0% 0% 0% round 0px 0px 0px 0px)";

export function IntroModal({ intro, heroVideoPath, heroVideoPoster }: Props) {
  const modalRef   = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef  = useRef<HTMLButtonElement>(null);
  const [exiting, setExiting]     = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleEnter = () => {
    if (exiting) return;
    const modal   = modalRef.current;
    const video   = videoRef.current;
    const content = contentRef.current;
    const button  = buttonRef.current;
    if (!modal || !video || !content || !button) return;
    setExiting(true);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.to(modal, { opacity: 0, duration: 0.3, onComplete: () => setDismissed(true) });
      return;
    }

    const tl = gsap.timeline({ onComplete: () => setDismissed(true) });

    // 1. Minimal button press — barely there, just confirms the tap
    tl.to(button, { scale: 0.96, duration: 0.08, ease: "power2.out" })
      .to(button, { scale: 1,    duration: 0.12, ease: "power2.out" });

    // 2. Wordmark + tagline dissolve — room goes quiet (500ms)
    tl.to(content, { opacity: 0, y: -10, duration: 0.5, ease: "power2.inOut" }, "+=0.04");

    // 3. Dark surround begins fading as the arch starts to breathe open
    tl.to(modal, { backgroundColor: "rgba(0,0,0,0)", duration: 0.9, ease: "power2.inOut" }, "-=0.25");

    // 4. The arch expands — clip-path opens from doorway to full viewport.
    //    Scale pulls back from 1.06→1 so the scene recedes as it opens,
    //    giving a sense of physical depth (you're stepping back as the
    //    room reveals itself, not zooming in).
    tl.to(
      video,
      {
        clipPath: FULL,
        scale: 1,
        duration: 1.35,
        ease: "power3.inOut",
      },
      "<0.05",
    );
  };

  if (dismissed) return null;

  return (
    <div
      ref={modalRef}
      aria-hidden={exiting}
      className="fixed inset-0 z-[100] overflow-hidden bg-modal-bg"
    >
      {/*
       * Hero video — always present, clipped to arch shape.
       * You see the hallway through the arch before pressing Enter.
       * On Enter the clip-path expands to fill the viewport.
       * Initial scale 1.06 → animates to 1 during expansion (depth sense).
       */}
      <video
        ref={videoRef}
        src={heroVideoPath}
        poster={heroVideoPoster}
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          clipPath: ARCH,
          transform: "scale(1.06)",
          willChange: "clip-path, transform",
        }}
      />

      {/* Wordmark, tagline, Enter button — float above the arch */}
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
