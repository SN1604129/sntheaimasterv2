import type { Metadata } from "next";
import { profile } from "@/content/profile";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${profile.name}`,
      description,
      url: path,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Sudipta Nath — AI Engineer in Sydney",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${profile.name}`,
      description,
      images: ["/opengraph-image"],
    },
  };
}
