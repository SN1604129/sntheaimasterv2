import Link from "next/link";
import { footerContent, profile } from "@/content/profile";
import { Icon } from "./icon";
import { Brand } from "./brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-brand-row">
          <Link href="/">
            <Brand />
          </Link>
          <p>{profile.name} · AI Engineer · Sydney</p>
        </div>
        <div className="footer-contact">
          <span>{footerContent.invitation}</span>
          <a href={`mailto:${profile.email}`}>
            {profile.email}
            <Icon name="external" />
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {profile.name}.{" "}
            <span>{footerContent.note}</span>
          </p>
          <nav aria-label="Footer navigation">
            <Link href="/blog">Blog</Link>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Icon name="external" />
            </a>
            <Link href="/resume">Resume</Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
