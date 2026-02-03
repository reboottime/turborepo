# File Structures

## Repo Structure

```
apps/
  web/                    # Next.js main app (port 3000)
  portal/                 # Next.js portal/admin app (port 3001)
packages/
  ui/                     # Shared component library (Tailwind + Radix UI + Storybook)
  libs/                   # Shared non-UI utilities and logic
  config.eslint/          # Shared ESLint configs (base, next-js, react-internal)
  config.typescript/      # Shared TypeScript configs (base, nextjs, react-library)
```

## UI Package Structure

```
packages/ui/
  src/
    lib/                  # Utilities (cn)
    components/
      button/             # Button component (forwardRef + cva variants)
      card/               # Card compound component
      dialog/             # Placeholder for Radix UI Dialog
  .storybook/             # Storybook config
```

## Component Folder Convention

Each component in `packages/ui/src/components/` gets its own folder:

```
button/
  index.tsx
  button.test.tsx
  button.stories.tsx
```

- Barrel exports from `packages/ui/src/index.ts`
- Tests colocated with source files
- Storybook stories colocated with components

## Key Files

| File | Purpose |
|------|---------|
| `turbo.json` | Turborepo task config (build, lint, check-types, test, test:e2e, dev, storybook) |
| `pnpm-workspace.yaml` | Workspace definitions (`apps/*`, `packages/*`) |
| `packages/ui/src/styles.css` | Shared Tailwind v4 theme tokens |
| `packages/ui/src/lib/cn.ts` | Class merge utility (clsx + tailwind-merge) |
| `.github/actions/setup/action.yml` | Composite action — shared pnpm/Node/Turbo setup |
| `.github/workflows/ci.yml` | CI pipeline (lint, type-check, unit tests, build) |
| `.github/workflows/e2e.yml` | E2E tests (matrix per app, parallel) |
| `.github/workflows/deploy-preview.yml` | Preview deploy on PR (Vercel) |
| `.github/workflows/deploy-production.yml` | Production deploy on main (Vercel) |
| `apps/web/playwright.config.ts` | Playwright config for web E2E tests |
| `apps/portal/playwright.config.ts` | Playwright config for portal E2E tests |
