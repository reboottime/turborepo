# Turborepo with Shared Design System, Libs and CI/CD Pipeline

## How It Fits Together

```
┌──────────────────────────────────────────────────────┐
│                        Apps                          │
│                                                      │
│  ┌──────────────────┐      ┌──────────────────┐      │
│  │  web (:3000)     │      │  portal (:3001)  │      │
│  │  Next.js 15      │      │  Next.js 15      │      │
│  │  Landing page    │      │  Auth + Employees│      │
│  └────────┬─────────┘      └────────┬─────────┘      │
│           │                         │                │
├───────────┼─────────────────────────┼────────────────┤
│           │       Packages          │                │
│           ▼                         ▼                │
│  ┌──────────────┐        ┌──────────────┐            │
│  │  @repo/ui    │        │  @repo/libs  │            │
│  │  Design sys  │        │  Utilities   │            │
│  │  7 components│        └──────────────┘            │
│  │  Storybook   │                                    │
│  └──────────────┘                                    │
│                                                      │
│  ┌──────────────────┐    ┌─────────────────────┐     │
│  │  config.eslint   │    │  config.typescript  │     │
│  │  Base + Next.js  │    │  Shared tsconfigs   │     │
│  └──────────────────┘    └─────────────────────┘     │
└──────────────────────────────────────────────────────┘
```

## Shared Packages

- **`@repo/ui`** — Component library built on Radix UI + Tailwind CSS 4 + CVA variants, documented in Storybook. Each component colocates implementation, tests, and stories.
- **`@repo/libs`** — Non-UI shared utilities (math helpers, etc.) consumed by both apps. Tree-shakeable, side-effect free.

## Testing Strategy

```
          ┌─────────────────────────────────────┐
          │  E2E Tests (Playwright)             │
          │  Portal: 20+ specs                  │
          │  Auth flows, form validation,       │
          │  CRUD operations, pagination        │
          ├─────────────────────────────────────┤
          │  Component Tests (Jest + RTL)       │
          │  packages/ui: variant rendering,    │
          │  click handling, ref forwarding,    │
          │  accessibility queries              │
          ├─────────────────────────────────────┤
          │  Unit Tests (Jest)                  │
          │  packages/libs: pure functions      │
          └─────────────────────────────────────┘
```

- **Unit / Component**: Jest 30 (ESM native) + React Testing Library, accessibility-first query priority
- **E2E**: Playwright against production builds — Chromium in CI, all browsers locally
- **CI integration**: Unit tests and quality checks run in parallel, E2E runs against built artifacts

## CI/CD Pipeline

The CI workflow gates every push to `main` and every PR:

```
  ┌────────────────┐     ┌────────────────┐
  │    quality     │     │      test      │
  │  Lint + Types  │     │  Unit Tests    │
  └───────┬────────┘     └───────┬────────┘
          │                      │
          └──────────┬───────────┘
                     ▼
            ┌────────────────┐
            │     build      │
            │  Turbo build   │
            │  Upload .next  │
            │   artifacts    │
            └───────┬────────┘
                    ▼
            ┌────────────────┐
            │      e2e       │
            │   Playwright   │
            │    (matrix)    │
            └────────────────┘
```

1. **quality** and **test** run in parallel — ESLint + TypeScript type checking alongside Jest unit tests
2. **build** runs only after both pass — produces Next.js artifacts, uploaded for downstream jobs
3. **e2e** downloads build artifacts and runs Playwright against the production bundle (no rebuild)
4. A reusable **composite action** (`.github/actions/setup`) handles pnpm, Node.js, dependency install, and Turbo cache restore across all jobs

CD workflows (`deploy-preview.yml`, `deploy-production.yml`) are authored for Vercel — preview on PR, production on main. Pending secrets configuration.
