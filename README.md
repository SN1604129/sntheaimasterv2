# Sudipta Nath — AI Engineer portfolio

A rebuilt **sntheaimaster.com** using Next.js App Router, TypeScript, Tailwind CSS and local MDX. Engineering evidence leads the homepage; business services live below it and at `/work-with-me`.

For daily updates, use [PUBLISHING.md](PUBLISHING.md). For a hiring-focused evidence roadmap, read [EMPLOYER_POSITIONING.md](EMPLOYER_POSITIONING.md).

Read [PORTFOLIO_ANALYSIS.md](PORTFOLIO_ANALYSIS.md) for the hiring-market analysis, [TODO.md](TODO.md) for missing facts/setup, and [VERIFICATION.md](VERIFICATION.md) for measured checks.

## Run locally

Use Node.js 22+ and npm. No model key, database or Python runtime is needed to run the site.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open **http://localhost:3000**. Dark mode is the default; the theme button remembers your selection.

```bash
npm run typecheck
npm run build
npm run start
```

The production build uses Webpack for portable MDX compilation; development uses Next.js's default bundler. Output is `.next/`, replacing the old Vite `dist/` deployment. The services page renders on the server for query-based service selection. Vercel supports this directly.

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Engineering hero, selected work, more projects, research, experience, services and contact |
| `/projects` | Filterable university, industry and client project index |
| `/projects/healthcare-nlp` | Healthcare NLP application case study |
| `/projects/ros2-robot-vision` | Physical robot/classifier case study |
| `/projects/truuth-document-forensics` | Forensics architecture, debugging and bounded evaluation results |
| `/projects/stix-eatery` | Real cafe platform with missing details marked |
| `/projects/smart-financial-assistant` | Multilingual dialogue control and evaluation |
| `/work-with-me` | Services, process, Stix example and enquiry form |
| `/blog` | Searchable editorial blog with topic filters |
| `/blog/feed.xml` | RSS feed of published articles |
| `/blog/why-my-vision-language-model-missed-small-document-edits` | Clearly labelled draft; noindex until reviewed |
| `/resume` | Web resume and PDF view/download links |
| `/privacy` | Enquiry, analytics and local preference data handling |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated SEO assets |

Legacy `/contact` and `/research` links redirect to the new destinations. Other removed routes return a real 404.

## Edit content and add projects

Authored content lives under `content/`:

| File | Content |
| --- | --- |
| `profile.ts` | Identity, contact, skills and timeline |
| `pages.ts` | Homepage, services and writing copy |
| `projects.ts` + `project-additions.json` | Existing case studies, new projects and homepage priorities |
| `research.ts` | TRACE and publications |
| `services.ts` | Services, deliverables, process and enquiry choices |
| `blog.ts` + `posts/*.mdx` + `posts/*.json` | Article body, metadata and publication state |
| `resume.json` | Source for the PDF and web resume |
| `privacy.mdx` | Privacy explanation |
| `todos.ts` | Owner-content checklist |

**Add a project:** run `npm run project:new -- "Your project title"`. Fill in the draft in `content/project-additions.json`, set `published: true` when reviewed, and optionally `featured: true` with a `featuredOrder`. The homepage currently prioritises Smart Financial Assistant, Healthcare NLP and ROS2 Robot Vision. The case-study route, project index and sitemap follow the content automatically. Existing projects remain editable in `content/projects.ts`.

**Add a post:** run `npm run blog:new -- "Your article title"`, edit its MDX body and JSON metadata, then run `npm run blog:publish -- your-article-title`. The command records the Sydney publication date and refreshes the index; startup/build/type checking also regenerate it. Do not edit `blog-index.generated.ts`. Local development shows drafts for review; production listings, RSS and the sitemap show published articles. Draft preview URLs have noindex but are not private. See [PUBLISHING.md](PUBLISHING.md) for the complete workflow.

Forensics visuals are synthetic; Stix is an illustrative product map; the dialogue graphic is conceptual architecture. These are not employer/client screenshots. Confirm permission before replacing them with real assets.

## Set the Web3Forms key

1. Create and verify a [Web3Forms](https://web3forms.com/) access key registered to **sudipta1604129@gmail.com**.
2. Add it to `.env.local`:

   ```dotenv
   NEXT_PUBLIC_WEB3FORMS_KEY=your_verified_access_key
   ```

3. Restart local development, or rebuild/redeploy production. Public environment variables are embedded at build time.
4. Configure allowed domains in Web3Forms where supported. After deployment, submit your own enquiry and verify receipt in Gmail, including spam.

The recipient belongs to the key's registered account; a client-controlled `to` field does not configure it. Requests set `replyto` and the subject **`New Website Enquiry – {service}`**. An unselected service becomes `Other`. Name, email and project details are required; the other fields are optional. Budgets are AUD.

The form includes the documented `botcheck` honeypot, inline validation, loading state, duplicate-submit protection, a 20-second timeout, retained input on failure and the requested success message only after provider acceptance. A missing key shows an honest configuration message and direct email link. Tests use an intercepted provider and send no email.

This access key is intentionally public. Never put private model-provider credentials in `NEXT_PUBLIC_` variables. Old Vite variables are unused. Provider reference: [official Web3Forms React example](https://docs.web3forms.com/how-to-guides/js-frameworks/react-js/react-js).

## Resume

`public/Sudipta-Nath-Resume.pdf` is a working one-page PDF generated from the supplied facts in `content/resume.json`. Review it before applications, or replace it with your preferred resume at the same path. Unspecified employment dates and exact publication citations have not been invented.

Optional regeneration after editing the JSON:

```bash
python3 -m pip install reportlab
npm run resume
```

The PDF is committed as a public asset; Python is not needed by Next.js or Vercel.

## Tests and audits

```bash
npm run typecheck
npm run build
npm test
```

Playwright starts a separate server on **3001** with a dummy Web3Forms key. It checks all twelve routes at **375px, 768px and 1440px**, automated WCAG A/AA rules in both themes, keyboard entry, mobile navigation, theme persistence, form validation, provider rejection/success, network errors, honeypot behaviour, PDF delivery, SEO endpoints, redirects and 404s. Screenshots go to ignored `artifacts/`; traces are retained on failure.

macOS uses installed Google Chrome. On Linux/other supported systems:

```bash
npx playwright install --with-deps chromium
```

Set `CHROME_PATH` to override the browser executable. The included GitHub Actions workflow installs Chromium, then checks types, build and browser tests on Node 22. It has not been executed on GitHub from this workspace.

With `npm run start` running separately:

```bash
npm run audit
```

This runs Lighthouse on eight representative page/device combinations and fails if any category is below 90. Use `AUDIT_URL` for another base URL. Reports go to `artifacts/`; actual local results are in [VERIFICATION.md](VERIFICATION.md). Scores vary with hosting, network, analytics and machine load. Automated accessibility checks supplement visual and keyboard review.

## Deploy to Vercel with sntheaimaster.com

1. Push the source to a repository you control. Include the lockfile, content and public assets; exclude `.env*` except `.env.example`, build output, reports and `node_modules/`. The old repository tracked dependencies: remove those from tracking when preparing it, while keeping your local install.
2. Import the repository into Vercel with the **Next.js** preset and Node 22 or 24. Use `npm ci`, `npm run build`, and the default framework output directory. `vercel.json` records these settings and removes the former SPA rewrite.
3. Set `NEXT_PUBLIC_WEB3FORMS_KEY` for the appropriate environments **before building**. Deploy and review the Vercel URL and TODO content.
4. In **Project → Settings → Domains**, add `sntheaimaster.com` and `www.sntheaimaster.com`. At your DNS provider, apply the **exact DNS records Vercel shows**. Do not guess fixed A/CNAME values. Preserve email-related DNS records.
5. Make the apex domain canonical and redirect `www` to it, matching `profile.url`. If you prefer `www`, change that value and redeploy so canonicals, JSON-LD, sitemap and social URLs agree.
6. Wait for Vercel's domain/HTTPS validation. Check deep links, PDF, both themes and a real enquiry on the final domain.

Use [Vercel's current domain guide](https://vercel.com/docs/domains/working-with-domains/add-a-domain) for account-specific DNS details. The rebuild is prepared for Vercel; this task does not change the existing domain or deploy into an unconnected account.

## Analytics

The layout includes `@vercel/analytics/next` on Vercel. Enable Web Analytics in the dashboard and redeploy, following [Vercel's setup guide](https://vercel.com/docs/analytics/quickstart).

On provider-accepted submissions, the form emits **`Enquiry submitted`** with the service category only. Names, emails, organisations and messages are not sent in custom events. Confirm [custom-event availability for your plan](https://vercel.com/docs/analytics/custom-events). Non-identifying project, article, resume and repository actions are also tracked. Analytics failure does not interrupt navigation or enquiry delivery.

## SEO and accessibility

Includes per-page canonical metadata, Open Graph/Twitter cards, a generated 1200×630 image, Person JSON-LD, sitemap and robots. The draft post stays noindex. Local Inter fonts, semantic landmarks, labelled controls, visible focus, skip navigation, reduced-motion support, responsive layouts and contrasting dark/light palettes are implemented.

Every missing fact, permission, screenshot and account-setup item is recorded in [TODO.md](TODO.md).
