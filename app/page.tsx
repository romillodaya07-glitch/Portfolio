import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Ticker } from "@/components/Ticker";
import { Explore } from "@/components/Explore";
import { StickerPlayground } from "@/components/StickerPlayground";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Ticker />
      <Explore />
      <StickerPlayground />
    </>
  );
}
