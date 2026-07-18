"use client";

import { useEffect, useState } from "react";

type HintState = {
  scrollTo: string | null; // bottom-right CTA
  scrollToTarget: string | null;
  showScrollHint: boolean; // bottom-left ambient hint
};

// Map: when active section is X, bottom-right CTA points to Y (label + target)
const NEXT_PHASE: Record<
  string,
  { label: string; target: string } | undefined
> = {
  "manifesto-transition": { label: "Scroll to Phase 1", target: "phase-1" },
  hero: { label: "Scroll to Phase 1", target: "phase-1" },
  "phase-1": { label: "Scroll to Phase 2", target: "phase-2" },
  "phase-2": { label: "Scroll to Phase 3", target: "phase-3" },
  "phase-3": { label: "Scroll to Phase 4", target: "phase-4" },
  "phase-4": { label: "Scroll to Phase 5", target: "phase-5" },
  "phase-5": { label: "Scroll to enter tour", target: "tour-intro" },
};

const PHASE_SECTIONS = new Set([
  "phase-1",
  "phase-2",
  "phase-3",
  "phase-4",
  "phase-5",
]);

export function BottomHints() {
  const [state, setState] = useState<HintState>({
    scrollTo: null,
    scrollToTarget: null,
    showScrollHint: false,
  });

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );
    if (sections.length === 0) return;

    const updateFromScroll = () => {
      const vh = window.innerHeight;
      let bestId: string | null = null;
      let bestDist = Infinity;
      let phaseProgress = 0; // 0..1 within the current section

      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - vh / 2);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = s.getAttribute("data-section");
          const total = rect.height;
          const scrolled = -rect.top;
          phaseProgress = Math.max(0, Math.min(1, scrolled / total));
        }
      }

      if (!bestId) return;

      const next = NEXT_PHASE[bestId];
      // Show CTA only in last 30% of a phase-ish section
      const showCta = next && phaseProgress > 0.7;
      // Show scroll hint only in first 20% of a phase section
      const showHint = PHASE_SECTIONS.has(bestId) && phaseProgress < 0.2;

      setState({
        scrollTo: showCta && next ? next.label : null,
        scrollToTarget: showCta && next ? next.target : null,
        showScrollHint: showHint,
      });
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateFromScroll();
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (target: string) => {
    const el = document.querySelector<HTMLElement>(`[data-section="${target}"]`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Bottom-left ambient hint */}
      <div
        className={`pointer-events-none fixed bottom-6 left-6 z-40 flex items-center gap-2 transition-opacity duration-500 md:bottom-8 md:left-10 ${
          state.showScrollHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <span aria-hidden className="text-page/60">↓</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-page/60">
          Scroll to explore
        </span>
      </div>

      {/* Bottom-right transient CTA */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 md:bottom-8 md:right-10 ${
          state.scrollTo
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {state.scrollTo && state.scrollToTarget && (
          <button
            onClick={() => scrollTo(state.scrollToTarget!)}
            className="group flex items-center gap-2 rounded-full border border-sage bg-page/80 px-5 py-2.5 font-body text-sm text-sage backdrop-blur-sm transition-colors hover:bg-sage hover:text-modal-bg"
          >
            <span aria-hidden>↓</span>
            {state.scrollTo}
          </button>
        )}
      </div>
    </>
  );
}
