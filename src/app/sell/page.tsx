import type { Metadata } from "next";
import SellPageClient from "./SellPageClient";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "List your home with Karsen Koltun. A completely different approach to selling homes in Kelowna, rooted in strategy, content, and digital marketing.",
};

export default function SellPage() {
  return <SellPageClient />;
}
