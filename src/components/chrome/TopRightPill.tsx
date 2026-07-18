"use client";

import { useEffect, useState } from "react";

type PillState =
  | { kind: "menu" }
  | { kind: "phase"; number: number; name: string }
  | { kind: "contact" };

const SECTION_STATE: Record<string, PillState> = {
  "phase-1": { kind: "phase", number: 1, name: "Listen" },
  "phase-2": { kind: "phase", number: 2, name: "Sketch" },
  "phase-3": { kind: "phase", number: 3, name: "Refine" },
  "phase-4": { kind: "phase", number: 4, name: "Build" },
  "phase-5": { kind: "phase", number: 5, name: "Live" },
  "tour-intro": { kind: "phase", number: 6, name: "Virtual Tour" },
  tour: { kind: "contact" },
};

export function TopRightPill({ onOpenMenu, onOpenContact }: {
  onOpenMenu: () => void;
  onOpenContact: () => void;
}) {
  const [state, setState] = useState<PillState>({ kind: "menu" });

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the section whose center is closest to viewport center.
        const vh = window.innerHeight;
        let best: { id: string; dist: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const rect = entry.target.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - vh / 2);
          if (!best || dist < best.dist) {
            best = { id: entry.target.getAttribute("data-section") || "", dist };
          }
        }
        if (best) {
          setState(SECTION_STATE[best.id] ?? { kind: "menu" });
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50 md:top-8 md:right-10">
      {state.kind === "menu" && (
        <button
          onClick={onOpenMenu}
          className="flex items-center gap-2 rounded-full bg-page px-4 py-2 font-body text-sm text-ink shadow-sm transition-shadow hover:shadow-md"
        >
          Menu <span aria-hidden className="text-copper">=</span>
        </button>
      )}
      {state.kind === "phase" && (
        <button
          onClick={onOpenMenu}
          aria-label={`Navigation — Phase ${state.number}: ${state.name}`}
          className="flex items-center gap-0 rounded-full bg-page shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="flex items-center gap-1.5 rounded-l-full px-3 py-2 font-body text-xs text-ink/70">
            <span aria-hidden className="text-copper">◆</span>
            <span className="hidden md:inline">Our approach</span>
          </span>
          <span className="flex items-center gap-2 rounded-r-full bg-sage px-3 py-2 font-body text-xs text-modal-bg">
            <span className="font-mono">[{state.number}]</span> {state.name}
            <span aria-hidden className="ml-1">=</span>
          </span>
        </button>
      )}
      {state.kind === "contact" && (
        <button
          onClick={onOpenContact}
          className="flex items-center gap-2 rounded-full bg-sage px-4 py-2 font-body text-sm text-modal-bg shadow-sm transition-all hover:bg-sage/90 hover:shadow-md"
        >
          <span aria-hidden>☎</span>
          Get in Touch
          <span aria-hidden>=</span>
        </button>
      )}
    </div>
  );
}
