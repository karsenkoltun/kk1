import type { Metadata } from "next";
import HomeValueClient from "./HomeValueClient";

export const metadata: Metadata = {
  title: "Free Home Valuation",
  description:
    "Find out what your home is worth. No obligations, no commitments. Real market data from someone who knows Kelowna.",
  keywords: [
    "home value Kelowna",
    "free home valuation Kelowna",
    "what is my home worth Kelowna",
    "CMA Kelowna",
    "property valuation Okanagan",
    "Kelowna home appraisal",
  ],
  alternates: { canonical: "https://karsenkoltun.ca/home-value" },
};

export default function HomeValuePage() {
  return <HomeValueClient />;
}
