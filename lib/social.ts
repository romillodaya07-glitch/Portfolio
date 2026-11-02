const socialImage = {
  url: "/open-graph.png",
  width: 1734,
  height: 907,
  alt: "A bold, playful portfolio card for Romil Lodaya with the message Ideas. People. Impact.",
} as const;

export function socialMetadata(title: string, description: string, url: string) {
  return {
    openGraph: {
      title,
      description,
      type: "website" as const,
      url,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [socialImage.url],
    },
  };
}
