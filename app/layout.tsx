import type { Metadata, Viewport } from "next";
import { Anton, Patrick_Hand, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { meta } from "@/lib/content";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PageTransition } from "@/components/PageTransition";
import { IntroLoader } from "@/components/IntroLoader";
import { ColorMorph } from "@/components/ColorMorph";
import { KonamiEasterEgg } from "@/components/KonamiEasterEgg";

const sans = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const display = Sora({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Hero-only typefaces: existing site typography stays on Sora.
const heroDisplay = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hero-display",
  display: "swap",
});

const heroHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hero-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${heroDisplay.variable} ${heroHand.variable}`}>
      <body>
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>
        <ColorMorph />
        <div className="grain" aria-hidden="true" />
        <CustomCursor />
        <IntroLoader />
        <KonamiEasterEgg />
        <SmoothScroll>
          <ScrollProgress />
          <Nav />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
