import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { StatsBand } from "@/components/StatsBand";
import { Explore } from "@/components/Explore";
import { StickerPlayground } from "@/components/StickerPlayground";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <StatsBand />
      <Explore />
      <StickerPlayground />
    </>
  );
}
