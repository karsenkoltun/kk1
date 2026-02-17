import type { Metadata } from "next";
import HomeValueClient from "./HomeValueClient";

export const metadata: Metadata = {
  title: "Free Home Valuation",
  description:
    "Find out what your home is worth. No obligations, no commitments. Real market data from someone who knows Kelowna.",
};

export default function HomeValuePage() {
  return <HomeValueClient />;
}
