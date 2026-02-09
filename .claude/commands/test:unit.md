Add unit tests for a component or library.

Target: $ARGUMENTS

## Steps

1. Read the source code at the target path
2. Read conventions: `docs/conventions/design-system.md` — Testing section
3. Identify what to test:
   - **Component** (`packages/ui/`): renders with default props, each variant/size, `className` merging, `ref` forwarding, HTML attribute passthrough, interaction (click, keyboard), disabled state
   - **Library** (`packages/libs/`): happy paths, edge cases, error handling, type correctness
4. Write test file colocated with the source:
   - Component → `<name>.test.tsx` in the component folder
   - Library → `<name>.test.ts` in the lib folder
5. Run tests:
   - Component: `pnpm test --filter=ui -- --testPathPattern=<name>`
   - Library: `pnpm test --filter=@repo/libs -- --testPathPattern=<name>`
6. Report results

## Constraints

- Scope: `packages/ui/src/components/` and `packages/libs/src/` only
- Import `jest` from `@jest/globals` (ESM mode — no global `jest`)
- Use `@testing-library/react` + `userEvent` for components
- Role-based queries preferred (`getByRole` > `getByText`)
- 80%+ coverage target
