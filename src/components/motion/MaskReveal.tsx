"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MaskRevealProps = {
  children: ReactNode;
  className?: string;
  /** Optional line index for staggering — inner content translates from y:100% to y:0. */
};

/**
 * MaskReveal — a line-wrapper primitive.
 * Wraps content in a mask (`overflow: hidden`) so the inner content can
 * be translated up from below by an external GSAP timeline. Used inside
 * HeroSequence to reveal each text line theatrically.
 *
 * The wrapper is the mask. The `data-mask-inner` child is what the timeline
 * animates (translateY 100% → 0). Timeline lives in the parent so it can
 * coordinate stagger across multiple MaskReveal children.
 */
export const MaskReveal = forwardRef<HTMLSpanElement, MaskRevealProps>(
  function MaskReveal({ children, className }, ref) {
    return (
      <span
        ref={ref}
        className={cn("inline-block overflow-hidden align-bottom", className)}
      >
        <span data-mask-inner className="inline-block will-change-transform">
          {children}
        </span>
      </span>
    );
  },
);
