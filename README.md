# Enterprise Frontend Foundation

> **Note:** This repo demonstrates my development methodology and agentic workflows, not a polished production codebase. Corners are cut where they don't serve the demo purpose.

[**Design System Preview →**](https://reboottime.github.io/turborepo)

## Value Proposition

Ship fast with reliability: `Define → Generate → Guard`

- **Define** — Humans define standards, workflows, and provide context
- **Generate** — LLM agents deliver code artifacts — features, components, tests
- **Guard** — layered testing (E2E against real API) baked in CI/CD + human review

## How Design System, Internal Libs, and Apps fit together

```sh
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                          Apps                                            │
│                                                                                          │
│    ┌───────────────────────────┐                  ┌───────────────────────────┐          │
│    │  web (:3000)              │                  │  portal (:3001)           │          │
│    │  Next.js 15               │                  │  Next.js 15               │          │
│    │  Consumer app             │                  │  Business portal          │          │
│    └─────────────┬─────────────┘                  └─────────────┬─────────────┘          │
│                  │                                              │                        │
├──────────────────┼──────────────────────────────────────────────┼────────────────────────┤
│                  │                   Packages                   │                        │
│                  ▼                                              ▼                        │
│    ┌─────────────────────────────────────┐        ┌─────────────────────────────┐        │
│    │  @repo/ui                           │        │  @repo/libs                 │        │
│    │  (In-house design system)           │        │  (Shared utilities & logics)│        │
│    │                                     │        │                             │        │
│    └─────────────────────────────────────┘        └─────────────────────────────┘        │
│                                                                                          │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│                                Coding Standards (shared)                                 │
│                          config.eslint  ·  config.typescript                             │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

### apps

- **web** (`:3000`) — Public-facing consumer app
- **portal** (`:3001`) — Business portal — auth, employee management

### Shared Packages

- **`@repo/ui`** — In-house design system built on Radix UI + Tailwind CSS 4 + CVA for maintainability and extensibility. Each component colocates implementation, tests, and stories. Storybook enables visual review. See [Design System Manual](manuals/design-system.md) for how components are generated via `/add-component`.
- **`@repo/libs`** — Shared business logic and utilities — single source of truth across apps.

## Testing Strategy

> Write tests. Not too many. [Mostly integration.](https://kentcdodds.com/blog/write-tests#mostly-integration)

```
                    The Testing Trophy

 Speed    Confidence                              Cost
   ↑          ↑        _________                    ↑
  SLOW       HIGH     / End2End \                  $$$
   |          |      /___________\                  |
   |          |    /               \                |
   |          |   |   Integration   | <-- sweet spot
   |          |    \_______________/                |
   |          |        |  Unit |                    |
   |          |        |_______|                    |
  FAST       LOW        /Static\                    ¢
   ↓          ↓        /________\                   ↓

  Source: kentcdodds.com/blog/the-testing-trophy-and-testing-classifications
```

```sh
                        Testing Frontend Applications

┌────────────────────────────────────────┬────────────────────────────────────────┐
│  Functional Testing                    │  Visual Regression                     │
├────────────────────────────────────────┼────────────────────────────────────────┤
│  E2E (critical paths against real API) │  App-level                             │
│    ↑                                   │    ↑                                   │
│  Integration                           │  Component-level                       │
│    ↑                                   │                                        │
│  Unit tests (behavior, logic, a11y)    │                                        │
└────────────────────────────────────────┴────────────────────────────────────────┘
```

- **Unit / Component**: Jest 30 (ESM native) + React Testing Library, accessibility-first queries
- **Critical path testing**: Playwright against real backend in Docker
- [ ] **Visual Regression Testing**: TBD

## CI/CD Pipeline

CI runs on pull requests and pushes to `main`:

```sh
┌────────────────────┐   ┌────────────────┐
│ Lint + Type Checks │   │  Unit Tests    │  <- parallel
└─────────┬──────────┘   └───────┬────────┘
          │                      │
          └──────────┬───────────┘
                     ↓
              ┌────────────────┐
              │   Build Apps   │
              └───────┬────────┘
                      ↓
              ┌────────────────┐
              │ Build API Image│
              └───────┬────────┘
                      ↓
      ┌───────────────────────────────────┐
      │               e2e                 │
      │  Playwright against real backend  │
      │  (API container --> PostgreSQL)   │
      └───────────────────────────────────┘
```

1. **quality** (lint + type checks) and unit tests run in parallel
2. **build** runs only after both pass — produces Next.js + API artifacts, uploaded for downstream jobs
3. **build-api-image** builds API Docker image, pushes to GHCR
4. **e2e** runs Playwright against real backend (API image from GHCR + PostgreSQL service + migrations/seed)

CD workflows (`deploy-preview.yml`, `deploy-production.yml`) are authored for Vercel — preview on PR, production on main. Pending secrets configuration.

## Agentic Development

LLMs like Claude generate high-quality code, fast. Humans in the loop make the output even better — defining standards, workflows, providing context, and review. The two workflows below show this in action:

### Design System: Component Generation

```
/add-component ComponentName
```

Spawns a design-system expert that produces components ready for curation:

```
┌─────────────────────────────────────────┐
│  /add-component                         │  ← You run this
├─────────────────────────────────────────┤
│  design-system-architect agent          │  ← Executes the workflow
├─────────────────────────────────────────┤
│  Conventions + Workflow Definition      │  ← Rules the agent follows
└─────────────────────────────────────────┘
```

The agent checks for duplicates, reads conventions, implements the component (Radix + forwardRef + cva), writes tests, creates Storybook stories, and verifies everything passes — all following the same patterns.

See [Design System Manual](manuals/design-system.md) for the full breakdown.

### E2E Test Code Generation

```
/test:e2e docs/portal/ux/flows/login-page.md
```

Spawns a pipeline of agents that produce Playwright tests from user flow docs:

```
┌─────────────────────────────────────────┐
│  /test:e2e                              │  ← You run this
├─────────────────────────────────────────┤
│  4 agents: Planner → Generator →        │  ← Execute the workflow
│            Healer ↔ Reviewer            │
├─────────────────────────────────────────┤
│  User flow doc (input)                  │  ← What to test
├─────────────────────────────────────────┤
│  Quality checklist                      │  ← Standards agents follow
└─────────────────────────────────────────┘
```

The Planner reads the flow doc, self-reviews, and outputs a test spec. The Generator writes `.spec.ts` files. Healer and Reviewer then loop: Healer runs tests and fixes failures, Reviewer checks quality. Loop exits when tests pass and Reviewer approves — or if Healer identifies a codebase bug (marked `test.fixme()`).

See [E2E Testing Manual](manuals/e2e-testing.md) for the full breakdown.
