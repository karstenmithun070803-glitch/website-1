import { Header } from "@/components/chrome/Header";

/**
 * M0 placeholder for the home page.
 * Sections wire up in M2 (static skeleton) → M4 (motion).
 * For now: shows the design-token surface + Header (chrome), nothing more.
 */
export default function Home() {
  return (
    <div className="min-h-dvh bg-page text-ink">
      <Header />
      <main className="mx-auto flex min-h-dvh max-w-6xl flex-col items-start justify-center gap-6 px-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.08em] text-gray-faded">
          Milestone 0 — scaffold
        </p>
        <h1 className="font-display text-5xl leading-[0.95] md:text-7xl">
          Rooms that hold the day.
        </h1>
        <p className="max-w-lg text-base leading-relaxed md:text-lg">
          We design homes for the people who actually live in them — thoughtfully, materially, and
          with no visible seams.
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.08em] text-gray-faded">
          The eleven sections wire up in M2 · M4. See{" "}
          <span className="text-ink">docs/deliverable-4-site-spec.md</span>.
        </p>
      </main>
    </div>
  );
}
