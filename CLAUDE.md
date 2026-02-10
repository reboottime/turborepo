# CI/CD Portfolio Demo — Turborepo Monorepo

## Scope Boundary

**All operations are scoped to this folder (`projects/cicd/`).** Never read, write, or reference files outside this directory. This project is self-contained — all configs, docs, source code, and agent instructions live here.

## Agent Delegation — CRITICAL

> **STOP. When a task maps to a subagent, call the Task tool FIRST. Zero pre-reads — no files, no agent instructions, no research. The subagent has its own tools and context. Your only job is to delegate.**

**Subagents:** The "See [link]" references are for human orientation. Focus on your assigned task, not on reading every linked doc.

## Communication Rules

**Documentation:** Audience is not a technical expert. Explain concepts clearly and logically. Keep content concise but coherent — no jargon dumps or assumed knowledge.

**Collaboration:** Lead with recommendations. When presenting options, recommend one first with reasoning. Don't ask "which do you prefer?" without a clear recommendation.

## Project Goal

Turborepo monorepo demonstrating frontend infrastructure skills: shared design systems, comprehensive testing, and CI/CD pipelines, building production enterprise grade app from 0~1.

### Tech Stack

See [docs/tech-stack.md](docs/tech-stack.md) (includes architecture decisions)

## Commands

```bash
pnpm dev                        # Dev all apps
pnpm build                      # Build all (Turborepo cached)
pnpm test                       # Jest tests across all packages
pnpm test:e2e                   # Playwright E2E tests
pnpm lint                       # Lint all packages
pnpm storybook                  # Storybook for ui package
turbo run build --filter=web    # Build specific app
turbo run test --filter=ui      # Test specific package
```

## Code Conventions

See [docs/conventions/index.md](docs/conventions/index.md)

## Testing Strategy

See [docs/testing/index.md](docs/testing/index.md)

## Content Discovery

When exploring any folder, read its `index.md` first. These files describe the folder's purpose, contents, and how pieces connect. Start there before diving into individual files.

**`manuals/`** — Human reading only. Do not read or reference these files.

**File structure:** [docs/file-structures.md](docs/file-structures.md)
