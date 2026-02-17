import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://karsenkoltun.com";

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Creates a consistent Metadata object for any page.
 *
 * Usage:
 *   export const metadata = createMetadata({
 *     title: "Sell Your Home",
 *     description: "List your Kelowna property ...",
 *     path: "/sell",
 *   });
 */
export function createMetadata({
  title,
  description = "Premium real estate services in Kelowna, BC. Buy, sell, or get your home value with Karsen Koltun at Royal LePage.",
  path = "",
  ogImage = "/og-image.jpg",
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const url = `${BASE_URL}${path}`;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${BASE_URL}${ogImage}`;

  return {
    title: title ?? {
      default: "Karsen Koltun | Kelowna Real Estate",
      template: "%s | Karsen Koltun",
    },
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_CA",
      url,
      siteName: "Karsen Koltun | Kelowna Real Estate",
      title: title
        ? `${title} | Karsen Koltun`
        : "Karsen Koltun | Kelowna Real Estate",
      description,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: "Karsen Koltun — Kelowna Real Estate",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title
        ? `${title} | Karsen Koltun`
        : "Karsen Koltun | Kelowna Real Estate",
      description,
      images: [fullOgImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
