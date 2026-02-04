---
description: Pre-commit enforcement for type checking, linting, and formatting
tags: [code-quality, husky, lint-staged, eslint, prettier, typescript]
applies_to: All team members (human and AI agents)
status: Active
last_updated: 2026-02-04
---

# Code Quality Enforcement

Automated pre-commit hooks that block commits failing type checks, lint, or formatting.

---

## What It Is

Three tools enforced locally before every commit:

| Tool       | What It Does                         | Scope                                              |
| ---------- | ------------------------------------ | -------------------------------------------------- |
| ESLint     | Catches bugs, enforces code patterns | Staged `.ts`/`.tsx` files                          |
| Prettier   | Consistent formatting                | Staged `.ts`, `.tsx`, `.md`, `.json`, `.css` files |
| TypeScript | Type safety across the monorepo      | All packages (full project)                        |

**Tooling stack:**

| Package       | Role                                            |
| ------------- | ----------------------------------------------- |
| `husky`       | Manages git hooks (`.husky/pre-commit`)         |
| `lint-staged` | Runs ESLint + Prettier on staged files only     |
| `turbo`       | Runs `check-types` across all packages (cached) |

---

## Why We Need It

- **Catch errors before they reach CI** — faster feedback, no waiting for remote pipeline
- **Prevent broken commits** — type errors and lint violations never enter git history
- **Auto-fix what's fixable** — ESLint and Prettier auto-fix staged files on commit
- **Consistent codebase** — formatting debates eliminated, every commit meets the same standard

Without this, broken code can be committed and only caught minutes later in CI. Pre-commit hooks shift enforcement left to the developer's machine.

---

## How It Works

### Commit Flow

```
git commit
     │
     ▼
.husky/pre-commit
     │
     ├─► Step 1: lint-staged (staged files only)
     │     ├─► *.{ts,tsx} → eslint --fix → prettier --write
     │     └─► *.{md,json,css} → prettier --write
     │
     │   ❌ fails → commit blocked, errors shown
     │   ✅ passes ↓
     │
     └─► Step 2: turbo run check-types (all packages)
           │
           ❌ fails → commit blocked, type errors shown
           ✅ passes → commit succeeds
```

### Why Two Steps

- **lint-staged** runs on staged files only — fast, auto-fixes in place
- **check-types** runs on the full project — TypeScript needs full context to resolve imports and types across packages. Turbo caching makes repeated runs fast when few files changed.

### Hook File

`.husky/pre-commit`:

```bash
pnpm exec lint-staged
pnpm run check-types
```

### lint-staged Config

In root `package.json`:

```json
"lint-staged": {
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{md,json,css}": [
    "prettier --write"
  ]
}
```

---

## How to Use It

### Setup (One-Time)

After cloning the repo, hooks install automatically via the `prepare` script:

```bash
pnpm install    # triggers "prepare": "husky" → installs git hooks
```

Verify hooks are installed:

```bash
ls .husky/pre-commit    # should exist
```

### Day-to-Day

Just commit normally. Hooks run automatically:

```bash
git add .
git commit -m "feat(auth): add login form"
# hooks run → lint-staged → check-types → commit or fail
```

### When a Commit Is Blocked

**Lint errors (ESLint):**

```bash
# Most errors auto-fix. If not, the error output shows what to fix:
✖ 1 problem (1 error, 0 warnings)
  src/components/button.tsx:12:5 - Unexpected any. Specify a different type.

# Fix manually, then re-stage and commit:
git add src/components/button.tsx
git commit -m "feat(ui): add button component"
```

**Format errors (Prettier):**

Auto-fixed by lint-staged. If the commit fails due to formatting, the files are already fixed — just re-stage:

```bash
git add .
git commit -m "feat(ui): add button component"
```

**Type errors (TypeScript):**

```bash
# Error output shows the file and issue:
error TS2322: Type 'string' is not assignable to type 'number'.
  packages/ui/src/components/button/index.tsx:15:3

# Fix the type error, then commit again
```

### Skipping Hooks (Escape Hatch)

For emergencies only — use `--no-verify`:

```bash
git commit -m "wip: broken but need to save" --no-verify
```

This skips all pre-commit checks. CI will still catch issues on push.

---

## Relationship to CI

Pre-commit hooks and CI run the same checks:

| Check      | Pre-Commit (Local) | CI (Remote)     |
| ---------- | ------------------ | --------------- |
| ESLint     | Staged files only  | All files       |
| Prettier   | Staged files only  | All files       |
| TypeScript | All packages       | All packages    |
| Unit tests | Not run            | Run             |
| E2E tests  | Not run            | Run after build |

Pre-commit is the first gate. CI is the safety net that catches anything pre-commit missed (e.g., lint issues in unstaged files, test failures).
