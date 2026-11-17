"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "./icon";

export type ArticleSummary = {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: boolean;
  dateLabel: string | null;
  readingTime: string;
};

export function BlogBrowser({ articles }: { articles: ArticleSummary[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All topics");
  const categories = [
    "All topics",
    ...new Set(articles.map((post) => post.category)),
  ];
  const filtered = useMemo(
    () =>
      articles.filter(
        (post) =>
          (category === "All topics" || post.category === category) &&
          `${post.title} ${post.description} ${post.category}`
            .toLowerCase()
            .includes(query.toLowerCase().trim()),
      ),
    [articles, query, category],
  );

  return (
    <div className="blog-browser">
      <div className="article-tools">
        <div
          className="topic-filters"
          role="group"
          aria-label="Filter articles by topic"
        >
          {categories.map((topic) => (
            <button
              key={topic}
              type="button"
              aria-pressed={topic === category}
              onClick={() => setCategory(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
        <div className="article-search">
          <Icon name="search" />
          <label className="sr-only" htmlFor="article-search">
            Search articles
          </label>
          <input
            id="article-search"
            type="search"
            placeholder="Find an article…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>
      <p className="article-count" role="status">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {query ? ` matching “${query}”` : ""}
      </p>
      <div className="article-grid">
        {filtered.map((post, index) => (
          <article
            className={`editorial-card ${index === 0 ? "editorial-card-lead" : ""}`}
            key={post.slug}
          >
            <div className="article-card-art" aria-hidden="true">
              <span className="article-art-label">{post.category}</span>
              <div className="article-art-grid">
                <span>INPUT</span>
                <i />
                <span>MODEL</span>
                <i />
                <span>EVIDENCE</span>
              </div>
              <span className="article-art-end">SN / ENGINEERING NOTES</span>
            </div>
            <div className="article-card-copy">
              <div className="post-meta">
                <span>{post.category}</span>
                <span>{post.readingTime}</span>
                {!post.published && (
                  <span className="status-tag">Draft preview</span>
                )}
              </div>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.description}</p>
              <div className="article-card-bottom">
                <span>{post.dateLabel || "Unpublished draft"}</span>
                <Link className="text-link" href={`/blog/${post.slug}`}>
                  {post.published ? "Read article" : "Preview draft"}
                  <Icon name="arrow" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="article-empty">
          <Icon name="code" />
          <h2>
            {articles.length
              ? "No articles match yet."
              : "The first field notes are on the way."}
          </h2>
          <p>
            {articles.length
              ? "Try another topic or a different search."
              : "Practical notes on building, debugging and evaluating AI. Follow the RSS feed to catch new articles."}
          </p>
          {articles.length > 0 && (
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setQuery("");
                setCategory("All topics");
              }}
            >
              Clear filters <Icon name="arrow" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
