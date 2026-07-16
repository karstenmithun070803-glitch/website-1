import Link from "next/link";

/**
 * Header — top-left of every page (per deliverable-4 §4).
 * Placeholder for M0: text-only. IMG D2 copper cluster will replace the ◆ glyph in M7.
 */
export function Header() {
  return (
    <header className="fixed top-6 left-6 z-50 flex items-center gap-3 md:top-8 md:left-10">
      <Link
        href="/"
        className="flex items-baseline gap-2 no-underline text-ink"
        aria-label="Karst — home"
      >
        <span aria-hidden className="text-copper text-base leading-none">
          ◆
        </span>
        <span className="font-display text-2xl leading-none tracking-tight">
          karst<span className="text-copper">.</span>
        </span>
        <span className="ml-1 hidden text-xs uppercase tracking-[0.08em] text-gray-faded md:inline">
          Interior Design Studio
        </span>
      </Link>
    </header>
  );
}
