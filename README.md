# SNTheAIMaster.com

**Sudipta Nath — AI Engineer & Builder**  
Personal brand website. Signal over noise.

---

## Table of Contents

1. [What this project is](#what-this-project-is)
2. [Tech stack](#tech-stack)
3. [Install dependencies](#install-dependencies)
4. [Run locally](#run-locally)
5. [Build for production](#build-for-production)
6. [Deploy to Hostinger](#deploy-to-hostinger)
7. [Edit page content](#edit-page-content)
8. [Future phase roadmap](#future-phase-roadmap)

---

## What this project is

A premium personal AI brand website built with React + Vite.  
Designed around the "Precision Signal" aesthetic — dark, professional, research-focused.

**Pages included:**
- `/` — Homepage with hero, credibility strip, domains, featured research, current focus, and CTA
- `/research` — Publications, research interests, and active projects
- `/contact` — Availability statement, contact form (frontend-only), and direct links

**Design system:**
- Colors: Void black · Electric indigo · Bioluminescent teal · Amber CTA
- Fonts: Syne (display) · DM Sans (body) · DM Mono (code/labels) · Instrument Serif (research prose)
- Motion: Framer Motion scroll-reveal animations with reduced-motion support

---

## Tech stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion 11 | Animations & scroll reveals |
| React Router DOM 6 | Client-side routing |

---

## Install dependencies

Make sure you have **Node.js 18+** and **npm** installed.

```bash
# Navigate into the project folder
cd sntheaimaster

# Install all dependencies
npm install
```

---

## Run locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.  
Hot reload is enabled — changes appear instantly.

---

## Build for production

```bash
npm run build
```

This generates a `dist/` folder containing the complete static website.  
Preview the production build locally before deploying:

```bash
npm run preview
```

---

## Deploy to Hostinger

### Step 1 — Build the project

```bash
npm run build
```

### Step 2 — Upload to Hostinger

1. Log in to your **Hostinger control panel** (hPanel)
2. Go to **Files → File Manager**
3. Navigate to `public_html/`
4. **Delete any existing files** in `public_html/` (or back them up first)
5. Upload **all contents** of the `dist/` folder into `public_html/`
   - Important: upload the *contents* of `dist/`, not the `dist/` folder itself

### Step 3 — Enable React Router (SPA routing)

The `public/.htaccess` file is automatically included in the build.  
It redirects all routes to `index.html` so React Router works correctly.

If routes like `/research` or `/contact` show a 404 error after deploy:
- Check that `.htaccess` is present in `public_html/`
- Ensure **Apache mod_rewrite** is enabled (it is on Hostinger shared hosting by default)

### Step 4 — Verify

Visit your domain and test all three pages:
- `sntheaimaster.com`
- `sntheaimaster.com/research`
- `sntheaimaster.com/contact`

---

## Edit page content

**All website content lives in one file:**

```
src/data/siteData.js
```

You do not need to edit individual page components to update content.

### What you can edit in siteData.js

| Export | What it controls |
|---|---|
| `siteConfig` | Name, email, LinkedIn, GitHub, tagline |
| `credibilityItems` | The credibility strip on the homepage |
| `buildDomains` | The three "What I Build" cards |
| `publications` | All publication cards (Research page + Homepage) |
| `researchProjects` | Active research projects (Research page) |
| `researchInterests` | The interest tags on the Research page |
| `currentFocus` | The "What's being built" section on the Homepage |

### Example: add a new publication

Open `src/data/siteData.js` and add to the `publications` array:

```js
{
  id:        'pub-03',
  title:     'Your Paper Title Here',
  authors:   'Sudipta Nath, Co-Author Name',
  venue:     'Conference or Journal Name',
  year:      '2025',
  publisher: 'IEEE',
  doi:       'https://doi.org/10.1109/YOURPAPER',
  abstract:  'Plain-language summary of your paper.',
  tags:      ['Tag One', 'Tag Two'],
  pdf:       null, // or 'https://link-to-pdf.com/paper.pdf'
},
```

### Example: update your email

In `siteConfig`:
```js
email: 'your-real-email@domain.com',
```

### Content marked as PLACEHOLDER

Look for `// ← PLACEHOLDER` comments in `siteData.js`. These are items that need your real content:
- Publication titles and abstracts
- DOI links
- LinkedIn and GitHub URLs
- Email address

---

## Future phase roadmap

### Phase 2 — AI Lab (Month 2–3)
- Add `/ai-lab` page featuring ForecastAI as an active experiment
- Add Research Notes (short-form public research log)
- Add project email capture ("Follow this project")

### Phase 3 — Blog (Month 3, when 3+ posts ready)
- Add `/blog` page and `/blog/[slug]` individual post pages
- Markdown-based posts compiled at build time
- Category filters: Research / Technical / Opinion / Product

### Phase 4 — About Page (Month 2)
- Standalone `/about` with origin story, professional timeline, and skills

### Phase 5 — Products (When first product charges money)
- Add `/products` page featuring the Resume Generator
- Freemium pricing display
- Live product embed or external link

### Phase 6 — Form Backend (When ready)
- Connect the Contact form to a real email service
- Options: Formspree (simplest), EmailJS (no backend), or a custom API
- Replace the demo submit handler in `src/pages/Contact.jsx`

### Phase 7 — Cloud Migration (When first SaaS customer)
- Migrate frontend from Hostinger to Vercel (free tier)
- Add Supabase for database + auth
- Add Modal.com for ForecastAI model serving

---

## File structure

```
sntheaimaster/
├── public/
│   ├── favicon.svg       ← SN brand mark
│   └── .htaccess         ← React Router fix for Hostinger/Apache
├── src/
│   ├── components/
│   │   ├── Navbar.jsx    ← Navigation (scroll-aware, mobile menu)
│   │   ├── Footer.jsx    ← Site footer
│   │   ├── Section.jsx   ← Reusable section wrapper + SectionHeader
│   │   ├── BuildCard.jsx ← "What I Build" domain cards
│   │   └── ResearchCard.jsx ← Publication + project cards
│   ├── data/
│   │   └── siteData.js   ← ALL CONTENT LIVES HERE
│   ├── pages/
│   │   ├── Home.jsx      ← Homepage
│   │   ├── Research.jsx  ← Research page
│   │   └── Contact.jsx   ← Contact page
│   ├── App.jsx           ← Router setup
│   ├── main.jsx          ← React entry point
│   └── index.css         ← Global styles + design tokens
├── index.html            ← HTML shell + Google Fonts
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

Built with purpose. · Sydney, Australia
