import type { Metadata } from "next";
import { Moments } from "@/components/Moments";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: `Moments — ${meta.name}`,
  description: "People. Platforms. Perspectives. A more grounded me.",
  alternates: { canonical: "/moments" },
  openGraph: {
    title: `Moments — ${meta.name}`,
    description: "People. Platforms. Perspectives. A more grounded me.",
    type: "website",
    url: "/moments",
  },
};

export default function MomentsPage() {
  return (
    <div className="pt-16">
      <Moments />
    </div>
  );
}
