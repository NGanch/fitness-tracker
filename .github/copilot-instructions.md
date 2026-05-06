<!--
This file is generated/updated by an AI assistant. Please review for accuracy.
-->
# Copilot / AI Agent Instructions

Quick orientation to get productive in this monorepo (use these exact paths/commands).

- Monorepo layout: packages live under `apps/*` and `libs/*` (see `pnpm-workspace.yaml`).
- Use `pnpm` with workspace filters to run package-local scripts from the repository root.

Important commands (run from repository root):

- Start web dev server: `pnpm run dev:web` (alias for `pnpm --filter web dev`).
- Start mobile (Expo): `pnpm run dev:mobile` (alias for `pnpm --filter mobile start`).
- Start backend: `pnpm run dev:backend` (alias for `pnpm --filter backend dev`).
- Build everything: `pnpm -r build` (root `build` is a recursive workspace build).

Key packages and where to look

- Backend: `apps/backend/`
  - Entry: `apps/backend/src/server.ts` — Express + CORS + Sentry; server listens on port `3000`.
  - Dev: `ts-node-dev` (ESM) — use `pnpm --filter backend dev` for local iteration.
  - Replace the Sentry DSN placeholder in `server.ts` when reproducing errors locally.

- Web (Vite + React): `apps/web/`
  - Dev: `vite` (`pnpm --filter web dev`).
  - Build: `tsc -b && vite build` (see `apps/web/package.json`).
  - ESLint and Tailwind are configured locally (`eslint.config.js`, `tailwind.config.ts`).

- Mobile (Expo): `apps/mobile/`
  - Uses Expo Router and file-based routing — app code lives under `apps/mobile/app/`.
  - Start: `expo start` (via `pnpm --filter mobile start`).
  - Useful script: `pnpm --filter mobile run reset-project` resets starter template (see `apps/mobile/scripts/reset-project.js`).

- Shared libraries: `libs/*` (e.g., `libs/utils/`) — used for cross-app utilities; `libs/utils/src/index.ts` is currently empty (add exports here).

Project-specific conventions

- Package isolation: prefer running package scripts with `pnpm --filter <pkg>` or root helper scripts defined in top-level `package.json` (e.g., `dev:web`, `dev:mobile`, `dev:backend`).
- TypeScript: packages often declare their own `tsconfig.json` (tune build behavior per package). Web uses `tsc -b` before `vite build`.
- Mobile uses Expo; expect platform-specific code under `apps/mobile/app/` and web-safe components in `apps/mobile` that may also live in `apps/web`.

Integration & infra notes

- Sentry: present in root deps and backend (`@sentry/node`) — `apps/backend/src/server.ts` contains a DSN placeholder; set your DSN in development or env when testing crash reporting.
- Inter-package changes: use `pnpm -w`/workspace commands and run `pnpm -r build` if changing exported types across `libs/*`.

Places to inspect for patterns/examples

- `apps/backend/src/server.ts` — backend middleware, CORS, error handlers, Sentry.
- `apps/web/package.json` & `apps/web/README.md` — Vite + React configuration and build steps.
- `apps/mobile/package.json` & `apps/mobile/README.md` — Expo scripts and reset flow.
- `pnpm-workspace.yaml` — workspace layout and package discovery.

How to modify behavior safely (examples)

- To change backend port or add a route: edit `apps/backend/src/server.ts`, then `pnpm --filter backend dev`.
- To add a shared util: add files in `libs/utils/src/`, export them from `libs/utils/src/index.ts`, then `pnpm -w build` and run dependent apps.

If you're unsure where to change something, open the package-level `README.md` (many apps include them) and check each app's `package.json` for exact scripts.

Ask me to expand any section (routing conventions, build cache, or testing commands) or to generate a short `CONTRIBUTING.md` based on these rules.
