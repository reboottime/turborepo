# CI/CD Portfolio Demo — Turborepo Monorepo

## Scope Boundary

**All operations are scoped to this folder (`projects/cicd/`).** Never read, write, or reference files outside this directory. This project is self-contained — all configs, docs, source code, and agent instructions live here.

## Project Overview

Turborepo monorepo demonstrating frontend infrastructure skills: shared design systems, comprehensive testing, and CI/CD pipelines, building production enterprise grade app from 0~1.

**Repo structure:** See [docs/file-structures.md](docs/file-structures.md)

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

See [docs/engineering-conventions.frontend.md](docs/engineering-conventions.frontend.md)

## Testing Strategy

See [docs/testing-strategy.md](docs/testing-strategy.md)

## Key Files

See [docs/file-structures.md](docs/file-structures.md)
