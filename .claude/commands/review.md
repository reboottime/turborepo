Review the current state of the project for quality and correctness.

Scope: $ARGUMENTS (or "all" if not specified)

Steps:

1. Run `pnpm lint && pnpm type-check && pnpm test && pnpm build`
2. Check monorepo health (imports, turbo.json, workspace config)
3. Check component quality (Radix, Tailwind, cva, accessibility, exports)
4. Check test quality (coverage, no flaky patterns, behavior-focused)
5. Check code style (naming, no unused code, no secrets)
6. Report findings: pass / fail / warning with file:line references

Follow the checklist in `.claude/agents/reviewer.md`.
