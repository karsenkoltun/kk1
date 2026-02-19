"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { getAllPosts } from "@/lib/blog";

/* ─── Categories ─── */
const categories = [
  "All Categories",
  "Market Trends",
  "Home Buying",
  "Home Selling",
  "Neighborhoods",
  "Lifestyle",
];

/* ─── Blog posts data (single source of truth) ─── */
const allPosts = getAllPosts();

const POSTS_PER_PAGE = 3;

export default function BlogPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /* ─── Filter posts ─── */
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setShowCategoryDropdown(false);
    setCurrentPage(1);
  };

  /* ─── Build page numbers ─── */
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, "...", totalPages);
    }
    return pages;
  };

  return (
    <>
      {/* ════════════════════════════════════════
          HERO — Full-width with background image
          ════════════════════════════════════════ */}
      <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0C1220 0%, #111827 30%, #1a2744 50%, #1e293b 70%, #0f172a 100%)",
            }}
          />
          {/* Ambient glow orbs for depth */}
          <div className="absolute top-1/3 right-1/4 h-[400px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-[300px] w-[400px] rounded-full bg-warm/4 blur-[100px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 pt-24 pb-12 text-center sm:px-6 sm:pt-28 sm:pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-heading text-5xl font-light tracking-tight text-text-primary sm:text-6xl md:text-7xl"
          >
            Blog
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-text-secondary"
          >
            Insights &amp; advice to help you navigate
            <br className="hidden sm:block" />
            Kelowna&apos;s luxury real estate market.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto mt-8 max-w-md"
          >
            <div className="flex items-center border border-text-secondary/30 bg-background/30 backdrop-blur-sm">
              <input
                type="text"
                placeholder="Search the blog..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1 bg-transparent px-5 py-3.5 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none"
              />
              <button className="flex items-center justify-center px-4 py-3.5 text-text-secondary transition-colors hover:text-accent">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BREADCRUMB + HEADER + CATEGORY FILTER
          ════════════════════════════════════════ */}
      <section className="bg-background pt-10 pb-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-muted">
            <Link href="/" className="transition-colors hover:text-text-primary">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-text-secondary">Blog</span>
          </nav>

          {/* Latest Articles + Category Filter */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="font-heading text-3xl font-light tracking-tight text-text-primary sm:text-4xl">
              Latest Articles
            </h2>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex min-w-[200px] items-center justify-between border border-border bg-background-secondary px-5 py-3 text-sm text-text-primary transition-colors hover:border-accent/40"
              >
                <span>{selectedCategory}</span>
                <ChevronDown
                  className={`ml-3 h-4 w-4 text-text-muted transition-transform duration-200 ${
                    showCategoryDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showCategoryDropdown && (
                <div className="absolute right-0 z-20 mt-1 w-full min-w-[200px] border border-border bg-background-secondary shadow-xl">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`block w-full px-5 py-3 text-left text-sm transition-colors hover:bg-accent/10 hover:text-accent ${
                        selectedCategory === cat
                          ? "bg-accent/5 text-accent"
                          : "text-text-secondary"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BLOG CARD GRID
          ════════════════════════════════════════ */}
      <section className="bg-background pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {paginatedPosts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-text-secondary">
                No articles found. Try a different search or category.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group overflow-hidden rounded-lg bg-background-secondary"
                >
                  {/* Image placeholder */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, #111827 0%, #1e293b 50%, #0f172a 100%)`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent/90 px-3 py-1.5 text-[11px] font-semibold tracking-[0.1em] text-background uppercase">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-xs text-text-muted">{post.date}</p>

                    <h3 className="mt-3 font-heading text-xl font-medium leading-snug tracking-tight text-text-primary transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-text-secondary line-clamp-2">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      Read More &gt;
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* ════════════════════════════════════════
              PAGINATION
              ════════════════════════════════════════ */}
          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center border border-border text-text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-muted"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`dots-${idx}`} className="px-2 text-text-muted">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`flex h-10 w-10 items-center justify-center border text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "border-accent bg-accent text-background"
                        : "border-border text-text-secondary hover:border-accent hover:text-accent"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center border border-border text-text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-muted"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
