import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights & advice to help you navigate Kelowna's luxury real estate market. Market trends, buying tips, and selling strategies.",
};

export default function BlogPage() {
  return <BlogPageClient />;
}
