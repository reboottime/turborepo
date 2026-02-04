# E2E Testing: Mock API vs Real API

## Key Takeaway

Tests with mocked APIs are **integration tests**, not E2E tests. The industry standard is a **layered approach**, not pure mocking.

## Terminology Matters

| Test Type        | What It Means                                                                                                                                     | Mocking Level                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unit Test        | Isolated source code tested to validate expected behavior. Tests one unit (function, component, module) in isolation from the rest of the system. | Heavy — mock all external dependencies (APIs, services, sibling modules, 3rd party libs with side effects). Only pure utility functions are called directly. |
| Integration test | Frontend + mocked API (e.g., `page.route()`, MSW)                                                                                                 | Heavy                                                                                                                                                        |
| E2E test         | Full stack, real backend, minimal mocking                                                                                                         | Minimal                                                                                                                                                      |
| Contract test    | Verify API shape agreement between consumer & provider                                                                                            | N/A                                                                                                                                                          |

Calling mocked-API browser tests "E2E" contradicts standard definitions from Kent C. Dodds, Martin Fowler, and Google's testing guidance.

## What Playwright Actually Recommends

- Mock **third-party dependencies you don't control** (OAuth, external APIs)
- For your own backend: _"Test against a staging environment and make sure it doesn't change"_
- `page.route()` is a capability, not the recommended default

Source: [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## The Industry Standard: Layered Testing

1. **Frontend integration tests** (mocked API) — fast, deterministic, every PR
2. **Contract tests** (e.g., Pact) — prevent mock drift
3. **True E2E tests** (real backend) — critical paths only

### What Are Critical Paths?

User flows where a bug causes the most damage — flows that **must work or the product breaks**. True E2E tests are slow, flaky, and expensive to maintain, so you only run them against a real backend for flows where mock drift would hurt the most:

- **Auth** — login, signup, sessions (cookies, tokens, redirects across frontend + backend + auth provider — mocks can't catch real integration failures)
- **Payments / checkout** — money involved, a missed bug is costly
- **Data mutations** — create/update/delete where frontend + backend validation + DB constraints all need to agree

Everything else (table renders, form validation UI, state transitions) is fine with mocked APIs — the cost of a mock-related miss is lower.

## Downsides of Pure Mocking (Easy to Overlook)

- **Mock drift** — backend evolves, mocks go stale, tests pass but real integration is broken
- **False confidence** — testing assumptions about the API, not the API itself
- **Missed bugs** — auth flows, CORS, serialization mismatches, race conditions, backend validation
- **Maintenance cost** — every API change requires updating mocks manually
- **SSR blind spot** — `page.route()` only intercepts browser-side requests, not server-side fetches (relevant for Next.js Server Components)

## What This Means for This Project

The Playwright tests in `apps/{web,portal}/e2e/` should be clear about what they are:

- Tests using `page.route()` to mock Supabase = **integration tests** (valuable, keep them)
- If critical flows (auth, data mutations) are only tested against mocks = **coverage gap**
- Consider adding contract tests or a thin real-backend E2E layer for high-stakes paths

## References

- [Playwright - Mock APIs](https://playwright.dev/docs/mock)
- [Playwright - Best Practices](https://playwright.dev/docs/best-practices)
- [Kent C. Dodds - The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [Kent C. Dodds - Write Tests. Not Too Many. Mostly Integration.](https://kentcdodds.com/blog/write-tests)
- [Martin Fowler - The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Martin Fowler - Integration Test](https://martinfowler.com/bliki/IntegrationTest.html)
- [Google Testing Blog - Just Say No to More End-to-End Tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)
