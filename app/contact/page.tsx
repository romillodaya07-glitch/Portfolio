import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: `Contact — ${meta.name}`,
  description: "Let's connect. Let's grow. Let's build.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${meta.name}`,
    description: "Let's connect. Let's grow. Let's build.",
    type: "website",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <Contact />
    </div>
  );
}
