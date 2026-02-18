import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import BlogPostClient from "./BlogPostClient";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://karsenkoltun.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ─── Static generation ─── */
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ─── Per-post SEO metadata ─── */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${BASE_URL}/blog/${post.slug}`;
  const description =
    post.metaDescription || post.excerpt;

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_CA",
      url,
      title: `${post.title} | Karsen Koltun`,
      description,
      siteName: "Karsen Koltun | Kelowna Real Estate",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Karsen Koltun"],
      ...(post.image
        ? {
            images: [
              {
                url: post.image.startsWith("http")
                  ? post.image
                  : `${BASE_URL}${post.image}`,
                width: 1200,
                height: 630,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Karsen Koltun`,
      description,
    },
  };
}

/* ─── Page component ─── */
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  /* Only render posts that have full content */
  if (!post || !post.content) notFound();

  /* JSON-LD Article structured data for SEO */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: "Karsen Koltun",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Karsen Koltun | Kelowna Real Estate",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    ...(post.image
      ? {
          image: post.image.startsWith("http")
            ? post.image
            : `${BASE_URL}${post.image}`,
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
