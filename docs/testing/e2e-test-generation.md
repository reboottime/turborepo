# E2E Test Generation with Playwright Test Agents

How we generate and maintain E2E tests using Playwright's AI-powered test agent pipeline.

## What Are Playwright Test Agents?

[Playwright Test Agents](https://playwright.dev/docs/test-agents) are three built-in AI agents that ship with Playwright. They work independently or sequentially to create and maintain E2E tests without hand-writing them:

| Agent         | Role                                     | Input                                             | Output                                                |
| ------------- | ---------------------------------------- | ------------------------------------------------- | ----------------------------------------------------- |
| **Planner**   | Explores the app, designs test scenarios | User request + seed test + optional PRD/wireframe | Markdown test plan in `specs/`                        |
| **Generator** | Converts plans into executable tests     | Spec from `specs/`                                | Test files in `e2e/`, one-to-one with spec scenarios  |
| **Healer**    | Debugs and fixes failing tests           | Failing test name                                 | Patched test code, or `test.fixme()` if app is broken |

Each agent connects to a real browser via an MCP server. They don't just generate code from templates — they interact with the live app, verify selectors, and validate assertions in real-time.

The `--loop` flag determines which AI coding tool hosts the agents. We use `--loop=claude` for Claude Code. Other options: `vscode` (v1.105+), `copilot`, `opencode`.

## Overview

Instead of hand-writing E2E tests, we use this three-agent pipeline that takes a UX wireframe as input and produces executable Playwright tests as output:

```
Wireframe (docs/ux/*.md)
    ↓
  Planner    →  specs/<feature>.md       (human-readable test plan)
    ↓
  Generator  →  e2e/<feature>/*.spec.ts  (executable tests)
    ↓
  Healer     →  fixes failing tests automatically
```

## Prerequisites

### Playwright Test Agents

Initialized per-app via:

```bash
cd apps/<app>
npx playwright init-agents --loop=claude
```

This scaffolds:

| File                                          | Purpose                                                  |
| --------------------------------------------- | -------------------------------------------------------- |
| `.mcp.json`                                   | MCP server config — gives agents access to browser tools |
| `.claude/agents/playwright-test-planner.md`   | Planner agent definition                                 |
| `.claude/agents/playwright-test-generator.md` | Generator agent definition                               |
| `.claude/agents/playwright-test-healer.md`    | Healer agent definition                                  |
| `e2e/seed.spec.ts`                            | Seed test — environment bootstrap template               |
| `specs/README.md`                             | Specs directory marker                                   |

Re-run after Playwright version updates to pick up new agent definitions and tools.

### Seed Test

The `e2e/seed.spec.ts` file serves two purposes:

1. **Environment bootstrap** — provides a ready-to-use page context for agents (e.g., navigating to the right URL, logging in if needed)
2. **Code style reference** — demonstrates the test structure and patterns agents should follow when generating tests

The Planner runs the seed test first to establish the environment before exploring the app. The Generator references it for code conventions.

### MCP Server

The `.mcp.json` file configures a local MCP (Model Context Protocol) server. It starts `playwright run-test-mcp-server`, which exposes browser automation tools (`browser_click`, `browser_snapshot`, `generator_setup_page`, `test_run`, etc.) to the agents. Without it, agents can only read/write files — they can't interact with the app in a browser.

## The Three Agents

### 1. Planner

**Input**: A wireframe/PRD + the live app running in a browser.

**What it does**: Opens the app in a real browser, explores the UI, maps out interactive elements, and produces a human-readable test plan.

**Output**: `specs/<feature>.md` — a structured markdown file listing every test scenario with steps and expected outcomes.

**Example**: For the login page wireframe, the Planner produced `specs/login-page.md` with 10 scenarios covering form rendering, validation, accessibility, keyboard navigation, and the login flow.

### 2. Generator

**Input**: A spec file from `specs/` + the live app.

**What it does**: For each scenario in the spec, it opens the app, manually executes the steps in a real browser, records the actions, and generates a Playwright test file.

**Output**: One `.spec.ts` file per scenario in `e2e/<feature>/`.

Each generated file includes traceability comments:

```typescript
// spec: specs/login-page.md
// seed: e2e/seed.spec.ts
```

### 3. Healer

**Input**: Failing test names.

**What it does**: Runs the failing test in debug mode, inspects the browser state, identifies why the test fails (wrong selectors, timing issues, incorrect assertions), and patches the test code. Repeats until tests pass.

**When the app is wrong**: If the Healer determines the test is correct and the app has a bug, it marks the test with `test.fixme()` and writes a proposal to `docs/proposals/` explaining the issue.

> **Note**: Agent definitions (`.claude/agents/playwright-test-*.md`) are static files generated by Playwright. Don't hand-edit them — they regenerate when you re-run `init-agents` after a Playwright update.

## File Structure

Per-app layout (e.g., `apps/portal/`):

```
specs/
  login-page.md              # Planner output — test plan
e2e/
  seed.spec.ts               # Seed test template
  auth-flow.spec.ts          # Hand-written tests (pre-existing)
  login-page/                # Generated tests (one folder per feature)
    form-rendering.spec.ts
    empty-form-submit.spec.ts
    password-visibility-toggle.spec.ts
    button-disabled-state.spec.ts
    successful-login.spec.ts
    tab-order.spec.ts
    enter-key-submit.spec.ts
    accessibility.spec.ts
    ...
.claude/agents/
  playwright-test-planner.md
  playwright-test-generator.md
  playwright-test-healer.md
.mcp.json
```

## Running the Pipeline

### Full pipeline (via Claude Code)

Use the `/test-e2e` command with a wireframe path:

```
/test-e2e docs/ux/login-page.md
```

This triggers all three agents in sequence: Planner, Generator, Healer.

### Running tests manually

```bash
# All E2E tests, all browsers
pnpm test:e2e

# Specific feature, Chromium only (faster)
cd apps/portal
npx playwright test e2e/login-page/ --project=chromium

# Single test file
npx playwright test e2e/login-page/form-rendering.spec.ts
```

### Re-healing after app changes

When the app UI changes and tests break:

1. Run tests to identify failures
2. Spawn the Healer agent on the failing tests
3. Healer debugs and patches the test files

If many tests break (layout overhaul, component redesign), consider re-running the full pipeline from the Planner with an updated wireframe.

## Conventions

### Specs are the source of truth

To change test behavior, edit the spec in `specs/`, then re-run the Generator. Don't hand-edit generated tests unless the Healer is doing it to fix locators.

### One test per file

Each scenario gets its own `.spec.ts` file. This makes failures easy to identify and heal independently.

### No app code changes from tests

If E2E tests reveal an app bug (missing aria attributes, broken navigation), don't fix the app code from the test pipeline. Instead, write a proposal to `docs/proposals/` with the naming convention `e2e-<description>.md`.

### Selector strategy

Generated tests follow Playwright's recommended selector priority:

1. `getByRole` — buttons, headings, links
2. `getByLabel` — form fields with labels
3. `getByPlaceholder` — form fields by placeholder text
4. `getByText` — visible text content
5. CSS selectors — last resort

## Gotchas

### `getByLabel` ambiguity

If a form field has a label "Password" and a nearby button has `aria-label="Show password"`, `getByLabel('Password')` may resolve to the button. Use `getByPlaceholder('Enter your password')` instead. The Healer catches these, but it's good to know why.

### Validation triggers

Forms using react-hook-form with disabled submit buttons can't trigger validation by clicking the button. Validation errors only appear on blur (tab away from a touched field) or on form submit. The Generator may need adjustment — the Healer handles this.

### Demo auth

The portal app uses demo authentication — any non-empty credentials are accepted. Server error banners (wrong credentials) can't be tested until a real API is connected.

## References

- [Playwright Test Agents docs](https://playwright.dev/docs/test-agents)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- Agent definitions: `apps/<app>/.claude/agents/playwright-test-*.md`
- E2E test engineer: `.claude/agents/e2e-test-engineer.md`
