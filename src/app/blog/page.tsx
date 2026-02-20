import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights & advice to help you navigate Kelowna's luxury real estate market. Market trends, buying tips, and selling strategies.",
  keywords: [
    "Kelowna real estate blog",
    "Okanagan market trends",
    "Kelowna neighbourhood guides",
    "home buying tips Kelowna",
    "selling home tips BC",
  ],
  alternates: { canonical: "https://karsenkoltun.ca/blog" },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
