import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LenisProvider } from "@/components/motion/LenisProvider";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f1ede4",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://karst.vercel.app"),
  title: "Karst — Interior Design Studio",
  description:
    "We design homes for the people who actually live in them — thoughtfully, materially, and with no visible seams.",
  openGraph: {
    title: "Karst — Interior Design Studio",
    description:
      "We design homes for the people who actually live in them — thoughtfully, materially, and with no visible seams.",
    url: "https://karst.vercel.app",
    siteName: "Karst",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Karst interior — golden hour hallway",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karst — Interior Design Studio",
    description:
      "We design homes for the people who actually live in them — thoughtfully, materially, and with no visible seams.",
    images: ["/og/home.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh">
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
