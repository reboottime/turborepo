---
description: Project-specific git conventions
tags: [git, conventions, workflow, commits, pr]
applies_to: All team members (human and AI agents)
status: Active
last_updated: 2026-02-02
---

# Team Git Conventions

Project-specific git conventions. General best practices assumed.

---

## Workflow

- Branches required (`feature/*`, `bugfix/*`, `hotfix/*`)
- PRs required for main
- Never push to main directly (PR merge only, no exceptions)
- CI checks enforced
- Release tags and changelogs recommended

---

## Commit Strategy

### Feature vs Atomic Commits

**Feature commits (preferred):**

Group related changes that implement one logical feature/fix together.

- Use when: Changes should be reverted together, implementing one feature, fixing one bug
- Example: Dark mode (CSS + JS + config + tests) = 1 commit

**Atomic commits:**

Split unrelated changes into separate commits.

- Use when: Changes are truly independent, different bugs fixed in one session
- Example: Fixed bug A + Fixed bug B + Updated deps = 3 commits

**Rule:** Prefer feature commits (clearer history, easier review). Use atomic commits only for truly independent changes.

---

## Security Rules (Required)

**NEVER commit secrets or sensitive data:**

- `.env` files (use `.env.example` instead)
- API keys, tokens, credentials
- Passwords or authentication secrets
- Private certificates or keys
- Database connection strings with credentials

**If accidentally committed:** Rotate the secret immediately and use `git filter-branch` or BFG Repo-Cleaner to remove from history.

---

## Branch Naming (Required)

```bash
feature/short-description    # New features
bugfix/short-description     # Bug fixes
hotfix/short-description     # Urgent production fixes
```

**Examples:**

- `feature/user-authentication`
- `bugfix/login-redirect-loop`
- `hotfix/critical-security-patch`

---

## Commit Message Format (Required)

Use [Conventional Commits](https://www.conventionalcommits.org/) with **required Claude Code footer**.

**Scope is REQUIRED** (except `merge:` type). Use the primary area of change (e.g., `docs`, `auth`, `ui`, `deps`).

```
type(scope): Short description (max 72 chars)

Optional body explaining why (not what).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Commit Types (Enforced)

| Type | When to Use | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(auth): add JWT authentication` |
| `fix` | Bug fix | `fix(login): resolve redirect loop` |
| `docs` | Documentation changes | `docs(readme): update setup instructions` |
| `style` | Code formatting, no logic changes | `style(components): fix indentation` |
| `refactor` | Code refactoring | `refactor(api): simplify error handling` |
| `test` | Adding or updating tests | `test(auth): add login flow tests` |
| `chore` | Maintenance tasks, dependencies, config | `chore(deps): update react to 18.3` |
| `merge` | Merging branches | `merge: feature/auth into main` |

---

## Push Strategy

- Never push to main directly (PR only)
- Feature branches: auto-push after commit

---

## Reporting to Human (Required)

**All agents performing git operations MUST report actions explicitly:**

**Push actions:**

- **PUSHED:** "PUSHED to [branch]" or "PUSHED to origin/[branch]"
- **NOT PUSHED:** "COMMITTED (not pushed)" or "COMMITTED ONLY (not pushed)"

**Include in report:**

- Files changed (count or list)
- Commit hash (short form)
- Remote impact (pushed to origin or local only)
- Branch name

**Example:**

```
PUSHED to origin/main
- Commit: abc1234
- Files: 3 (auth.ts, login.tsx, README.md)
- Impact: Remote repository updated
```

---

## PR Requirements

- Summary, Why, Test Plan, Screenshots
- Rollback plan documented
- Test coverage checked
- Performance impact assessed
- Deployment notes included

---

**Note:** This is a living document. Update as conventions evolve.
