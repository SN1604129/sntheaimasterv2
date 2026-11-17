import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { posts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  // Draft blog articles are intentionally omitted until reviewed and published.
  return [
    "/",
    "/work-with-me",
    "/blog",
    "/resume",
    "/privacy",
    ...projects.map(({ slug }) => `/projects/${slug}`),
    ...posts
      .filter(({ published }) => published)
      .map(({ slug }) => `/blog/${slug}`),
  ].map((path) => ({
    url: `${profile.url}${path === "/" ? "" : path}`,
    changeFrequency: path === "/blog" ? "daily" : path === "/" ? "monthly" : "yearly",
    lastModified: posts.find((post) => path === `/blog/${post.slug}`)?.publishedAt || undefined,
    priority: path === "/" ? 1 : path === "/work-with-me" ? 0.9 : 0.7,
  }));
}
