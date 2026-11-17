import { publishedPosts } from "@/content/blog";
import { profile } from "@/content/profile";

export const dynamic = "force-static";
const escape = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
  );

export function GET() {
  const items = publishedPosts
    .map(
      (post) =>
        `<item><title>${escape(post.title)}</title><link>${profile.url}/blog/${post.slug}</link><guid isPermaLink="true">${profile.url}/blog/${post.slug}</guid><description>${escape(post.description)}</description><category>${escape(post.category)}</category><pubDate>${new Date(`${post.publishedAt}T12:00:00+11:00`).toUTCString()}</pubDate></item>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>SN The AI Master — Engineering Notes</title><link>${profile.url}/blog</link><description>AI engineering notes by ${profile.name}.</description><language>en-AU</language><atom:link href="${profile.url}/blog/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
