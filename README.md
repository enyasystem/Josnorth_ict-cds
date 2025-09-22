# Jos North CDS Website

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

## Project Structure

- `app/` - Next.js app directory with route-based components and pages
- `components/` - Reusable React components and UI primitives
- `public/` - Static assets (images, logos, illustrations)
- `styles/` - Global CSS and Tailwind entrypoints
- `hooks/` - Custom hooks used across components
- `lib/` - Utility functions
- `package.json` - Project metadata, dependencies and scripts

Key files:
- `app/page.tsx` - Homepage
- `components/events-section.tsx` - Events listing section (current file being edited)
- `components/admin-layout.tsx` - Layout used for admin pages

## Scripts
- `npm run dev` — Starts the Next.js development server
- `npm run build` — Builds the app for production
- `npm run start` — Starts the Next.js production server
- `npm run lint` — Runs Next.js linting

## Technologies & Libraries
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS v4
- Radix UI components
- Lucide Icons
- date-fns
- Recharts
- Sonner (toast notifications)

## Environment Variables

If the project requires environment variables (e.g., API keys, analytics), create a `.env.local` file at the project root and add variables there. Example:

```
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
```

Do not commit secrets to the repository.

## Deployment

This project can be deployed to platforms that support Next.js (Vercel, Netlify with adapter, or your custom server). For Vercel:

1. Connect your GitHub repository to Vercel
2. Use the `main` branch as the production branch
3. Vercel will detect Next.js and run `npm run build` during deployment

If deploying to a custom server, run `npm run build` and then `npm run start` on the server.

## Contributing

Contributions are welcome. Suggested additions:
- Add a `CONTRIBUTING.md` with contribution guidelines
- Add a `CODE_OF_CONDUCT.md`
- Add GitHub Actions for CI (`lint`, `type-check`, `build`) and pull-request checks

Before opening a PR, run linters and TypeScript checks locally.

## Suggestions / Next Steps
- Add `README` badges for build/CI, license, and dependencies
- Add unit / integration tests (Jest, React Testing Library)
- Add accessibility (a11y) checks in CI
- Add a LICENSE file (e.g., MIT) if you intend to open source the project

## How to Contribute

- Fork the repository and create a feature branch from `main`.
- Open a pull request describing the change and link any related issue.
- Run linters and TypeScript checks locally before submitting.
- Keep PRs focused and small for easier review.

## Recommended CI

- Run `npm run lint` and `npm run build` on every PR.
- Add TypeScript type-checking step: `npm --silent run tsc --noEmit`.
- Add tests step (once tests are added) using `npm test`.
- Optionally run an accessibility audit (axe) and Lighthouse checks for pages.

## License

Specify a license in `LICENSE` if you plan to publish this repository. If not set, assume all rights reserved.

## Contact

If you need help with this repository, open an issue or contact the project maintainers.
