# Testing Strategy

## Unit Tests (Jest + RTL)

- Every component in `ui` package has tests
- Test behavior, not implementation
- RTL query priority: getByRole > getByLabelText > getByText > getByTestId
- 80%+ coverage on shared packages

## E2E Tests (Playwright)

- Test critical user flows in `web` and `portal`
- Test shared components render correctly in consuming apps
- Run against local dev server in CI

## CI Pipeline Order

1. Install dependencies (pnpm, cached)
2. Lint
3. Type check
4. Unit tests
5. Build all packages (Turborepo cached)
6. E2E tests
7. Deploy
    - dev
    - staging
    - production