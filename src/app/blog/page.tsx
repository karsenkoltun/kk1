import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Kelowna real estate insights, market updates, neighborhood guides, and tips for buyers and sellers.",
};

const placeholderPosts = [
  {
    slug: "kelowna-market-update-2026",
    title: "Kelowna Real Estate Market Update — Early 2026",
    excerpt:
      "A look at where the Kelowna market stands heading into spring. What buyers and sellers need to know right now.",
    date: "February 2026",
    category: "Market Update",
  },
  {
    slug: "best-neighborhoods-families",
    title: "Best Neighborhoods in Kelowna for Families",
    excerpt:
      "From Glenmore to Upper Mission, here are the top neighborhoods for families looking to settle in the Okanagan.",
    date: "January 2026",
    category: "Neighborhood Guide",
  },
  {
    slug: "first-time-buyer-guide",
    title: "The Ultimate First-Time Buyer's Guide to Kelowna",
    excerpt:
      "Everything you need to know about buying your first home in Kelowna. From mortgage pre-approval to closing day.",
    date: "January 2026",
    category: "Buyer Education",
  },
  {
    slug: "preparing-home-for-sale",
    title: "How to Prepare Your Home for Sale in 2026",
    excerpt:
      "The steps that actually matter when getting your home ready for the market. Staging, pricing, and first impressions.",
    date: "December 2025",
    category: "Seller Education",
  },
  {
    slug: "living-in-lower-mission",
    title: "Living in Lower Mission: What You Need to Know",
    excerpt:
      "An insider's guide to one of Kelowna's most desirable neighborhoods. Beaches, dining, and lifestyle.",
    date: "December 2025",
    category: "Neighborhood Guide",
  },
  {
    slug: "kelowna-restaurants-2026",
    title: "Best Restaurants in Kelowna — 2026 Guide",
    excerpt:
      "From lakeside patios to hidden gems, a curated list of the best dining experiences in the Okanagan.",
    date: "November 2025",
    category: "Lifestyle",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-background pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Insights & Guides
          </p>
          <h1 className="mt-4 font-heading text-5xl font-light tracking-tight text-text-primary md:text-6xl">
            The <span className="italic text-accent">Blog</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-text-secondary">
            Market updates, neighborhood guides, and real estate tips from
            Kelowna.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="space-y-0">
            {placeholderPosts.map((post) => (
              <article
                key={post.slug}
                className="group border-b border-border py-10 first:pt-0 transition-colors"
              >
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span className="tracking-[0.15em] text-accent uppercase">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>
                <h2 className="mt-3 font-heading text-2xl font-medium tracking-tight text-text-primary transition-colors group-hover:text-accent md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-accent uppercase">
                  Read More
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
