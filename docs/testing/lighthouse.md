# Lighthouse CI

Lighthouse is Google's open-source tool that audits web pages for performance, accessibility, SEO, and best practices. It runs against real page loads — not component snapshots or unit tests.

**Why it matters for production apps:** Users abandon slow pages. Search engines penalize poor SEO. Accessibility failures exclude users and create legal risk. Lighthouse catches these issues before they ship, with automated thresholds that block regressions in CI.

- [Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview)
- [Lighthouse CI getting started](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md)

## What It Catches

| Category       | What it measures                           | Why it matters                        |
| -------------- | ------------------------------------------ | ------------------------------------- |
| Performance    | LCP, FID, CLS, load speed, rendering       | Slow pages lose users and conversions |
| Accessibility  | Contrast, ARIA, labels, focus management   | Inclusivity + legal compliance        |
| SEO            | Meta tags, crawlability, mobile-friendly   | Discoverability in search engines     |
| Best Practices | HTTPS, secure JS, image optimization       | Security + modern standards           |
| PWA            | Service workers, manifest, offline support | App-like experience on mobile         |

Unit tests and component tests don't catch these, Lighthouse audits the composed, running application.

## Where It Fits in This Monorepo

**Component level:** Tests individual UI pieces in isolation during development. Fast feedback, catches issues early — but can't see how pieces interact on a real page.

**Page level:** Tests the full running application. Slower, runs in CI — but catches performance bottlenecks, broken layouts, and accessibility gaps that only appear when components combine with real data.

Both layers are necessary. Component tests are fast but blind to integration. Page tests are thorough but slow. Lighthouse operates at the page level.

When Lighthouse finds an issue (e.g., "Button needs better focus states"), that's a signal to fix it upstream in the design system — preventing recurrence across all apps.

## Setup

### Install

```bash
pnpm add -D @lhci/cli -w
```

### Configuration

Create `lighthouserc.cjs` in the app directory (e.g., `apps/portal/lighthouserc.cjs`). App-level config allows different apps to have different thresholds:

```js
module.exports = {
  ci: {
    collect: {
      // Lighthouse will start the server itself
      startServerCommand: "pnpm start",
      startServerReadyPattern: "Ready",
      url: ["http://localhost:3001"],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
```

### CI Integration

Add to workflow after build completes:

```yaml
- name: Lighthouse CI
  run: pnpm --filter @repo/portal lighthouse
  env:
    LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## Thresholds

Lighthouse scores range from 0-100. CI fails if any score drops below these minimums:

| Category       | Minimum | Why this number                                   |
| -------------- | ------- | ------------------------------------------------- |
| Performance    | 90      | Catches regressions without demanding perfection  |
| Accessibility  | 95      | Higher bar — accessibility failures exclude users |
| Best Practices | 90      | Security and modern web standards                 |
| SEO            | 90      | Pages must be discoverable by search engines      |

Only lower thresholds with documented justification (e.g., "third-party widget reduces SEO score, out of our control").

## Local Testing

```bash
# From repo root
pnpm --filter @repo/portal lighthouse

# Or from app directory
cd apps/portal
pnpm lighthouse
```

## Reports

With `temporary-public-storage`, reports upload to a public URL (expires after 7 days). For persistent storage, configure Lighthouse Server or use `filesystem` target.

## Common Issues

**Flaky scores:** Use `numberOfRuns: 3` (or 5) to median results.

**CI environment differences:** Lighthouse in CI may score differently than local. CI runners have consistent resources; local varies.

**Build-time vs runtime a11y:** Some a11y issues only appear with real data. Lighthouse catches these; component tests may not.
