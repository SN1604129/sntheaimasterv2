import Link from "next/link";
import { writingPage as copy } from "@/content/pages";
import { listedPosts, formatPostDate } from "@/content/blog";
import { profile } from "@/content/profile";
import { BlogBrowser } from "@/components/blog-browser";
import { BrandMark } from "@/components/brand";
import { Icon } from "@/components/icon";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata(
    "Blog — AI engineering notes",
    "Practical notes by Sudipta Nath on LLMs, RAG, evaluation, NLP and robotics. Read the engineering decisions behind the projects.",
    "/blog",
  ),
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
};

export default function BlogPage() {
  const articles = listedPosts.map(
    ({
      slug,
      title,
      description,
      category,
      published,
      publishedAt,
      readingTime,
      image,
    }) => ({
      slug,
      title,
      description,
      category,
      published,
      dateLabel: publishedAt ? formatPostDate(publishedAt) : null,
      readingTime,
      image,
    }),
  );
  return (
    <div className="container blog-index journal-page">
      <header className="journal-hero">
        <div>
          <p className="eyebrow">The blog / SN The AI Master</p>
          <h1>
            {copy.headline.lead}
            <br />
            <span>{copy.headline.accent}</span>
          </h1>
          <p>{copy.introduction}</p>
          <div className="journal-byline">
            <BrandMark />
            <span>
              By {profile.name}
              <small>AI Engineer · Sydney</small>
            </span>
          </div>
        </div>
        <aside className="journal-manifesto">
          <span className="eyebrow">Inside the build</span>
          <p>
            The experiment.
            <br />
            The failure.
            <br />
            <span>The lesson.</span>
          </p>
          <a className="text-link" href="/blog/feed.xml">
            <Icon name="rss" />
            Follow via RSS
          </a>
        </aside>
      </header>
      {process.env.NODE_ENV === "development" &&
        listedPosts.some((post) => !post.published) && (
          <p className="draft-preview-note">
            Local preview includes unpublished drafts. Only published articles
            appear on the production blog and RSS feed.
          </p>
        )}
      <BlogBrowser articles={articles} />
      <section className="journal-bottom" aria-labelledby="journal-next">
        <div>
          <p className="eyebrow">Go deeper</p>
          <h2 id="journal-next">
            Read the note.
            <br />
            Explore the system.
          </h2>
          <p>
            Project case studies show the architecture, decisions and evidence
            behind the writing.
          </p>
          <Link className="text-link" href="/projects">
            Explore projects <Icon name="arrow" />
          </Link>
        </div>
        <div className="journal-follow">
          <Icon name="rss" />
          <h3>Keep up with new notes.</h3>
          <p>
            Add the feed to your RSS reader. New published articles appear
            automatically.
          </p>
          <a className="button" href="/blog/feed.xml">
            Open RSS feed <Icon name="external" />
          </a>
          <a
            className="text-link"
            href={`mailto:${profile.email}?subject=Question%20about%20your%20blog`}
          >
            Suggest a topic <Icon name="mail" />
          </a>
        </div>
      </section>
    </div>
  );
}
