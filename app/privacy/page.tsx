import PrivacyContent from "@/content/privacy.mdx";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Privacy",
  "How enquiry information, theme preferences and privacy-friendly site analytics are used on Sudipta Nath’s portfolio.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <article className="container privacy-page">
      <header className="page-hero">
        <p className="eyebrow">Your information</p>
        <h1>Privacy.</h1>
        <p>A brief explanation of what this site collects and why.</p>
      </header>
      <div className="prose">
        <PrivacyContent />
      </div>
    </article>
  );
}
