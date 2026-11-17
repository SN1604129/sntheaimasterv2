"use client";
import { useState } from "react";
import { Icon } from "./icon";

export function ArticleActions({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setError(false);
    } catch {
      setError(true);
    }
  }
  return (
    <div className="article-share">
      <span>Useful to someone?</span>
      <button type="button" className="text-link" onClick={copy}>
        {copied ? "Link copied" : "Copy article link"}
        <Icon name={copied ? "check" : "external"} />
      </button>
      <a
        className="text-link"
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
      >
        Share by email
        <Icon name="mail" />
      </a>
      <span role="status" className="sr-only">
        {copied
          ? "Article link copied to clipboard."
          : error
            ? `Copy this address: ${url}`
            : ""}
      </span>
      {error && <p className="fine-print">{url}</p>}
    </div>
  );
}
