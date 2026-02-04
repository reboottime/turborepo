Create Playwright E2E tests from a UX wireframe using Playwright's test agent pipeline.

Wireframe: $ARGUMENTS

Steps:
1. Read the wireframe file to understand all user flows, states, and validations
2. Run the **Planner** agent with the wireframe as PRD context — output a spec to `specs/`
3. Review the generated spec — ensure all flows from the wireframe are covered
4. Run the **Generator** agent on the spec — output test files to `tests/`
5. Run `pnpm test:e2e` to execute the generated tests
6. If tests fail, run the **Healer** agent to auto-repair
7. Report which flows are covered and any gaps

Follow the conventions in `.claude/agents/e2e-test-engineer.md`.
