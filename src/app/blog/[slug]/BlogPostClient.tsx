"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";
import type { Components } from "react-markdown";

/* ─── Markdown component mapping ─── */
const mdComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-5 font-heading text-2xl font-light tracking-tight text-text-primary sm:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-heading text-xl font-medium text-text-primary">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 text-base leading-[1.85] text-text-secondary">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 ml-6 list-disc space-y-2 text-text-secondary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 ml-6 list-decimal space-y-2 text-text-secondary">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-base leading-relaxed">{children}</li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-accent/40 pl-6 italic text-text-secondary">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border" />,
};

/* ─── Props ─── */
interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const contentStr = post.content || "";

  /* Split content on <!-- STATS --> marker to position stat boxes inline */
  const statMarker = "<!-- STATS -->";
  const hasStatMarker = contentStr.includes(statMarker);
  const contentParts = hasStatMarker
    ? contentStr.split(statMarker)
    : [contentStr];

  /* ─── Stat boxes component ─── */
  const StatBoxes = () =>
    post.stats && post.stats.length > 0 ? (
      <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {post.stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-border bg-background-secondary p-6 text-center"
          >
            <p className="font-heading text-2xl font-semibold tracking-tight text-warm sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs tracking-[0.15em] text-text-muted uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    ) : null;

  return (
    <>
      {/* ════════════════════════════════════════
          HERO HEADER
          ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-background pt-28 pb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 text-sm text-text-muted"
          >
            <Link
              href="/"
              className="transition-colors hover:text-text-primary"
            >
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <Link
              href="/blog"
              className="transition-colors hover:text-text-primary"
            >
              Blog
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-text-secondary">{post.title}</span>
          </motion.nav>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-4xl font-heading text-4xl font-light leading-[1.15] tracking-tight text-text-primary sm:text-5xl md:text-6xl"
          >
            {post.title}
          </motion.h1>

          {/* Meta row: date, category, read time */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 flex flex-wrap items-center gap-4 text-sm text-text-muted"
          >
            <span>{post.date}</span>
            <span className="rounded-full border border-accent/30 bg-accent/5 px-4 py-1 text-xs font-medium tracking-[0.1em] text-accent uppercase">
              {post.category}
            </span>
            {post.readTime && <span>{post.readTime}</span>}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HERO IMAGE
          ════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="mt-10"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            {/* Gradient placeholder — swap for Image when photos are added */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #0C1220 0%, #1a2744 35%, #1e293b 55%, #111827 80%, #0C1220 100%)",
              }}
            />
            <div className="absolute top-1/4 right-1/3 h-[300px] w-[400px] rounded-full bg-warm/5 blur-[120px]" />
            <div className="absolute bottom-0 left-1/4 h-[200px] w-[350px] rounded-full bg-accent/4 blur-[100px]" />
          </div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════
          TWO-COLUMN LAYOUT: Content + Sidebar
          ════════════════════════════════════════ */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
            {/* ──── Main Content ──── */}
            <article>
              {/* Repeat meta row at top of body (matching concept art) */}
              <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-border pb-6 text-sm text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.date}
                </span>
                <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium tracking-[0.1em] text-accent uppercase">
                  {post.category}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                )}
              </div>

              {/* Markdown content — with stat boxes inserted at marker */}
              <div className="blog-prose">
                {hasStatMarker ? (
                  <>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={mdComponents}
                    >
                      {contentParts[0]}
                    </ReactMarkdown>

                    <StatBoxes />

                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={mdComponents}
                    >
                      {contentParts[1]}
                    </ReactMarkdown>
                  </>
                ) : (
                  <>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={mdComponents}
                    >
                      {contentStr}
                    </ReactMarkdown>
                    <StatBoxes />
                  </>
                )}
              </div>

              {/* ──── Bottom CTA ──── */}
              <div className="mt-14 border border-accent/20 bg-background-secondary p-8 md:p-10">
                <h3 className="font-heading text-2xl font-light text-text-primary">
                  Ready to Take the Next Step?
                </h3>
                <p className="mt-3 leading-relaxed text-text-secondary">
                  Whether you&apos;re buying, selling, or just exploring your
                  options, I&apos;d love to help. Let&apos;s talk about your
                  goals and find the right path forward.
                </p>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 border border-warm bg-warm px-8 py-3.5 text-sm font-semibold tracking-wide text-background transition-all duration-300 hover:bg-warm-hover"
                  >
                    Get in Touch
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>

            {/* ──── Sidebar ──── */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-border bg-background-secondary p-6 md:p-8">
                <h3 className="font-heading text-xl font-medium text-text-primary">
                  Get a Free Home Valuation
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Thinking about selling your home? Find out what it&apos;s
                  worth in today&apos;s market.
                </p>

                {/* Image placeholder */}
                <div className="mt-5 aspect-[4/3] w-full overflow-hidden">
                  <div
                    className="h-full w-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #111827 0%, #1e293b 50%, #0f172a 100%)",
                    }}
                  />
                </div>

                <Link
                  href="/home-value"
                  className="mt-6 block w-full border-2 border-warm bg-warm py-3.5 text-center text-sm font-semibold tracking-wide text-background transition-all duration-300 hover:bg-warm-hover"
                >
                  Request Valuation
                </Link>

                <p className="mt-4 text-center text-xs text-text-muted">
                  100% confidential. No obligation.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
