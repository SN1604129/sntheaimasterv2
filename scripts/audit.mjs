import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const base = process.env.AUDIT_URL || "http://127.0.0.1:3000";
const cases = [
  { name: "home-mobile", path: "/" },
  { name: "home-desktop", path: "/", desktop: true },
  { name: "services-mobile", path: "/work-with-me" },
  { name: "case-study-mobile", path: "/projects/truuth-document-forensics" },
  { name: "blog-mobile", path: "/blog" },
  { name: "projects-mobile", path: "/projects" },
  { name: "healthcare-mobile", path: "/projects/healthcare-nlp" },
  { name: "resume-mobile", path: "/resume" },
];
await mkdir("artifacts", { recursive: true });
const summary = [];
for (const entry of cases) {
  const target = `artifacts/lighthouse-${entry.name}.json`;
  const args = [
    fileURLToPath(
      new URL("../node_modules/lighthouse/cli/index.js", import.meta.url),
    ),
    new URL(entry.path, base).href,
    "--chrome-flags=--headless=new --no-sandbox",
    "--only-categories=performance,accessibility,best-practices,seo",
    "--output=json",
    `--output-path=${target}`,
    "--quiet",
    ...(entry.desktop ? ["--preset=desktop"] : []),
  ];
  const env = { ...process.env };
  if (!env.CHROME_PATH && process.platform === "darwin")
    env.CHROME_PATH =
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { stdio: "inherit", env });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`Lighthouse ${entry.name} exited ${code}`)),
    );
  });
  const report = JSON.parse(await readFile(target, "utf8"));
  const scores = Object.fromEntries(
    Object.entries(report.categories).map(([key, value]) => [
      key,
      Math.round(value.score * 100),
    ]),
  );
  summary.push({ page: entry.name, scores });
  console.log(JSON.stringify({ page: entry.name, scores }));
}
await writeFile(
  "artifacts/lighthouse-summary.json",
  JSON.stringify(summary, null, 2) + "\n",
);
if (
  summary.some(({ scores }) =>
    Object.values(scores).some((score) => score < 90),
  )
)
  process.exitCode = 1;
