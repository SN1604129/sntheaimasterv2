import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { profile } from "@/content/profile";
import { EngagementTracking } from "@/components/engagement-tracking";

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: {
    default: `${profile.name} — AI Engineer in Sydney`,
    template: `%s | ${profile.name}`,
  },
  description:
    "AI Engineer in Sydney building LLM, RAG and multimodal systems. Explore tested engineering work, research and custom AI services by Sudipta Nath.",
  applicationName: "SN The AI Master — Sudipta Nath",
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg?v=8e01cfc7",
    apple: "/apple-icon?v=8e01cfc7",
  },
  openGraph: { siteName: profile.name, locale: "en_AU", type: "website" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#101313" },
    { media: "(prefers-color-scheme: light)", color: "#f8f9f6" },
  ],
};

const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        {process.env.VERCEL === "1" && (
          <>
            <Analytics />
            <EngagementTracking />
          </>
        )}
      </body>
    </html>
  );
}
