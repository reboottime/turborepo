Add a new sub-library to the shared utils package (`packages/libs`).

Library name: $ARGUMENTS

Before building, read the `math` lib as the reference implementation:
- `packages/libs/src/math/math.ts` — implementation pattern
- `packages/libs/src/math/math.test.ts` — test pattern
- `packages/libs/src/math/index.ts` — barrel export pattern

Steps:
1. Ask what functions the lib should contain (unless already specified)
2. Create `packages/libs/src/<name>/` with:
   - `<name>.ts` — implementation (pure functions, typed, with error handling where appropriate)
   - `<name>.test.ts` — comprehensive tests (import from `./<name>`, cover happy paths + edge cases)
   - `index.ts` — barrel re-export from `./<name>`
3. Add re-export line to `packages/libs/src/index.ts`
4. Add `"./<name>": "./src/<name>/index.ts"` to `exports` in `packages/libs/package.json`
5. Run `pnpm --filter @repo/libs test` and `pnpm --filter @repo/libs check-types` to verify
