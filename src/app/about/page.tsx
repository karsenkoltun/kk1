import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Karsen",
  description:
    "Get to know Karsen Koltun. 8+ years in marketing, 300+ homes marketed across British Columbia, and a completely different approach to real estate.",
  keywords: [
    "Karsen Koltun realtor",
    "Kelowna real estate agent",
    "Royal LePage Kelowna agent",
    "Okanagan realtor",
    "Kelowna luxury realtor",
  ],
  alternates: { canonical: "https://karsenkoltun.ca/about" },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
