import type { Metadata } from "next";
import { Moments } from "@/components/Moments";
import { meta } from "@/lib/content";
import { socialMetadata } from "@/lib/social";

const title = `Moments — ${meta.name}`;
const description = "People. Platforms. Perspectives. A more grounded me.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/moments" },
  ...socialMetadata(title, description, "/moments"),
};

export default function MomentsPage() {
  return (
    <div className="pt-16">
      <Moments />
    </div>
  );
}
