# Playwright

## Component Visual Regression Testing

Two approaches to screenshot Storybook stories with Playwright. Both use `toHaveScreenshot()` for image diffing.

### Approach 1: Playwright Component Testing (CT) + Portable Stories

Renders components directly in a real browser — no running Storybook server needed.

- Import story via Storybook's [portable stories API](https://storybook.js.org/blog/portable-stories-for-playwright-ct/)
- Render it in Playwright CT
- `toHaveScreenshot()` against baseline

### Approach 2: Playwright against a running Storybook server

Navigates to each story's iframe URL, takes a screenshot.

- Requires `storybook build` or `storybook dev` first
- Playwright visits story URLs and captures screenshots
- Reference: [James Ives](https://jamesiv.es/blog/frontend/testing/2024/03/11/visual-testing-storybook-with-playwright/), [Markus Oberlehner](https://markus.oberlehner.net/blog/running-visual-regression-tests-with-storybook-and-playwright-for-free)

### Known tradeoffs (both approaches)

- OS-dependent baselines — Mac and Linux CI render differently (fonts, anti-aliasing). Must run baseline generation and CI in the same environment (e.g. Docker with pinned browser)
- No review UI — test pass/fail with a diff image in test output, no side-by-side approval workflow like Chromatic
