import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Ticker } from "@/components/Ticker";
import { Explore } from "@/components/Explore";
import { StickerPlayground } from "@/components/StickerPlayground";

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
