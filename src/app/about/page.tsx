import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Karsen",
  description:
    "Get to know Karsen Koltun. 8+ years in marketing, 300+ homes marketed across British Columbia, and a completely different approach to real estate.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
