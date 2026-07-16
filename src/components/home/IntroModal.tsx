"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { StubHomePage } from "@/lib/stubContent";

/**
 * Section 0 — Intro modal.
 * Full-viewport overlay dismissed by the Enter button.
 * M2: dismiss via local state. M5/M6 will layer the fade-out transition
 * from deliverable-4 §2 "Intro Modal Exit".
 */
export function IntroModal({ intro }: { intro: StubHomePage["intro"] }) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div
      aria-hidden={dismissed}
      className={cn(
        "fixed inset-0 z-[100] flex flex-col bg-modal-bg text-page",
        "transition-opacity duration-300",
        dismissed ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      {/* Centered content — wordmark, tagline, button */}
      <div className="mx-auto flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
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
          type="button"
          onClick={() => setDismissed(true)}
          className={cn(
            "mt-4 rounded-full bg-copper px-8 py-3",
            "font-body text-sm font-medium text-modal-bg",
            "transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]",
          )}
        >
          {intro.enterButtonLabel}
        </button>
      </div>

      {/* Footer legal */}
      <footer className="px-6 pb-8 text-right font-body text-[10px] uppercase tracking-[0.06em] text-page/50 md:px-10 md:pb-10 md:text-[11px]">
        <p>Terms · Privacy · Press · Careers · Contact</p>
        <p className="mt-1 normal-case tracking-normal">
          © 2026 Karst. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
