import type { Metadata } from "next";
import SellPageClient from "./SellPageClient";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "List your home with Karsen Koltun. A completely different approach to selling homes in Kelowna, rooted in strategy, content, and digital marketing.",
  keywords: [
    "sell home Kelowna",
    "list house Kelowna",
    "Kelowna listing agent",
    "CMA Kelowna",
    "home selling strategy",
    "Royal LePage Kelowna listing",
    "Okanagan real estate agent",
  ],
  alternates: { canonical: "https://karsenkoltun.ca/sell" },
};

export default function SellPage() {
  return <SellPageClient />;
}
