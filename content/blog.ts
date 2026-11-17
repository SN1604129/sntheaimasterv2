import type { ComponentType } from "react";
import { postIndex } from "./blog-index.generated";

export type BlogImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: boolean;
  publishedAt: string | null;
  projectSlug: string | null;
  readingTime: string;
  status: string;
  seoTitle: string | null;
  keywords: string[];
  tags: string[];
  image: BlogImage | null;
  faq: { question: string; answer: string }[];
  load: () => Promise<{ default: ComponentType }>;
};

export const posts: BlogPost[] = [...postIndex].sort(
  (a, b) =>
    (b.publishedAt || "").localeCompare(a.publishedAt || "") ||
    a.title.localeCompare(b.title),
);
export const publishedPosts = posts.filter((post) => post.published);
export const listedPosts =
  process.env.NODE_ENV === "development" ? posts : publishedPosts;

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Australia/Sydney",
  }).format(new Date(`${date}T12:00:00+11:00`));
}
