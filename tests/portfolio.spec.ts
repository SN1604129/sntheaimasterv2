import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

const additions: { slug: string; published?: boolean }[] = JSON.parse(readFileSync(new URL("../content/project-additions.json", import.meta.url), "utf8"));
const draftMetadata = JSON.parse(readFileSync(new URL("../content/posts/why-my-vision-language-model-missed-small-document-edits.json", import.meta.url), "utf8"));

const routes = [
  "/",
  "/projects",
  "/work-with-me",
  "/projects/truuth-document-forensics",
  "/projects/stix-eatery",
  "/projects/smart-financial-assistant",
  "/projects/healthcare-nlp",
  "/projects/ros2-robot-vision",
  ...additions.filter((project) => project.published !== false).map((project) => `/projects/${project.slug}`),
  "/blog",
  "/blog/ai-for-small-business-sydney-2026",
  "/blog/why-my-vision-language-model-missed-small-document-edits",
  "/resume",
  "/privacy",
];

test("all routes render semantic pages at 375px, 768px and 1440px without overflow", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), `${route} at ${width}px`).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflow, `${route} overflows at ${width}px`).toBe(false);
      await expect(page.locator("footer")).toContainText(
        "sudipta1604129@gmail.com",
      );
      if (
        route === "/" ||
        route === "/work-with-me" ||
        route === "/blog" ||
        route === "/projects"
      ) {
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({
          path: `artifacts/${route === "/" ? "home" : route === "/work-with-me" ? "services" : route.slice(1)}-dark-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
});

test("first published article has the supplied SEO metadata, matching FAQ schema and publication links", async ({ page, request }) => {
  const path = "/blog/ai-for-small-business-sydney-2026";
  await page.goto(path);
  await expect(page).toHaveTitle("AI for Small Business in Sydney: A Practical 2026 Guide");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /5 practical ways Sydney businesses/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://sntheaimaster.com${path}`);
  const imagePath = "/images/blog/ai-for-small-business-sydney-2026.png";
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `https://sntheaimaster.com${imagePath}`);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", `https://sntheaimaster.com${imagePath}`);
  const cover = page.locator(".article-cover img");
  await expect(cover).toBeVisible();
  await expect.poll(() => cover.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
  await expect(page.locator(".article-faq h3")).toHaveCount(4);
  await expect(page.locator(".prose")).not.toContainText("SEO pack");
  await expect(page.locator(".prose")).not.toContainText("Tell me in the comments");
  const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent || "{}")));
  expect(schemas.find((schema) => schema["@type"] === "BlogPosting").datePublished).toBe("2026-11-18");
  expect(schemas.find((schema) => schema["@type"] === "BlogPosting").image).toBe(`https://sntheaimaster.com${imagePath}`);
  expect(schemas.find((schema) => schema["@type"] === "FAQPage").mainEntity).toHaveLength(4);
  await page.goto("/blog");
  await expect(page.locator(".editorial-card").first()).toContainText("AI for Small Business in Sydney");
  await expect(page.locator(".editorial-card").first().locator("img")).toBeVisible();
  expect((await request.get(imagePath)).headers()["content-type"]).toContain("image/png");
  expect(await (await request.get("/blog/feed.xml")).text()).toContain(`https://sntheaimaster.com${path}`);
  expect(await (await request.get("/sitemap.xml")).text()).toContain(`https://sntheaimaster.com${path}`);
});

test("mobile navigation, keyboard focus and persistent theme work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Research" })
    .click();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#research$/);
});

test("WCAG AA checks pass on every route in dark and light mode", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const theme of ["dark", "light"]) {
    await page.addInitScript(
      (value) => localStorage.setItem("portfolio-theme", value),
      theme,
    );
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(
        results.violations,
        `${route}, ${theme}: ${JSON.stringify(results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) })))}`,
      ).toEqual([]);
    }
  }
});

async function fillEnquiry(page: Page) {
  await page.getByLabel("Name", { exact: false }).fill("Test Visitor");
  await page.getByLabel("Email", { exact: false }).fill("visitor@example.com");
  await page.getByLabel("Business / Organisation").fill("Sample business");
  await page
    .getByLabel("Project details", { exact: false })
    .fill(
      "A source-grounded support assistant for a synthetic knowledge base.",
    );
}

test("form validates required fields, preserves input on failure and succeeds only on provider acceptance", async ({
  page,
}) => {
  await page.goto("/work-with-me?service=AI%20chatbot%2Fagent#enquiry");
  await expect(page.getByLabel("Service needed")).toHaveValue(
    "AI chatbot/agent",
  );
  await page.getByRole("button", { name: "Send project enquiry" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(
    page.getByText("Please enter your email address."),
  ).toBeVisible();
  await expect(
    page.getByText("Tell me a little about your project."),
  ).toBeVisible();
  await expect(page.getByLabel("Name", { exact: false })).toBeFocused();
  await fillEnquiry(page);

  let calls = 0;
  await page.route("https://api.web3forms.com/submit", async (route) => {
    calls++;
    const payload = route.request().postDataJSON();
    expect(payload.subject).toBe("New Website Enquiry – AI chatbot/agent");
    expect(payload.botcheck).toBe(false);
    expect(payload.replyto).toBe("visitor@example.com");
    await new Promise((resolve) => setTimeout(resolve, 150));
    await route.fulfill({
      status: calls === 1 ? 422 : 200,
      contentType: "application/json",
      body: JSON.stringify({ success: calls !== 1 }),
    });
  });
  await page.getByRole("button", { name: "Send project enquiry" }).click();
  await expect(page.locator(".form-error-notice")).toContainText(
    "Your enquiry could not be sent.",
  );
  await expect(page.getByLabel("Name", { exact: false })).toHaveValue(
    "Test Visitor",
  );
  await page.getByRole("button", { name: "Send project enquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Thanks! I'll reply within 24 hours.",
  );
  expect(calls).toBe(2);
});

test("network failure allows retry and the honeypot prevents submission", async ({
  page,
}) => {
  await page.goto("/work-with-me#enquiry");
  await fillEnquiry(page);
  let calls = 0;
  await page.route("https://api.web3forms.com/submit", async (route) => {
    calls++;
    await route.abort("failed");
  });
  await page.locator("#botcheck").evaluate((input: HTMLInputElement) => {
    input.checked = true;
  });
  await page.getByRole("button", { name: "Send project enquiry" }).click();
  expect(calls).toBe(0);
  await page.locator("#botcheck").evaluate((input: HTMLInputElement) => {
    input.checked = false;
  });
  await page.getByRole("button", { name: "Send project enquiry" }).click();
  await expect(page.locator(".form-error-notice")).toContainText(
    "Your enquiry could not be sent.",
  );
  await expect(page.getByLabel("Email", { exact: false })).toHaveValue(
    "visitor@example.com",
  );
});

test("resume, SEO endpoints, missing routes and legacy redirects respond correctly", async ({
  request,
}) => {
  const pdf = await request.get("/Sudipta-Nath-Resume.pdf");
  expect(pdf.ok()).toBe(true);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "sntheaimaster.com/sitemap.xml",
  );
  const og = await request.get("/opengraph-image");
  expect(og.ok()).toBe(true);
  expect(og.headers()["content-type"]).toContain("image/png");
  const feed = await request.get("/blog/feed.xml");
  expect(feed.status()).toBe(200);
  expect(feed.headers()["content-type"]).toContain("application/rss+xml");
  const feedBody = await feed.text();
  if (!draftMetadata.published) expect(feedBody).not.toContain("/blog/why-my-vision-language-model-missed-small-document-edits");
  expect((await request.get("/brand/sn-the-ai-master-dark.svg")).status()).toBe(
    200,
  );
  expect((await request.get("/projects/missing-project")).status()).toBe(404);
  expect((await request.get("/unknown")).status()).toBe(404);
  const contact = await request.get("/contact", { maxRedirects: 0 });
  expect(contact.status()).toBe(308);
  expect(contact.headers().location).toBe("/work-with-me#enquiry");
});

test("university projects lead the homepage and the project index filters by real work", async ({
  page,
}) => {
  await page.goto("/");
  expect((await page.locator(".featured-grid h3").allTextContents()).slice(0, 3).map((title) => title.trim())).toEqual([
    "Smart Financial Assistant",
    "Healthcare NLP System",
    "ROS2 Robot Vision & Navigation",
  ]);
  await page.goto("/projects");
  await page.getByRole("button", { name: "University", exact: true }).click();
  await expect(page.locator(".project-index-grid")).toContainText("Smart Financial Assistant");
  await expect(page.locator(".project-index-grid")).not.toContainText("Stix Eatery Platform");
  await page.getByRole("button", { name: "Industry", exact: true }).click();
  await expect(page.locator(".project-index-grid")).toContainText("Truuth Document Forensics Pipeline");
  await expect(page.locator(".project-index-grid")).not.toContainText("Healthcare NLP System");
  await page.getByRole("button", { name: "Client", exact: true }).click();
  await expect(page.locator(".project-index-grid")).toContainText("Stix Eatery Platform");
  await expect(page.locator(".project-index-grid")).not.toContainText("Healthcare NLP System");
});

test("blog search, topic filtering and article links work with draft previews", async ({
  page,
}) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Inside the build.",
  );
  await page.getByLabel("Search articles").fill("no-matching-article");
  await expect(page.getByText("No articles match yet.")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByLabel("Search articles").fill("vision-language model missed");
  await page
    .getByRole("button", { name: "Multimodal AI", exact: true })
    .click();
  await expect(page.locator(".editorial-card")).toHaveCount(1);
  await page.locator(".editorial-card .text-link").click();
  await expect(page).toHaveURL(
    /why-my-vision-language-model-missed-small-document-edits/,
  );
  await expect(
    page.getByRole("link", { name: "Explore the project behind this note" }),
  ).toHaveAttribute("href", "/projects/truuth-document-forensics");
  if (!draftMetadata.published) await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy article link" }).click();
  await expect(page.getByRole("button", { name: "Link copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("https://sntheaimaster.com/blog/why-my-vision-language-model-missed-small-document-edits");
});
