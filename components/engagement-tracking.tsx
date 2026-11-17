"use client";
import { useEffect } from "react";
import { track } from "@vercel/analytics";

export function EngagementTracking() {
  useEffect(() => {
    function clicked(event: MouseEvent) {
      if (event.button !== 0 || !(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      try {
        if (url.origin === window.location.origin) {
          if (
            url.pathname === "/Sudipta-Nath-Resume.pdf" ||
            url.pathname === "/resume"
          )
            track("Resume opened", {
              action: link.hasAttribute("download") ? "download" : "view",
            });
          else if (/^\/projects\/[a-z0-9-]+$/.test(url.pathname))
            track("Project opened", {
              project: url.pathname.split("/").at(-1)!,
            });
          else if (/^\/blog\/[a-z0-9-]+$/.test(url.pathname))
            track("Article opened", {
              article: url.pathname.split("/").at(-1)!,
            });
        } else if (url.hostname === "github.com") {
          track(url.pathname.split("/").filter(Boolean).length >= 2 ? "Repository opened" : "GitHub profile opened");
        }
      } catch {
        /* Analytics must not interfere with navigation. */
      }
    }
    document.addEventListener("click", clicked);
    return () => document.removeEventListener("click", clicked);
  }, []);
  return null;
}
