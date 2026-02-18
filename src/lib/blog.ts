import type { BlogPost } from "@/types";
import posts from "@/content/blog";

/** Get all blog posts sorted by date (newest first) */
export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Get a single blog post by its slug */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Get all slugs that have full content (for generateStaticParams) */
export function getAllSlugs(): string[] {
  return posts.filter((p) => p.content).map((p) => p.slug);
}

/** Get all unique categories from published posts */
export function getCategories(): string[] {
  const cats = new Set(posts.map((p) => p.category));
  return Array.from(cats).sort();
}
