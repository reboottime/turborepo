# CI/CD Pipeline

## Workflow Diagram

```
PR opened/sync                          Push to main
     │                                       │
     └──────────────┬────────────────────────┘
                    ▼
══════════════════════════════════════════════════
                 ci.yml (CI)
══════════════════════════════════════════════════

┌──────────────────┐     ┌──────────────────┐
│     quality      │     │       test       │
│  (lint + types)  │     │   (unit tests)   │
└────────┬─────────┘     └────────┬─────────┘
         │      both must pass    │
         └───────────┬────────────┘
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
                     ▼
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
              CI completed
         ┌───────────┴───────────┐
         │                       │
    ❌ FAILED              ✅ SUCCESS
         │                       │
    everything            ┌──────┴──────┐
     skips                │             │
                     if: PR        if: main
                          │             │
                          ▼             ▼
            deploy-preview.yml   deploy-production.yml
            (workflow_run: CI)   (workflow_run: CI)
            ┌─────────┬────────┐ ┌─────────┬────────┐
            │deploy   │deploy  │ │deploy   │deploy  │
            │web      │portal  │ │web      │portal  │
            │(Vercel) │(Vercel)│ │(--prod) │(--prod)│
            └─────────┴────────┘ └─────────┴────────┘
              parallel, no deps    parallel, no deps


            chromatic.yml (disabled — manual only)
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
2. API image pulled from GHCR, runs on host network
3. Prisma migrations + seed data applied
4. Portal starts via Playwright webServer
5. Playwright tests run against real API

## API Docker Image

The API uses pre-built artifacts (not multi-stage build):

```
build job                    build-api-image job
─────────                    ───────────────────
turbo run build              download api-build artifact
     │                              │
     ▼                              ▼
apps/api/dist ──────────►    Dockerfile (just COPY)
apps/api/prisma                     │
apps/api/package.json               ▼
                             push to GHCR
```

**Why pre-built:** Turborepo caching. Building in Docker would lose cache benefits.

**Image location:** `ghcr.io/<owner>/<repo>/api:<sha>`

## Gate Summary

| Condition             | E2E  | Deploy Preview | Deploy Production |
| --------------------- | ---- | -------------- | ----------------- |
| CI fails (before E2E) | skip | skip           | skip              |
| CI passes + PR        | run  | run            | skip              |
| CI passes + main      | run  | skip           | run               |
| CI E2E fails + main   | fail | skip           | skip              |

## Workflow Files

| File                    | Trigger                     | Purpose                              |
| ----------------------- | --------------------------- | ------------------------------------ |
| `ci.yml`                | push to main, PR            | Lint, types, unit test, build, E2E   |
| `deploy-preview.yml`    | after CI succeeds (PR only) | Deploy preview to Vercel             |
| `deploy-production.yml` | after CI succeeds (main)    | Deploy production to Vercel          |
| `chromatic.yml`         | manual (workflow_dispatch)  | Visual review — disabled placeholder |

## Branch Protection

To prevent merging PRs until CI passes, configure GitHub branch protection:

1. **Settings** → **Branches** → **Add branch protection rule**
2. Branch name pattern: `main`
3. Enable **Require status checks to pass before merging**
4. Select required jobs: `quality`, `test`, `build`, `build-api-image`, `e2e`
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
