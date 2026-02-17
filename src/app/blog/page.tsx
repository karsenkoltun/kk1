import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Kelowna real estate insights, market updates, neighborhood guides, and tips for buyers and sellers.",
};

const categories = [
  "All",
  "Market Updates",
  "Neighborhoods",
  "Buyer Tips",
  "Seller Tips",
  "Lifestyle",
];

const placeholderPosts = [
  {
    slug: "kelowna-market-update-2026",
    title: "Kelowna Real Estate Market Update — Early 2026",
    excerpt:
      "A look at where the Kelowna market stands heading into spring. What buyers and sellers need to know about pricing trends, inventory levels, and what to expect in the months ahead.",
    date: "February 12, 2026",
    readTime: "6 min read",
    category: "Market Updates",
    featured: true,
  },
  {
    slug: "best-neighborhoods-families",
    title: "Best Neighborhoods in Kelowna for Families",
    excerpt:
      "From Glenmore to Upper Mission, here are the top neighborhoods for families looking to settle in the Okanagan.",
    date: "January 28, 2026",
    readTime: "8 min read",
    category: "Neighborhoods",
  },
  {
    slug: "first-time-buyer-guide",
    title: "The Ultimate First-Time Buyer's Guide to Kelowna",
    excerpt:
      "Everything you need to know about buying your first home in Kelowna. From mortgage pre-approval to closing day.",
    date: "January 15, 2026",
    readTime: "10 min read",
    category: "Buyer Tips",
  },
  {
    slug: "preparing-home-for-sale",
    title: "How to Prepare Your Home for Sale in 2026",
    excerpt:
      "The steps that actually matter when getting your home ready for the market. Staging, pricing, and first impressions.",
    date: "December 20, 2025",
    readTime: "7 min read",
    category: "Seller Tips",
  },
  {
    slug: "living-in-lower-mission",
    title: "Living in Lower Mission: What You Need to Know",
    excerpt:
      "An insider's guide to one of Kelowna's most desirable neighborhoods. Beaches, dining, and lifestyle.",
    date: "December 8, 2025",
    readTime: "5 min read",
    category: "Neighborhoods",
  },
  {
    slug: "kelowna-restaurants-2026",
    title: "Best Restaurants in Kelowna — 2026 Guide",
    excerpt:
      "From lakeside patios to hidden gems, a curated list of the best dining experiences in the Okanagan.",
    date: "November 22, 2025",
    readTime: "6 min read",
    category: "Lifestyle",
  },
  {
    slug: "spring-market-seller-tips",
    title: "5 Things Every Seller Should Do Before Spring",
    excerpt:
      "Spring is historically the busiest season for real estate in the Okanagan. Here is how to position your home to sell quickly and for top dollar.",
    date: "November 10, 2025",
    readTime: "5 min read",
    category: "Seller Tips",
  },
  {
    slug: "mortgage-rate-forecast",
    title: "Mortgage Rates in 2026: What Buyers Should Expect",
    excerpt:
      "An overview of where mortgage rates are headed and what that means for your purchasing power in the Kelowna market.",
    date: "October 30, 2025",
    readTime: "7 min read",
    category: "Buyer Tips",
  },
];

const popularPosts = [
  {
    slug: "first-time-buyer-guide",
    title: "The Ultimate First-Time Buyer's Guide to Kelowna",
    date: "January 15, 2026",
  },
  {
    slug: "kelowna-market-update-2026",
    title: "Kelowna Real Estate Market Update — Early 2026",
    date: "February 12, 2026",
  },
  {
    slug: "best-neighborhoods-families",
    title: "Best Neighborhoods in Kelowna for Families",
    date: "January 28, 2026",
  },
  {
    slug: "preparing-home-for-sale",
    title: "How to Prepare Your Home for Sale in 2026",
    date: "December 20, 2025",
  },
  {
    slug: "mortgage-rate-forecast",
    title: "Mortgage Rates in 2026: What Buyers Should Expect",
    date: "October 30, 2025",
  },
];

const featuredPost = placeholderPosts[0];
const gridPosts = placeholderPosts.slice(1);

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-background pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Insights &amp; Guides
          </p>
          <h1 className="mt-4 font-heading text-4xl font-light tracking-tight text-text-primary sm:text-5xl md:text-6xl">
            The <span className="italic text-accent">Blog</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-text-secondary">
            Market updates, neighborhood guides, and real estate tips from
            Kelowna.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-background pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat, i) => (
              <span
                key={cat}
                className={
                  i === 0
                    ? "border border-warm bg-warm px-5 py-2.5 text-xs font-medium tracking-[0.15em] text-background uppercase"
                    : "border border-border bg-background-secondary px-5 py-2.5 text-xs font-medium tracking-[0.15em] text-text-muted uppercase transition-colors duration-300 hover:border-accent/40 hover:text-text-primary cursor-pointer"
                }
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="bg-background pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <article className="group border border-border bg-background-secondary transition-all duration-500 hover:border-accent/30">
            <div className="grid md:grid-cols-2">
              {/* Image Placeholder */}
              <div className="relative aspect-[16/10] overflow-hidden bg-background-tertiary md:aspect-auto md:min-h-[380px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs tracking-[0.2em] text-text-muted uppercase">
                    Featured Image
                  </span>
                </div>
                <div className="absolute inset-0 bg-accent/0 transition-all duration-500 group-hover:bg-accent/5" />

                {/* Featured Badge */}
                <div className="absolute top-4 left-4 bg-warm px-4 py-1.5">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-background uppercase">
                    Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted sm:gap-4">
                  <span className="border border-accent/30 bg-accent/5 px-3 py-1 tracking-[0.15em] text-accent uppercase">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="mt-5 font-heading text-3xl font-medium leading-snug tracking-tight text-text-primary transition-colors group-hover:text-accent md:text-4xl">
                  {featuredPost.title}
                </h2>

                <p className="mt-4 leading-relaxed text-text-secondary">
                  {featuredPost.excerpt}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-accent uppercase">
                  Read Full Article
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Blog Grid + Sidebar */}
      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Main Grid */}
            <div className="grid gap-8 sm:grid-cols-2">
              {gridPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group border border-border bg-background-secondary transition-all duration-500 hover:border-accent/30"
                >
                  {/* Image Placeholder */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-background-tertiary">
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                      <span className="text-xs tracking-[0.2em] text-text-muted uppercase">
                        Blog Image
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-accent/0 transition-all duration-500 group-hover:bg-accent/5" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-background/90 px-3 py-1 backdrop-blur-sm">
                      <span className="text-[10px] font-medium tracking-[0.15em] text-accent uppercase">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="mt-3 font-heading text-xl font-medium leading-snug tracking-tight text-text-primary transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-text-secondary line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-accent uppercase">
                      Read More
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Popular Posts */}
              <div className="border border-border bg-background-secondary p-6">
                <h3 className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-accent uppercase">
                  <Tag className="h-3.5 w-3.5" />
                  Popular Posts
                </h3>
                <div className="mt-5 space-y-0">
                  {popularPosts.map((post, i) => (
                    <div
                      key={post.slug}
                      className="group/item border-b border-border py-4 last:border-b-0 last:pb-0 first:pt-0"
                    >
                      <div className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-accent/10 text-[10px] font-semibold text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="text-sm font-medium leading-snug text-text-primary transition-colors group-hover/item:text-accent cursor-pointer">
                            {post.title}
                          </h4>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-text-muted">
                            <Calendar className="h-2.5 w-2.5" />
                            {post.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="border border-accent/20 bg-accent/5 p-6">
                <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
                  Stay Informed
                </p>
                <h3 className="mt-3 font-heading text-xl font-light text-text-primary">
                  Get Market Updates
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Receive the latest Kelowna real estate insights directly in
                  your inbox. No spam, unsubscribe anytime.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="border border-border bg-background px-4 py-3">
                    <span className="text-sm text-text-muted">
                      Enter your email
                    </span>
                  </div>
                  <span className="flex items-center justify-center gap-2 border border-warm bg-warm px-5 py-3 text-xs font-medium tracking-[0.2em] text-background uppercase cursor-pointer transition-all duration-300 hover:bg-warm-hover">
                    Subscribe
                  </span>
                </div>
              </div>

              {/* Categories Sidebar */}
              <div className="border border-border bg-background-secondary p-6">
                <h3 className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-accent uppercase">
                  Categories
                </h3>
                <div className="mt-5 space-y-0">
                  {[
                    { name: "Market Updates", count: 2 },
                    { name: "Neighborhoods", count: 2 },
                    { name: "Buyer Tips", count: 2 },
                    { name: "Seller Tips", count: 2 },
                    { name: "Lifestyle", count: 1 },
                  ].map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center justify-between border-b border-border py-3 last:border-b-0 last:pb-0 first:pt-0 cursor-pointer transition-colors hover:text-accent"
                    >
                      <span className="text-sm text-text-secondary">
                        {cat.name}
                      </span>
                      <span className="flex h-5 w-5 items-center justify-center bg-accent/10 text-[10px] font-semibold text-accent">
                        {cat.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Load More */}
          <div className="mt-16 text-center">
            <span className="inline-flex items-center gap-3 border border-border px-8 py-4 text-xs font-medium tracking-[0.2em] text-text-muted uppercase cursor-pointer transition-all duration-300 hover:border-accent hover:text-accent">
              Load More Articles
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
