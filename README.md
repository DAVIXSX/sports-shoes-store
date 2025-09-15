# Sports Shoes Store

A modern e-commerce demo built with Next.js 15 (App Router), React 19, and TypeScript. Styled with Tailwind CSS v4 and powered by Turbopack for fast dev and builds.

## Tech stack
- Next.js 15 (app/ directory)
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint (flat config)

## Getting started
Prerequisites:
- Node.js 18.18+ or 20+
- npm 9+ (or your preferred package manager)

Install dependencies:

```bash
npm ci # or: npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

## Available scripts
- dev: start Next.js in development (Turbopack)
- build: create a production build (Turbopack)
- start: start the production server
- lint: run ESLint

```bash
npm run build
npm run start
npm run lint
```

## Project structure
- src/app: App Router routes (pages, layout, loading, not-found)
- src/components: Reusable UI components
- public: Static assets (images, icons)
- media: Design or content assets (not served by Next.js)

## Environment variables
Create a .env.local file at the project root if needed. Example:

```bash
# path: .env.local
# Add your vars here
```

Note: .env* files are ignored by Git by default.

## Deployment
You can deploy anywhere that supports Next.js (e.g., Vercel, Node server, Docker). For Vercel, connect the repo and set the framework to Next.js.

## License
Add a LICENSE file if you plan to open-source this project.
