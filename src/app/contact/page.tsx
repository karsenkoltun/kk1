import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Let's Talk",
  description:
    "Get in touch with Karsen Koltun. Whether you're buying, selling, or just have questions about the Kelowna market.",
  keywords: [
    "contact Karsen Koltun",
    "Kelowna realtor contact",
    "Royal LePage Kelowna phone",
    "real estate consultation Kelowna",
  ],
  alternates: { canonical: "https://karsenkoltun.ca/contact" },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
