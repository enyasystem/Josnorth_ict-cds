# [![CI: main](https://github.com/enyasystem/josnorthcds/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/enyasystem/josnorthcds/actions/workflows/ci.yml?query=branch%3Amain) [![CI: develop](https://github.com/enyasystem/josnorthcds/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/enyasystem/josnorthcds/actions/workflows/ci.yml?query=branch%3Adevelop) [![CI: staging](https://github.com/enyasystem/josnorthcds/actions/workflows/ci.yml/badge.svg?branch=staging)](https://github.com/enyasystem/josnorthcds/actions/workflows/ci.yml?query=branch%3Astaging) [![Auto-merge on Vercel success](https://github.com/enyasystem/Josnorth_ict-cds/actions/workflows/auto-merge-on-vercel.yml/badge.svg?branch=main)](https://github.com/enyasystem/Josnorth_ict-cds/actions/workflows/auto-merge-on-vercel.yml)
# Jos North ICT CDS Biodata platform

This repository contains a Next.js website for the Jos North Community Development Service (CDS) project. It's a modern, responsive site built with Next.js 14, TypeScript, Tailwind CSS and a small collection of UI primitives and components.

## Features
- Next.js 14 application (React 18)
- TypeScript-ready (project includes `tsconfig.json`)
- Tailwind CSS for styling
- Reusable UI components under `components/` including Radix-based primitives
- Pages and sections for admin, events, developers, resources, and more

## Quickstart

Requirements:
- Node.js (18.x or newer recommended)
- npm (the project uses `npm` as the package manager)

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Build for production:

```
npm run build
```

Start production server (after build):

```
npm run start
```

Notes: The project uses the `scripts` defined in `package.json` which map to Next.js commands (`dev`, `build`, `start`, `lint`).
<!-- Frontend developer-style README: concise, scannable, and actionable -->

# Jos North CDS — Frontend

A modern, responsive Next.js site for the Jos North Community Development Service (CDS).

Quick links
- Code: `app/`, `components/`, `public/`
- Live deploy: (configure your hosting provider)
- Branching workflow: `BRANCHING.md`
- License: `LICENSE` (MIT)

Why this repo
- Fast static + SSR pages with Next.js 14
- TypeScript-first, Tailwind CSS for utility-driven styles
- Component-first structure (see `components/`) to keep UI predictable and testable

Getting started (developer)

Prerequisites
- Node.js 18+ (recommended)
- npm

Install

```bash
npm install
```

Run locally

```bash
npm run dev
```

Build

```bash
npm run build
```

Start (production)

```bash
npm run start
```

Project layout (important folders)

- `app/` — routes and page-level components
- `components/` — shared presentational and layout components
- `public/` — static images and assets
- `styles/` — global and Tailwind entry
- `hooks/` — reusable hooks
- `lib/` — utilities and helpers

NPM scripts (most-used)

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — linting

Branch summary (short)

- `main` — production-ready, protected
- `develop` — integration branch for completed features
- `staging` — optional pre-production for QA
- `feature/*` — feature branches (branch off `develop`)
- `release/*` — release prep (created from `develop`)
- `hotfix/*` — urgent fixes (created from `main`)

For details and rules, see `BRANCHING.md`.

Recommended local workflow (fast)

```bash
git checkout develop
git pull
git checkout -b feature/<short-desc>
# implement
git add -A
git commit -m "feat: add events section"
git push -u origin feature/<short-desc>
# open PR to develop
```

Testing & CI (suggested)

- Run `npm run lint` and `npm run build` on PRs
- Add `npm --silent run tsc --noEmit` to CI steps
- Add tests (Jest + React Testing Library) and run `npm test`

Access & deploy notes

- Vercel: connect the repo and use `main` as production branch. Vercel automatically runs `npm run build`.
- Custom server: run `npm run build` then `npm run start`.

Contributing

- Keep PRs small and focused
- Add screenshots or steps to reproduce for visual changes
- Link PR to issues when applicable
- Follow the branching strategy in `BRANCHING.md`

Questions?
- Open an issue or ping the maintainers



