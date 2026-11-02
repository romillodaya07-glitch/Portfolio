import type { Metadata } from "next";
import { WhatIDo } from "@/components/WhatIDo";
import { Experience } from "@/components/Experience";
import { Brands } from "@/components/Brands";
import { Tools } from "@/components/Tools";
import { Certificates } from "@/components/Certificates";
import { Services } from "@/components/Services";
import { meta } from "@/lib/content";
import { socialMetadata } from "@/lib/social";

const title = `Work — ${meta.name}`;
const description = "Strategy, marketing, and people — experience, brands, and the daily stack.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  ...socialMetadata(title, description, "/work"),
};

export default function WorkPage() {
  return (
    <div className="pt-16">
      <WhatIDo />
      <Experience />
      <Brands />
      <Tools />
      <Certificates />
      <Services />
    </div>
  );
}
