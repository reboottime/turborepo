# CI/CD Portfolio Demo — Turborepo Monorepo

## Scope Boundary

**All operations are scoped to this folder (`projects/cicd/`).** Never read, write, or reference files outside this directory. This project is self-contained — all configs, docs, source code, and agent instructions live here.

## Project Overview

Turborepo monorepo demonstrating frontend infrastructure skills: shared design systems, comprehensive testing, and CI/CD pipelines, building production enterprise grade app from 0~1.

## Tech Stack

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

See [docs/testing-strategy.md](docs/testing-strategy.md)

## Agent Delegation — CRITICAL

> **STOP. When a task maps to a subagent, call the Task tool FIRST. Do NOT read files, grep, glob, or do ANY research beforehand. Zero pre-reads. The subagent has its own tools — let it explore. Your only job is to delegate.**

Violations: Reading the flow doc, reading agent instructions, reading Playwright config, reading test files — all of this BEFORE spawning the agent — is a violation. The agent does its own reading.

**Subagents:** The "See [link]" references above are for human orientation. Subagents should NOT read docs unless directly relevant to their assigned task. Focus on the task, not on reading every linked doc in this file.

## Key Files

Codebase related file structure: [docs/file-structures.md](docs/file-structures.md)
