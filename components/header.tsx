"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, profile } from "@/content/profile";
import { ThemeToggle } from "./theme-toggle";
import { Icon } from "./icon";
import { Brand } from "./brand";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <Brand />
          <span className="sr-only"> — home</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="button button-small header-cta" href="/work-with-me">
            Work with me <Icon name="external" />
          </Link>
          <button
            className="icon-button menu-button"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav container"
          aria-label="Mobile navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <Icon name="arrow" />
            </Link>
          ))}
          <Link href="/work-with-me" onClick={() => setOpen(false)}>
            Work with me
            <Icon name="external" />
          </Link>
        </nav>
      )}
    </header>
  );
}
