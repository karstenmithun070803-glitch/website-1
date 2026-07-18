"use client";

import { useEffect, useState } from "react";

/**
 * Reactive hook — returns `true` if the user has `prefers-reduced-motion: reduce` set.
 * Updates live if the OS setting changes.
 * SSR-safe: initial render is `false` (motion-friendly) until hydration.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
