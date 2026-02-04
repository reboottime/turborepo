# CI/CD Pipeline

## Workflow Diagram

```sh
PR opened/sync                          Push to main
     │                                       │
     └──────────────┬────────────────────────┘
                    ▼
══════════════════════════════════════════════════
                 ci.yml (CI)
══════════════════════════════════════════════════

┌──────────────────┐     ┌──────────────────┐
│    quality       │     │      test        │
│  (lint + types)  │     │  (unit tests)    │
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
            └────────┬─────────┘
                     │
                     ▼
            workflow_run completed
            ┌────────┴─────────┐
            │                  │
       ❌ FAILED          ✅ SUCCESS
            │                  │
       everything          ┌───┴──────────────────┐
        skips              │                      │
                           ▼                      ▼
            ┌────────────────────┐       ┌──────────────────┐
            │  if: PR event      │       │  e2e.yml          │
            ▼                    │       │(PR and main push) │
                                 │       └──────────────────┘
  deploy-preview.yml             │
  ┌───────────┬──────────┐       │  ┌──────────────────┐
  │deploy-web │deploy-   │       │  │  build (for E2E) │
  │ (Vercel)  │portal    │       │  │                  │
  │           │(Vercel)  │       │  │  uploads:        │
  └───────────┴──────────┘       │  │  - web-build     │
    parallel, no deps            │  │  - portal-build  │
                                 │  └────────┬─────────┘
                                 │           │
                                 │ ┌─────────┴──────────┐
                                 │ ▼                    ▼
                                 │ ┌────────┐  ┌────────────┐
                                 │ │e2e     │  │e2e         │
                                 │ │(web)   │  │(portal)    │
                                 │ │playwright  │playwright │
                                 │ └────────┘  └────────────┘
                                 │  fail-fast: false
                                 │
                                 │  workflow_run completed
                                 │  ┌────────┴─────────┐
                                 │  │                  │
                                 │ ❌ FAILED       ✅ SUCCESS
                                 │  │                  │
                                 │  skips          ┌───┘
                                 │                 │
                                 │                 ▼
                                 │      if: branch == main
                                 │
                                 │  deploy-production.yml
                                 │  ┌───────────┬──────────┐
                                 │  │deploy-web │deploy-   │
                                 │  │ (--prod)  │portal    │
                                 │  │           │(--prod)  │
                                 │  └───────────┴──────────┘
                                 │    parallel, no deps
```

## Gate Summary

| Condition                    | E2E  | Deploy Preview | Deploy Production |
| ---------------------------- | ---- | -------------- | ----------------- |
| CI fails                     | skip | skip           | skip              |
| CI passes + PR               | run  | run            | skip              |
| CI passes + main, E2E fails  | run  | skip           | skip              |
| CI passes + main, E2E passes | run  | skip           | run               |

## Workflow Files

| File                    | Trigger                        | Purpose                                    |
| ----------------------- | ------------------------------ | ------------------------------------------ |
| `ci.yml`                | push to main, PR               | Lint, type check, unit test, build         |
| `e2e.yml`               | after CI succeeds              | Playwright E2E tests (matrix: web, portal) |
| `deploy-preview.yml`    | after CI succeeds (PR only)    | Deploy preview to Vercel                   |
| `deploy-production.yml` | after E2E succeeds (main only) | Deploy production to Vercel                |

## Shared Composite Action

All workflows use `.github/actions/setup/action.yml`:

- pnpm install (v9)
- Node.js setup (v18)
- Turbo cache
