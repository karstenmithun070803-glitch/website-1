"use client";

import { useEffect, useRef } from "react";

const MENU_ITEMS = [
  { num: 1, label: "Listen", target: "phase-1" },
  { num: 2, label: "Sketch", target: "phase-2" },
  { num: 3, label: "Refine", target: "phase-3" },
  { num: 4, label: "Build", target: "phase-4" },
  { num: 5, label: "Live", target: "phase-5" },
  { num: 6, label: "Virtual Tour", target: "tour-intro" },
];

export function MenuPanel({
  open,
  onClose,
  onOpenContact,
}: {
  open: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusable = panel.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    requestAnimationFrame(() => {
      const firstBtn = panelRef.current?.querySelector<HTMLElement>("ul button");
      firstBtn?.focus();
    });

    return () => {
      window.removeEventListener("keydown", onKey);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  const jumpTo = (target: string) => {
    const el = document.querySelector<HTMLElement>(`[data-section="${target}"]`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    onClose();
  };

  return (
    <>
      {/* Underlay */}
      <button
        aria-hidden={!open}
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-ink/10 backdrop-blur-[2px] transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Site navigation"
        aria-hidden={!open}
        className={`fixed right-6 top-6 z-[70] w-[calc(100vw-3rem)] max-w-[340px] origin-top-right rounded-2xl bg-page p-6 shadow-2xl transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:right-10 md:top-8 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-faded">
            Our approach
          </p>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <ul className="space-y-0">
          {MENU_ITEMS.map((item, i) => (
            <li key={item.target}>
              <button
                onClick={() => jumpTo(item.target)}
                className={`group flex w-full items-center gap-4 py-3 text-left transition-colors hover:bg-copper/5 ${
                  i > 0 ? "border-t border-dashed border-gray-faded/30" : ""
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-copper/50 font-mono text-xs text-copper">
                  {item.num}
                </span>
                <span className="font-body text-[17px] font-medium text-ink">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            onClose();
            onOpenContact();
          }}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-sage py-3 font-body text-sm font-medium text-modal-bg transition-colors hover:bg-sage/90"
        >
          <span aria-hidden>☎</span> Get in Touch
        </button>
      </div>
    </>
  );
}
