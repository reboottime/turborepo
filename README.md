# Enterprise Frontend Foundation

## Value Proposition

- **Design system consistency** — shared components across apps, catch breaks when changing `@repo/ui` or `@repo/libs` through testing layers built into CI/CD pipeline
- **API contract safety** — E2E tests against real containers, not mocks
- **Agentic development** — AI agents iterate on UX/components, CI gates catch regressions before merge

## How Design System, Internal Libs, and Apps fit together

```sh
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
│  │  Components  │        │  Utilities   │            │
│  │  + Tests     │        │  + Tests     │            │
│  │  + Stories   │        └──────────────┘            │
│  └──────────────┘                                    │
│                                                      │
├──────────────────────────────────────────────────────┤
│              Coding Standards (shared)               │
│         config.eslint  ·  config.typescript          │
└──────────────────────────────────────────────────────┘
```

### apps

- **web** (`:3000`) — Public landing page
- **portal** (`:3001`) — Internal app with auth + employee management

### Shared Packages

- **`@repo/ui`** — Component library built on Radix UI + Tailwind CSS 4 + CVA variants. Each component colocates implementation, tests, and stories. Storybook provides visual review for design decisions.
- **`@repo/libs`** — Non-UI shared utilities consumed by both apps. Tree-shakeable, side-effect free.

## Testing Strategy

```
          ┌─────────────────────────────────────┐
          │  E2E Tests (Playwright)             │
          │  Portal: 20+ specs                  │
          │  Real API container + PostgreSQL    │
          │  Auth flows, CRUD, pagination       │
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

- **Unit / Component**: Jest 30 (ESM native) + React Testing Library, accessibility-first queries
- **E2E**: Playwright against real backend (API Docker container + PostgreSQL with migrations and seeding)

## CI/CD Pipeline

CI runs on pull requests and pushes to `main`:a

```sh
  ┌────────────────────┐   ┌────────────────┐
  │ Lint + Type Checks │   │  Unit Tests    │  ← parallel
  └─────────┬──────────┘   └───────┬────────┘
            │                      │
            └──────────┬───────────┘
                       ▼
                ┌────────────────┐
                │   Build Apps   │
                └───────┬────────┘
                        ▼
                ┌────────────────┐
                │ Build API Image│
                └───────┬────────┘
                        ▼
        ┌─────────────────────────────────────┐
        │               e2e                   │
        │  Playwright against real backend    │
        │  (API container + PostgreSQL)       │
        └─────────────────────────────────────┘
```

1. **quality** (lint + type checks) and unit tests run in parallel
2. **build** runs only after both pass — produces Next.js + API artifacts, uploaded for downstream jobs
3. **build-api-image** builds the API Docker image and pushes to GitHub Container Registry
4. **e2e** spins up PostgreSQL service, pulls API image from GHCR, runs migrations/seed, then executes Playwright against the real backend

CD workflows (`deploy-preview.yml`, `deploy-production.yml`) are authored for Vercel — preview on PR, production on main. Pending secrets configuration.

## Agentic Development

AI coding agents can iterate quickly on components and features. The testing pyramid + CI gates act as the accountability layer:

- **Component changes** → unit/component tests catch regressions
- **Integration changes** → E2E against real API catches contract breaks
- **All changes** → must pass CI before merge

Storybook enables visual review of design decisions made by agents or humans.
