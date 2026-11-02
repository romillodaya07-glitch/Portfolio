import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { meta } from "@/lib/content";
import { socialMetadata } from "@/lib/social";

const title = `Contact — ${meta.name}`;
const description = "Let's connect. Let's grow. Let's build.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  ...socialMetadata(title, description, "/contact"),
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <Contact />
    </div>
  );
}
