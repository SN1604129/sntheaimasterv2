"use client";

import { useEffect, useState } from "react";
import { Icon } from "./icon";

export function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* Theme still works when storage is unavailable. */
    }
  }

  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} />
    </button>
  );
}
