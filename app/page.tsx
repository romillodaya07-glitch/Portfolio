import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Ticker } from "@/components/Ticker";
import { Explore } from "@/components/Explore";
import { StickerPlayground } from "@/components/StickerPlayground";
import { meta } from "@/lib/content";
import { socialMetadata } from "@/lib/social";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  ...socialMetadata(meta.title, meta.description, "/"),
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
