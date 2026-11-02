import type { Metadata } from "next";
import { About } from "@/components/About";
import { Principles } from "@/components/Principles";
import { WhatShouldRomilDo } from "@/components/WhatShouldRomilDo";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: `About — ${meta.name}`,
  description:
    "Get to know Romil Lodaya: a brand strategist, marketer, and builder working across strategy, creativity, and people.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${meta.name}`,
    description:
      "Get to know Romil Lodaya: a brand strategist, marketer, and builder working across strategy, creativity, and people.",
    type: "website",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <About />
      <WhatShouldRomilDo />
      <Principles />
    </div>
  );
}
