# Verification record

## First published article and reference logo — 18 November 2026

The supplied small-business article is the first published post. The SEO instructions remain out of the visible body; metadata, article/FAQ JSON-LD, primary-source citations, internal links, RSS and sitemap inclusion were checked. The earlier engineering note remains a draft. The invitation to comment uses an email link because the site has no comment service.

The logo follows the supplied rounded navy monogram, white SN lettering, blue dot, wordmark and name/role subtitle. Standalone assets use outlined lettering and need no installed fonts.

Production build, strict type checking, two publishing-workflow tests and all nine browser tests passed. Browser checks cover thirteen page routes at 375, 768 and 1440 pixels, with both themes checked for automated WCAG A/AA violations. Live deployment verification is recorded separately after publication.

---

## Latest revision — blog, identity and university projects

The revised portfolio passed its production build and strict type checks. All **eight browser tests** and **two publishing-workflow tests** passed. The browser matrix covers twelve page routes at three widths (36 route/viewport checks), with 24 automated route/theme accessibility scans. Article sharing was verified against the clipboard API, and project/topic filters were exercised.

The command-line workflow was tested in temporary directories: draft creation, duplicate protection, placeholder checks, dated publication, generated MDX imports and unpublished project creation. No test post or project was added to the real content collection.

Production checks confirmed the new project routes work, unpublished posts are hidden from the production listing and RSS, and no browser JavaScript errors were observed. Draft preview URLs remain publicly addressable with noindex; they are not an authentication mechanism.

The final eight-case Lighthouse matrix measured:

| Page/device | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| home-mobile | 98 | 100 | 100 | 100 |
| home-desktop | 100 | 100 | 100 | 100 |
| services-mobile | 100 | 100 | 100 | 100 |
| case-study-mobile | 100 | 100 | 100 | 100 |
| blog-mobile | 100 | 100 | 100 | 100 |
| projects-mobile | 100 | 100 | 100 | 100 |
| healthcare-mobile | 100 | 100 | 100 | 100 |
| resume-mobile | 100 | 100 | 100 | 100 |

These are localhost lab results, not a promise about every device or a future deployment. The live domain was not changed. The earlier baseline record below is retained for context.

---

Local checks completed 18 November 2026 for the Next.js portfolio rebuild. This records observed results, not targets or a claim about the existing live website.

## Build and dependencies

- `npm run typecheck` passed with generated Next.js route types and strict TypeScript.
- `npm run build` passed using Next.js 16.4.6 and Webpack. Fourteen generated static entries plus the server-rendered services route were produced.
- `git diff --check` passed for project source.
- Final `npm audit --omit=dev` reported **zero vulnerabilities**. The full audit also reported zero after applying the compatible baseline-browser-mapping patch.
- Node.js used locally: 24.14.1. The documented minimum and CI target are Node 22.

## Browser checks

All **six Playwright tests passed** in local Chrome:

1. Nine page routes at **375px, 768px and 1440px**, checking HTTP responses, one h1, footer and horizontal overflow. No horizontal overflow was detected in 27 route/viewport combinations.
2. Keyboard entry through the skip link, mobile navigation and persistent dark/light switching.
3. Eighteen route/theme checks using axe WCAG 2 A/AA and WCAG 2.1 A/AA rules. No violations were reported after the visible brand label and light-theme contrast fixes.
4. Form validation, initial service selection, provider rejection, preserved input, correct subject/payload and success only after provider acceptance.
5. Network failure, recoverable input and honeypot suppression.
6. Working resume PDF, generated SEO endpoints/social PNG, 404s and legacy redirect responses.

Form provider calls in these tests were intercepted. **No real email was sent.** The positive test verifies handling of the provider contract, not Gmail receipt.

## Production smoke check

The production build was separately checked on localhost:

- All nine pages returned 200; ten unique internal destinations resolved successfully.
- Canonical metadata used the intended apex domain on every page.
- The Person JSON-LD parsed with the correct name and type.
- The unconfigured enquiry form displayed its direct-email fallback and made no provider request.
- The draft article had noindex metadata and was absent from the sitemap.
- No browser JavaScript errors were observed.
- Dark desktop and light desktop/mobile screenshots were captured. The mobile layout shows the evaluation proof before the illustration.
- The generated resume is a valid one-page PDF with working HTTP delivery.

## Lighthouse

Production localhost audits, default Lighthouse mobile simulation unless marked desktop. Category order below matches the requested four categories.

| Page/device | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Homepage, mobile | 98 | 100 | 100 | 100 |
| Homepage, desktop | 100 | 100 | 100 | 100 |
| Services/enquiry, mobile | 100 | 100 | 100 | 100 |
| Truuth case study, mobile | 100 | 100 | 100 | 100 |
| Blog index, mobile | 100 | 100 | 100 | 100 |
| Resume, mobile | 100 | 100 | 100 | 100 |

The final homepage audit after the accessible-label correction again measured **98 / 100 / 100 / 100**. The initial standalone homepage run measured 100 Performance, illustrating normal lab variability. No reported score is a guarantee for every device or the future deployed domain.

JSON reports, the production smoke summary and screenshots are under ignored `artifacts/`. `npm run audit` regenerates the six-case matrix against a running production server. The browser suite generates additional full-page dark screenshots.

## Not verified against external accounts

- Vercel deployment, DNS and production TLS: no connected Vercel account/domain change was performed.
- Actual Web3Forms/Gmail delivery: requires the owner's verified access key and an intentional live submission.
- Vercel visit/conversion reporting: requires dashboard enablement, deployment and suitable custom-event support.
- GitHub-hosted CI: the workflow is included but has not been executed remotely here.
- Employer/client publication permissions, missing implementation details, repository URLs and exact citations: listed in `TODO.md`.

Automated accessibility checks do not cover every criterion; visual and keyboard checks supplement them. Review the TODO content and resume before launch.
