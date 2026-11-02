import type { Metadata } from "next";
import { About } from "@/components/About";
import { Principles } from "@/components/Principles";
import { WhatShouldRomilDo } from "@/components/WhatShouldRomilDo";
import { meta } from "@/lib/content";
import { socialMetadata } from "@/lib/social";

const title = `About — ${meta.name}`;
const description =
  "Get to know Romil Lodaya: a brand strategist, marketer, and builder working across strategy, creativity, and people.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  ...socialMetadata(title, description, "/about"),
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
