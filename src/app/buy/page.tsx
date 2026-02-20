import type { Metadata } from "next";
import BuyPageClient from "./BuyPageClient";

export const metadata: Metadata = {
  title: "Buy a Home",
  description:
    "Find your dream home in Kelowna with Karsen Koltun. Expert guidance through every step of the buying process.",
  keywords: [
    "buy home Kelowna",
    "Kelowna buyer agent",
    "homes for sale Kelowna",
    "first time home buyer Kelowna",
    "Okanagan homes for sale",
    "Kelowna real estate listings",
    "buy property Okanagan",
  ],
  alternates: { canonical: "https://karsenkoltun.ca/buy" },
};

export default function BuyPage() {
  return <BuyPageClient />;
}
