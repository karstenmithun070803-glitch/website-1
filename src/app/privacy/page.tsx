import { Header } from "@/components/chrome/Header";

export const metadata = {
  title: "Privacy — Karst",
};

export default function Privacy() {
  return (
    <div className="min-h-dvh bg-page text-ink">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-32 md:px-10">
        <h1 className="font-display text-4xl leading-tight">Privacy</h1>
        <p className="mt-6 text-base leading-relaxed text-gray-faded">
          Placeholder — real privacy policy to be written before launch.
        </p>
      </main>
    </div>
  );
}
