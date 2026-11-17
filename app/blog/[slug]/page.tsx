import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, formatPostDate } from "@/content/blog";
import { ArticleActions } from "@/components/article-actions";
import { BrandMark } from "@/components/brand";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  if (!post) return {};
  const base = pageMetadata(post.seoTitle || post.title, post.description, `/blog/${post.slug}`);
  return {
    ...base,
    ...(post.seoTitle ? { title: { absolute: post.seoTitle } } : {}),
    keywords: post.keywords,
    openGraph: { ...base.openGraph, type: "article" as const, authors: [profile.url], ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}), tags: post.tags },
    robots: { index: post.published, follow: true },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { default: Content } = await post.load();
  const structuredData = [
    ...(post.published ? [{ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.publishedAt, author: { "@type": "Person", name: profile.name, url: profile.url }, publisher: { "@type": "Person", name: profile.name, url: profile.url }, mainEntityOfPage: `${profile.url}/blog/${post.slug}`, image: `${profile.url}/opengraph-image`, keywords: post.keywords.join(", ") }] : []),
    ...(post.faq.length ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: post.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }] : []),
  ];
  return (
    <article className="article-page container">
      {structuredData.map((schema) => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
      <Link className="back-link" href="/blog">
        ← All notes
      </Link>
      <header className="article-header">
        <div className="post-meta">
          <span>{post.category}</span>
          <span className="status-tag">{post.status}</span>
        </div>
        <h1>{post.title}</h1>
        <p>
          {profile.name} · {post.readingTime}
          {post.publishedAt && (
            <>
              {" "}
              ·{" "}
              <time dateTime={post.publishedAt}>
                {formatPostDate(post.publishedAt)}
              </time>
            </>
          )}
        </p>
        {post.tags.length > 0 && <ul className="tag-list article-tags" aria-label="Article topics">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
      </header>
      <div className="prose">
        <Content />
      </div>
      <ArticleActions
        title={post.title}
        url={`${profile.url}/blog/${post.slug}`}
      />
      {post.projectSlug && (
        <Link
          className="article-project-link"
          href={`/projects/${post.projectSlug}`}
        >
          Explore the project behind this note{" "}
          <span aria-hidden="true">↗</span>
        </Link>
      )}
      <div className="article-end">
        <BrandMark />
        <p>
          Have a question about this work?
          <br />
          <a href={`mailto:${profile.email}`}>Let’s talk.</a>
        </p>
      </div>
    </article>
  );
}
