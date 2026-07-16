import type { Metadata, Viewport } from "next";

/**
 * Studio layout — passthrough. Bypasses root layout's font styling so the
 * Studio uses its own UI. Also exports metadata + viewport (noindex) since
 * the child page.tsx is a Client Component and can't export them itself.
 */
export const metadata: Metadata = {
  title: "Karst Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
