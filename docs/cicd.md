# CI/CD Pipeline

## Workflow Diagram

```
PR opened/sync                          Push to main
     │                                       │
     └──────────────┬────────────────────────┘
                    ▼
══════════════════════════════════════════════════
              ci-build.yml (CI - Build)
══════════════════════════════════════════════════

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│     changes      │  │     quality      │  │       test       │
│ (paths-filter)   │  │  (lint + types)  │  │   (unit tests)   │
└────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
         │                     │                     │
         ▼                     └──────────┬──────────┘
┌──────────────────┐                      │
│    chromatic     │                      │
│ (visual review)  │                      │
│                  │                      │
│ if: ui changed   │                      │
└──────────────────┘                      │
                              both must pass
                                          ▼
                             ┌──────────────────┐
                             │      build       │
                             │ (turbo run build)│
                             │                  │
                             │ uploads:         │
                             │  - web-build     │
                             │  - portal-build  │
                             │  - api-build     │
                             └────────┬─────────┘
                                      │
                              CI - Build completed
                                      │
                                      ▼
══════════════════════════════════════════════════
               ci-e2e.yml (CI E2E)
        triggers: workflow_run (main) or PR
══════════════════════════════════════════════════

                    ┌──────────────────┐
                    │  build-api-image │
                    │                  │
                    │ - download api   │
                    │ - docker build   │
                    │ - push to GHCR   │
                    └────────┬─────────┘
                             ▼
                    ┌──────────────────┐
                    │       e2e        │
                    │   (playwright)   │
                    │                  │
                    │ real integration │
                    │ API + Postgres   │
                    └────────┬─────────┘
                             │
                       E2E completed
                ┌────────────┴────────────┐
                │                         │
           ❌ FAILED                 ✅ SUCCESS
                │                         │
           everything            ┌────────┴────────┐
            skips                │                 │
                            if: PR            if: main
                                 │                 │
                                 ▼                 ▼
               deploy-preview.yml     deploy-production.yml
               ┌─────────┬────────┐   ┌─────────┬────────┐
               │deploy   │deploy  │   │deploy   │deploy  │
               │web      │portal  │   │web      │portal  │
               │(Vercel) │(Vercel)│   │(--prod) │(--prod)│
               └─────────┴────────┘   └─────────┴────────┘
                 parallel, no deps      parallel, no deps
```

## E2E Integration Architecture

The E2E job runs Playwright tests against a real API backend:

```
┌─────────────────────────────────────────────────────────────┐
│  GitHub Actions Runner (ubuntu-latest)                      │
│  Network: host                                              │
│                                                             │
│  ┌─────────────┐   localhost:3002   ┌─────────────────────┐│
│  │   Portal    │ ─────────────────► │   API Container     ││
│  │   :3001     │                    │   --network host    ││
│  │             │                    │   PORT=3002         ││
│  └─────────────┘                    └──────────┬──────────┘│
│        ▲                                       │           │
│        │                                       ▼           │
│  ┌─────────────┐                    ┌─────────────────────┐│
│  │  Playwright │                    │   Postgres          ││
│  │  (browser)  │                    │   :5432 (service)   ││
│  └─────────────┘                    └─────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Flow:**

1. Postgres starts as GitHub Actions service
2. Prisma migrations + seed data applied
3. API container pulled from GHCR + Playwright install (parallel)
4. API starts on host network, waits for health check
5. Portal starts via Playwright webServer
6. Playwright tests run against real API

## API Docker Image

The API uses pre-built artifacts (not multi-stage build):

```
build job                    build-api-image job
─────────                    ───────────────────
turbo run build              download api-build artifact
prisma generate                     │
     │                              ▼
     ▼                       Dockerfile (just COPY)
apps/api/dist ──────────►           │
apps/api/prisma                     ▼
apps/api/package.json        push to GHCR
apps/api/node_modules/.prisma
```

**Why pre-built:** Turborepo caching. Building in Docker would lose cache benefits.

**Image location:** `ghcr.io/<owner>/<repo>/api:<sha>`

## Gate Summary

| Condition                | E2E  | Deploy Preview  | Deploy Production |
| ------------------------ | ---- | --------------- | ----------------- |
| CI - Build fails         | skip | skip            | skip              |
| CI - Build passes + PR   | run  | run (after E2E) | skip              |
| CI - Build passes + main | run  | skip            | run (after E2E)   |
| E2E fails                | fail | skip            | skip              |

## Workflow Files

| File                    | Trigger                     | Purpose                                  |
| ----------------------- | --------------------------- | ---------------------------------------- |
| `ci-build.yml`          | push to main, PR            | Lint, types, unit test, chromatic, build |
| `ci-e2e.yml`            | after CI - Build succeeds   | Build API image, E2E tests               |
| `deploy-preview.yml`    | after CI succeeds (PR only) | Deploy preview to Vercel                 |
| `deploy-production.yml` | after CI succeeds (main)    | Deploy production to Vercel              |

**Archived:** `_archived/storybook.yml` — Chromatic hosts published Storybook, GitHub Pages redundant.

## Chromatic (Visual Review)

Runs conditionally in `ci-build.yml` when `packages/ui/**` changes:

- Uses `dorny/paths-filter` to detect ui package changes
- Builds Storybook and uploads to Chromatic
- Auto-accepts changes on main branch
- Exits zero on changes (non-blocking for PRs)

## Branch Protection

To prevent merging PRs until CI passes, configure GitHub branch protection:

1. **Settings** → **Branches** → **Add branch protection rule**
2. Branch name pattern: `main`
3. Enable **Require status checks to pass before merging**
4. Select required jobs: `Lint & Type Check`, `Unit Tests`, `Build`, `E2E`
5. Enable **Require branches to be up to date before merging**

Note: Status checks only appear in the dropdown after the workflow has run at least once.

## Shared Composite Action

All workflows use `.github/actions/setup/action.yml`:

- pnpm install (v9)
- Node.js setup (v22)
- Turbo cache

## Required Permissions

For GHCR push, the workflow needs:

```yaml
permissions:
  contents: read
  packages: write
```

`GITHUB_TOKEN` is used automatically — no secrets setup needed.
