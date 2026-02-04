# Portal App — File Structure

```
app/
  layout.tsx              # Root layout (html, body, fonts)
  page.tsx                # Root page — redirects to /employees
  icon.tsx                # App favicon (generated)
  login/
    page.tsx              # Login page — email/password form
  (app)/                  # Authenticated route group
    layout.tsx            # App shell layout (wraps authenticated pages)
    employees/
      page.tsx            # Employee list — table, search, filters, CRUD
      _components/        # Page-scoped components
      _lib/               # Page-scoped utils (types, mock data)
lib/
  auth-context.tsx        # Auth context provider
middleware.ts             # Route protection (redirect unauthenticated → /login)
specs/                    # UX wireframes / feature specs
e2e/
  seed.spec.ts            # Test data setup
  smoke.spec.ts           # Basic smoke test
  auth-flow.spec.ts       # Login/logout flow
  login-page/             # Login page E2E tests
  employee-page/          # Employee page E2E tests
```
