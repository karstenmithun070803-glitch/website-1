import { Header } from "@/components/chrome/Header";

export const metadata = {
  title: "Design System — Karst",
  robots: { index: false, follow: false },
};

/**
 * /design-system — the motion-primitive proof page (per BUILD-PLAN §3, §7.4).
 * Every motion primitive from §5.2 of the plan will render here in isolation,
 * with a Playwright screenshot-diff test as its safety net.
 *
 * M0: placeholder scaffolding. Primitives ship at M3.
 */
export default function DesignSystem() {
  return (
    <div className="min-h-dvh bg-page text-ink">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-32 md:px-10">
        <p className="text-xs uppercase tracking-[0.08em] text-gray-faded">
          Internal — not indexed
        </p>
        <h1 className="mt-2 font-display text-5xl leading-tight">Design System</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-faded">
          Motion primitives will land here in M3, each in isolation with a Playwright
          screenshot-diff for regression protection.
        </p>

        <section className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          <TokenSwatch name="page" value="#F1EDE4" className="bg-page text-ink" />
          <TokenSwatch name="ink" value="#181613" className="bg-ink text-page" />
          <TokenSwatch name="copper" value="#B87333" className="bg-copper text-page" />
          <TokenSwatch name="sage" value="#3E4A3F" className="bg-sage text-page" />
          <TokenSwatch name="teal" value="#7A9E9F" className="bg-teal text-page" />
          <TokenSwatch name="modal-bg" value="#1A1614" className="bg-modal-bg text-page" />
          <TokenSwatch name="gray-faded" value="#7A7261" className="bg-gray-faded text-page" />
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl">Typography</h2>
          <div className="mt-4 space-y-4">
            <p className="font-display text-6xl leading-tight">Display · Instrument Serif</p>
            <p className="text-lg leading-relaxed">Body · Inter — the quick brown fox jumps over the lazy dog</p>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-gray-faded">
              MICRO-CAPS · GEIST MONO · 0.08EM TRACKING
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function TokenSwatch({
  name,
  value,
  className,
}: {
  name: string;
  value: string;
  className: string;
}) {
  return (
    <div className={`aspect-square rounded-lg p-4 ${className}`}>
      <p className="font-mono text-xs uppercase tracking-[0.06em]">--{name}</p>
      <p className="font-mono text-xs opacity-70">{value}</p>
    </div>
  );
}
