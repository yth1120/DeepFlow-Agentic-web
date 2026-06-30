# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **DeepFlow Agentic** marketing website — an Astro 4 landing page for the DeepFlow Electron desktop app (an AI coding agent with dual-loop ReAct architecture, local sandboxing, and MCP support). The site is bilingual (zh-CN / en), deployed to Cloudflare Pages in hybrid mode.

## Commands

```bash
npm run dev          # Start Astro dev server (equiv: npm start)
npm run build        # Production build (SSG for index + SSR API routes)
npm run preview      # Preview production build locally
npm run check        # Run astro check (TypeScript diagnostics, no emit)
```

No test suite is configured yet — `check` is the only validation step.

## Architecture

### Rendering model: Astro Hybrid

- **SSG (pre-rendered):** `src/pages/index.astro` (`prerender = true`) — the single-page landing page is statically generated at build time.
- **SSR (dynamic):** `src/pages/api/[...route].ts` (`prerender = false`) — all `/api/*` requests are delegated to a Hono app instance at runtime.
- **React islands:** Interactive components in `src/react/` are hydrated with `client:visible` or `client:idle` directives. They do **not** share a single React root — each `.astro` component imports the React islands it needs individually.

### API layer

```
Request → Astro catch-all (src/pages/api/[...route].ts)
        → Hono app (src/server/app.ts)
          ├── GET /api/health
          ├── /api/releases (src/server/routes/releases.ts)
          └── /api/tools   (src/server/routes/tools.ts)
```

- Hono is the API framework; routes are Cloudflare Workers-compatible.
- `src/server/app.ts` exports a `createApp()` factory — a fresh Hono instance per request.
- API responses follow the `ApiResponse<T>` contract defined in `src/types/index.ts`: `{ success, data?, error? }`.

### Data flow

- **Tool definitions** (`src/data/tools.ts`): 22 tools, each classified as `danger` (9) or `safe` (13), further grouped by `category` (filesystem, search, execution, planning, review, communication). The same module exports precomputed slices: `DANGER_TOOLS`, `SAFE_TOOLS`, `TOOLS_BY_CATEGORY`.
- **Release info** (`src/data/releases.json`): version, changelog, and per-platform download assets consumed by the SmartDownloader React island via `GET /api/releases/latest`.
- **Terminal simulation** (`src/data/simSteps.ts`): a sequence of `LogStep` objects modeling a full ReAct agent loop (input → system → step → tool-call → permission → user-approved → tool-call → success-answer).

### i18n system

- `src/i18n/translations.ts` contains all UI strings as a `Translations` interface with full `zh` and `en` objects under `TRANSLATIONS`.
- React islands use `LanguageContext` / `useLanguage()` (`src/i18n/LanguageContext.tsx`). Each island wraps itself in `<LanguageProvider>` independently (no shared React root).
- Static Astro content uses `data-i18n` attributes. A bootstrap script in `BaseLayout.astro` handles initial text replacement; a `CustomEvent` (`deepflow:lang-change`) synchronizes across islands and updates DOM `[data-i18n]` elements.
- Language preference is persisted in `localStorage('lang')`, defaulting to browser `navigator.language`.

### Theme system

- Dark/light mode toggled via `class="dark"` on `<html>`. Tailwind's `darkMode: 'class'` drives all color variants.
- Preference persisted in `localStorage('theme')`. A blocking `<script is:inline>` in `BaseLayout.astro` applies the stored theme before first paint to prevent FOUC.
- The `ThemeToggle` React island reads from the DOM class and syncs to `localStorage`.

### Key files to know

| Path | Purpose |
|---|---|
| `src/pages/index.astro` | Single-page entry, composes all sections |
| `src/layouts/BaseLayout.astro` | HTML shell, theme preload, i18n bootstrap, grid background |
| `src/types/index.ts` | All shared TypeScript types (mirrors Electron `electron/types.ts`) |
| `src/data/tools.ts` | Canonical 22-tool dataset with precomputed slices |
| `src/data/simSteps.ts` | Terminal demo step sequence |
| `src/server/app.ts` | Hono app factory with middleware and route mounting |
| `tailwind.config.mjs` | Brand design tokens (colors: brand-black, brand-accent `#00E5FF`, brand-blue `#2563EB`) |
| `astro.config.mjs` | Hybrid output, Cloudflare adapter, React + Tailwind integrations |
| `deepflow.html` | Legacy single-file prototype (no longer the build entry; kept for reference) |

### Styling conventions

- **Brand palette:** `brand-black` (#030712), `brand-dark` (#0B0F19), `brand-card` (#111827), `brand-border` (#1F2937), `brand-text` (#9CA3AF), `brand-accent` (#00E5FF "Aurora Cyan"), `brand-blue` (#2563EB "Deep Blue").
- **Typography:** Inter for body/sans, JetBrains Mono for code/mono.
- **Terminal aesthetic:** `.terminal-dark-box` and `.code-dark-box` utility classes force dark backgrounds regardless of theme, ensuring code readability.
- **Grid background:** `.grid-bg` class applies a Swiss-engineering-style 40px grid overlay with 1px lines at 2-3% opacity.
- **Scrollbar:** Custom WebKit scrollbar styling (6px, rounded, theme-aware).
- **FOUC prevention:** Theme is applied in a blocking inline script before DOM parse; language bootstrap also runs inline.

### Adding a new page section

1. Create the Astro component in `src/components/`.
2. If it needs interactivity, create a React island in `src/react/` and import it with the appropriate `client:*` directive.
3. Import and place it in `src/pages/index.astro`.
4. Add all UI strings to the `Translations` interface and both `zh`/`en` objects in `src/i18n/translations.ts`.
5. For static text, use `data-i18n="key"` attributes. For React text, use `useLanguage().t.key`.
