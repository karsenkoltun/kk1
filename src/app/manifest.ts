import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Karsen Koltun | Kelowna Real Estate",
    short_name: "Karsen Koltun",
    description:
      "Premium real estate services in Kelowna, BC. Buy, sell, or get your home value with Karsen Koltun at Royal LePage.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
