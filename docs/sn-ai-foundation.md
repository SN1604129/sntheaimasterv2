# SN AI Foundation

This project is being prepared for a commercial SN AI redesign while preserving the current live site and existing research/demo content.

## Current Stack

- React 18
- Vite 5
- React Router 6
- Tailwind CSS 3
- Framer Motion 11
- Static deployment currently configured for Vercel with SPA rewrites in `vercel.json`

## Design Direction

SN AI should feel like a premium AI technology studio run by real people who understand business and technology.

Use the design system to support:

- Business outcomes and clear language
- Founder/client photography
- Case-study imagery and product screenshots
- Trust signals and real proof
- Subtle intelligence, data-flow and automation cues

Avoid robot imagery, cyberpunk styling, heavy neon, crypto/gaming aesthetics, excessive glow, excessive glassmorphism and jargon-heavy interface copy.

## Core Tokens

Global CSS variables live in `src/index.css`.

Primary foundation tokens:

- `--background`
- `--surface`
- `--surface-secondary`
- `--surface-elevated`
- `--text-primary`
- `--text-secondary`
- `--text-muted`
- `--border`
- `--border-subtle`
- `--primary-blue`
- `--cyan`
- `--violet`
- `--success`
- `--warning`
- `--error`

Legacy aliases such as `--void`, `--indigo`, `--teal`, `--amber`, `--warm-white`, `--muted` and `--dim` remain so the current pages continue to render safely during migration.

## Typography

Reusable classes:

- `type-display`
- `type-h1`
- `type-h2`
- `type-h3`
- `type-body-lg`
- `type-body`
- `type-body-sm`
- `type-label`
- `type-eyebrow`

Use display typography for major narrative moments only. Use readable body copy for service explanations and business outcomes. Mono typography should be limited to small technical labels, not large blocks of content.

## Layout

Foundational layout primitives:

- `site-container`
- `site-container-wide`
- `content-measure`
- `section`
- `section-compact`
- `split-layout`
- `Container`
- `Section`
- `SectionHeader`

The system should support full-width narrative sections, constrained text sections, split layouts, future case studies and future product sections without relying on card grids everywhere.

## Buttons

CSS variants:

- `btn-primary`
- `btn-secondary`
- `btn-ghost`
- `btn-text`

Reusable React component:

- `src/components/Button.jsx`

Buttons support disabled and loading-ready states through `disabled`, `aria-disabled` and `aria-busy`. Interactions should stay subtle and trust-focused.

## Motion

Use Framer Motion sparingly:

- subtle fade/reveal
- slight vertical entrance
- limited stagger for grouped content
- small button feedback

Respect `prefers-reduced-motion`. Do not add scrolling effects or decorative animation unless it improves clarity.

## Security TODOs

Current temporary protections:

- `.env` and `.env.*` are ignored by Git.
- `/admin` is blocked in production because the old version relied on client-side access control.
- Demo OpenAI keys now come from browser session storage in production. `VITE_OPENAI_KEY` is only a local development convenience.

Still required before production-grade AI features:

- Move OpenAI calls behind a server-side API.
- Add rate limiting and abuse protection.
- Add proper server-side authentication for admin tools.
- Replace localStorage blog storage with real content storage or static build-time content.
- Connect the Start Project form to a backend, CRM, email service or database.
- Add privacy policy and terms before collecting business/client data.

## Future Migration Notes

- `/research` should become credibility/proof content, not the main site focus.
- `/demo` can become selected proof or future interactive demos after backend migration.
- `/blog` should become `/insights` with real crawlable content.
- `/contact` should become or redirect to `/start-project`.
- `/mytaelegenie` is local product work and should be preserved for later product architecture decisions.
