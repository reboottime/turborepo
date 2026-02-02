Add tests for the specified component or feature.

Target: $ARGUMENTS

Steps:
1. Read the source code for the target
2. Identify untested behavior and edge cases
3. Write tests:
   - Component in `packages/ui/` → Jest + RTL test (`<name>.test.tsx` colocated)
   - App page/flow → Playwright E2E test in `apps/<app>/e2e/`
4. Run the tests to verify they pass
5. Report coverage for the target

Follow the conventions in `.claude/agents/test-writer.md`.
