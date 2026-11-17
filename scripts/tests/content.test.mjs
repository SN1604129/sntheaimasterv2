import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  copyFile,
  readFile,
  writeFile,
  rm,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const source = fileURLToPath(new URL("../", import.meta.url));

test("blog commands create drafts, prevent overwrites and publish reviewed content into the generated index", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "portfolio-blog-"));
  try {
    await mkdir(path.join(root, "scripts"));
    await mkdir(path.join(root, "content/posts"), { recursive: true });
    for (const file of ["blog.mjs", "generate-blog.mjs"])
      await copyFile(path.join(source, file), path.join(root, "scripts", file));
    const run = (...args) =>
      spawnSync(
        process.execPath,
        [path.join(root, "scripts/blog.mjs"), ...args],
        { encoding: "utf8" },
      );
    assert.equal(run("new", "A useful evaluation note").status, 0);
    const json = path.join(root, "content/posts/a-useful-evaluation-note.json");
    assert.equal(JSON.parse(await readFile(json, "utf8")).published, false);
    assert.notEqual(run("new", "A useful evaluation note").status, 0);
    assert.notEqual(run("publish", "a-useful-evaluation-note").status, 0);
    const post = JSON.parse(await readFile(json, "utf8"));
    post.description =
      "An example explaining how to separate retrieval checks from response checks.";
    await writeFile(json, JSON.stringify(post));
    await writeFile(
      path.join(root, "content/posts/a-useful-evaluation-note.mdx"),
      "## A concrete example\n\nSeparate a retrieval failure from a generation failure before changing a prompt.\n",
    );
    assert.equal(run("publish", "a-useful-evaluation-note").status, 0);
    const published = JSON.parse(await readFile(json, "utf8"));
    assert.equal(published.published, true);
    assert.match(published.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
    const index = await readFile(
      path.join(root, "content/blog-index.generated.ts"),
      "utf8",
    );
    assert.match(index, /published":true/);
    assert.match(index, /import\("\.\/posts\/a-useful-evaluation-note.mdx"\)/);
    assert.notEqual(run("publish", "../outside").status, 0);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("new projects start unpublished and duplicate creation preserves the original", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "portfolio-project-"));
  try {
    await mkdir(path.join(root, "scripts"));
    await mkdir(path.join(root, "content"));
    await copyFile(
      path.join(source, "new-project.mjs"),
      path.join(root, "scripts/new-project.mjs"),
    );
    await writeFile(path.join(root, "content/project-additions.json"), "[]\n");
    await writeFile(path.join(root, "content/projects.ts"), "");
    const run = () =>
      spawnSync(
        process.execPath,
        [path.join(root, "scripts/new-project.mjs"), "A new robot project"],
        { encoding: "utf8" },
      );
    assert.equal(run().status, 0);
    const entries = JSON.parse(
      await readFile(path.join(root, "content/project-additions.json"), "utf8"),
    );
    assert.equal(entries.length, 1);
    assert.equal(entries[0].published, false);
    assert.equal(entries[0].featured, false);
    assert.notEqual(run().status, 0);
    assert.equal(
      JSON.parse(
        await readFile(
          path.join(root, "content/project-additions.json"),
          "utf8",
        ),
      ).length,
      1,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
