# Add posts and projects

All commands run from the project directory. They update local source files. Making changes on the live domain still requires deployment.

## Write a blog post

```bash
npm run blog:new -- "What my multilingual evaluation revealed"
```

This creates two files under `content/posts/`:

- `what-my-multilingual-evaluation-revealed.mdx` — the article body.
- `what-my-multilingual-evaluation-revealed.json` — title, description, category, publication state/date and optional related-project slug.

Write the article in Markdown/MDX. Replace the TODO placeholders in the body and description. Use your own examples and confirmed results; a useful format is question → example → experiment → result → limits. Leave `projectSlug` null, or set it to an existing project slug to display a related-project link.

The draft appears in local development. Drafts stay out of the production blog listing, RSS and sitemap, and their individual preview pages have noindex metadata. Preview URLs are not private or authenticated; keep confidential material out of all source content.

For a featured image, put your file in `public/images/blog/` and add an optional `image` object to the article's JSON metadata:

```json
"image": {
  "src": "/images/blog/your-article.png",
  "alt": "A short description of the image",
  "width": 1200,
  "height": 630
}
```

Use the file's actual dimensions. The same image appears on the article, blog card and homepage preview, and supplies the article's social-sharing image. A 1200 × 630 image suits sharing previews.

When ready:

```bash
npm run blog:publish -- what-my-multilingual-evaluation-revealed
```

The command checks the generated TODO placeholders have been replaced, sets `published: true`, and records the actual publication date in the Australia/Sydney timezone if no date already exists. It refreshes the generated article index. Reading time is estimated from the body text. Categories, search results, homepage notes, RSS and sitemap use the same content data.

Restart local development or run `node scripts/generate-blog.mjs` after manually editing metadata outside the publishing commands. Development startup, type checking and production builds also regenerate the index automatically. Do not edit `content/blog-index.generated.ts` by hand.

To return an article to draft, change `published` to false in its JSON file and regenerate the index. Deploy the updated source when ready for the public site to change.

## Add a project

```bash
npm run project:new -- "My new AI project"
```

This adds an unpublished entry to `content/project-additions.json`. It does not overwrite existing projects or automatically present unfinished work as complete.

Fill in:

1. Problem and your personal contribution, including team boundaries.
2. A concrete outcome, confirmed stack, architecture and engineering decisions.
3. Actual results with evaluation scope; do not invent numerical metrics.
4. Repository/demo links and a suitable conceptual illustration (`dialogue`, `healthcare`, `robot`, `forensics` or `stix`). Avoid using an illustration that implies a different project capability.
5. `group`: `University`, `Industry` or `Client`.

When reviewed, set `published: true`. The project gets a case-study route, project-index card and sitemap entry automatically. To show it on the homepage, also set `featured: true` and its `featuredOrder`. The current three university projects use orders 1, 2 and 3.

Core existing case studies remain in `content/projects.ts`. Additional research cards remain in its `moreProjects` collection.

## Logo assets

The header and footer use the user's original logo image, preserving its lettering and proportions. SVG clipping removes the blank canvas, and a mask colours the original wordmark to match the site's theme. The SN monogram keeps its original navy, white and blue colours. The small monogram, favicon and generated Apple touch icon use the same source artwork.

- `public/brand/sn-the-ai-master-8e01cfc7.png` — exact original supplied PNG.
- `components/brand.tsx` — logo and monogram viewports used by the site.
- `app/apple-icon.tsx` — touch icon rendered from the original monogram.
- Existing SVG download URLs wrap the original artwork on its white background.

## Before deploying

```bash
npm run test:content
npm run typecheck
npm run build
npm test
```

Use the Vercel instructions in `README.md` to deploy. Review `EMPLOYER_POSITIONING.md` for a practical content and evidence roadmap.
