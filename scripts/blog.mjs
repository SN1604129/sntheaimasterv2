import { readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const directory = fileURLToPath(new URL("../content/posts/", import.meta.url));
const [action, ...args] = process.argv.slice(2);
if (action === "new") {
  const title = args.join(" ").trim();
  const slug = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (!slug) throw new Error('Usage: npm run blog:new -- "Your article title"');
  const metadataPath = path.join(directory, `${slug}.json`);
  const bodyPath = path.join(directory, `${slug}.mdx`);
  for (const target of [metadataPath, bodyPath]) {
    try {
      await access(target);
      throw new Error(`Already exists: ${target}`);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  await writeFile(
    metadataPath,
    JSON.stringify(
      {
        title,
        description: "TODO: Write a useful one-sentence introduction.",
        category: "Engineering",
        published: false,
        publishedAt: null,
        projectSlug: null,
      },
      null,
      2,
    ) + "\n",
    { flag: "wx" },
  );
  await writeFile(
    bodyPath,
    "## The question\n\nTODO: Explain one concrete problem your reader cares about.\n\n## What I tried\n\nTODO: Add your own example, code or evidence.\n\n## What I learned\n\nTODO: Explain the result and its limits.\n\n## Try it yourself\n\nTODO: Add a reproducible example or useful next step.\n",
    { flag: "wx" },
  );
  console.log(
    `Created draft: content/posts/${slug}.mdx\nEdit its matching JSON metadata, then publish with: npm run blog:publish -- ${slug}`,
  );
} else if (action === "publish") {
  const [slug] = args;
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    throw new Error("Usage: npm run blog:publish -- article-slug");
  const target = path.join(directory, `${slug}.json`);
  const post = JSON.parse(await readFile(target, "utf8"));
  const body = await readFile(path.join(directory, `${slug}.mdx`), "utf8");
  if (/TODO:/.test(post.description + body))
    throw new Error(
      "Replace the TODO placeholders before publishing this draft.",
    );
  post.published = true;
  post.publishedAt ||= new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  await writeFile(target, JSON.stringify(post, null, 2) + "\n");
  console.log(
    `Marked ${slug} as published. Deploy the updated source when ready to make it live.`,
  );
} else {
  throw new Error("Use npm run blog:new or npm run blog:publish.");
}
await import("./generate-blog.mjs");
