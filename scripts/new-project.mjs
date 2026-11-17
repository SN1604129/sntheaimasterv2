import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const title = process.argv.slice(2).join(" ").trim();
const slug = title
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
if (!slug)
  throw new Error('Usage: npm run project:new -- "Your project title"');
const file = fileURLToPath(
  new URL("../content/project-additions.json", import.meta.url),
);
const additions = JSON.parse(await readFile(file, "utf8"));
const existing = await readFile(
  fileURLToPath(new URL("../content/projects.ts", import.meta.url)),
  "utf8",
);
if (
  additions.some((project) => project.slug === slug) ||
  existing.includes(`slug: "${slug}"`)
)
  throw new Error(`Project already exists: ${slug}`);
additions.push({
  slug,
  number: String(6 + additions.length).padStart(2, "0"),
  title,
  shortTitle: "TODO: A concrete one-line project outcome.",
  group: "University",
  category: "University project",
  published: false,
  featured: false,
  featuredOrder: 4 + additions.length,
  outcome: "TODO: What did you actually build or measure?",
  summary: "TODO: Explain the problem, your contribution and the result.",
  tags: [],
  visual: "dialogue",
  problem: ["TODO: Describe the problem."],
  role: ["TODO: State your own contribution."],
  architecture: [
    { title: "TODO: Input", detail: "TODO: Explain the input." },
    { title: "TODO: System", detail: "TODO: Explain the system." },
    { title: "TODO: Output", detail: "TODO: Explain the output." },
  ],
  architectureNote:
    "TODO: Replace this with a verified architecture description and choose an appropriate illustration.",
  challenge: {
    title: "TODO: A real engineering decision",
    confirmed: false,
    paragraphs: ["TODO: Describe a real constraint, failure or design choice."],
  },
  results: [
    { value: "TODO", label: "Add a confirmed result; do not invent metrics." },
  ],
  resultNote: "TODO: State the evaluation scope and limitations.",
  links: [],
  todos: [
    "TODO: Finish and review this project, then set published to true. Set featured to true to include it on the homepage.",
  ],
});
await writeFile(file, JSON.stringify(additions, null, 2) + "\n");
console.log(
  `Created unpublished project in content/project-additions.json: ${slug}\nFill in its facts and links, then set published to true. Set featured to true to feature it on the homepage.`,
);
