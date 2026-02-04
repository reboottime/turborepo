# Testing Strategy

## Unit Tests (Jest + RTL)

- Every component in `ui` package has tests
- Test behavior, not implementation
- RTL query priority: getByRole > getByLabelText > getByText > getByTestId
- 80%+ coverage on shared packages

## E2E Tests (Playwright)

- Test critical user flows in `web` and `portal`
- Test shared components render correctly in consuming apps
- Run against production build (`next start`), not dev server
- Chromium only in CI (faster), all browsers locally
- Config: `apps/{web,portal}/playwright.config.ts`
- Tests: `apps/{web,portal}/e2e/`

## CI Pipeline Order (GitHub Actions)

```
PR to main:
  quality (lint + type-check) ─┐
                                ├── build ── e2e
  test (unit tests) ───────────┘

Push to main:
  CI (above) ── deploy-web ── deploy-portal
```

1. `quality` — lint + type-check (parallel with test)
2. `test` — unit tests (parallel with quality)
3. `build` — production build (gates on quality + test)
4. `e2e` — Playwright smoke tests against production builds
5. `deploy` — Vercel deploy (separate workflow, main branch only)
