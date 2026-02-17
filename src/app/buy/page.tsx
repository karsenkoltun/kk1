import type { Metadata } from "next";
import BuyPageClient from "./BuyPageClient";

export const metadata: Metadata = {
  title: "Buy a Home",
  description:
    "Find your dream home in Kelowna with Karsen Koltun. Expert guidance through every step of the buying process.",
};

export default function BuyPage() {
  return <BuyPageClient />;
}
