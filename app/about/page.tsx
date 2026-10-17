import type { Metadata } from "next";
import { About } from "@/components/About";
import { Principles } from "@/components/Principles";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: `About — ${meta.name}`,
  description: meta.description,
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <About />
      <Principles />
    </div>
  );
}
