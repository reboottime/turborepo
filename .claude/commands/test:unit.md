Add unit tests for a component or library.

Target: $ARGUMENTS

Reference: [docs/testing/unit-testing-guidelines.md](docs/testing/unit-testing-guidelines.md)

## Steps

1. **Read source** — Read the file at the target path
2. **Read guidelines** — Read `docs/testing/unit-testing-guidelines.md`
3. **Determine context** from path:
   - `packages/` → **Shared package**. Test API contract: variants, ref forwarding, className merging, edge cases. Cover all branches in public API.
   - `apps/` → **App feature**. Test user-visible behavior only. Focus on critical paths.
4. **Write tests** — Colocated as `<name>.test.tsx` or `<name>.test.ts`
5. **Run tests** — `pnpm --filter=<name> test -- --testPathPatterns=<filename>`
6. **Report results**

## Test Structure

Organize tests with section comments. Each test follows Arrange-Act-Assert:

```tsx
describe("ComponentName", () => {
  // -- Rendering --
  it("renders with default props", () => {
    // Arrange
    render(<Button>Click me</Button>);
    // Act (implicit for render tests)
    // Assert
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  // -- Interactions --
  it("calls onClick when clicked", async () => {
    // Arrange
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click</Button>);
    // Act
    await user.click(screen.getByRole("button"));
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // -- Loading state --
  // -- Error handling --
});
```

## Constraints

- Import `jest` from `@jest/globals` (ESM mode)
- Use `@testing-library/react` + `userEvent.setup()` for React components
- Query priority: `getByRole` > `getByLabelText` > `getByText` > `getByTestId`
- `waitFor` for async state, `findBy*` for elements appearing async
- Test descriptions start with a verb: `"renders"`, `"calls onClick"`
- No snapshot tests for UI components
- Follow Arrange-Act-Assert pattern within each test

## What NOT to Test

- Implementation details (internal state, private methods)
- Third-party library behavior
- CSS classes or styling details (use visual regression for that)
- Trivial code with no logic (simple pass-through props)

## Mocking

- Mock at boundaries: network, timers, external services
- Prefer real implementations for internal dependencies
- If heavy mocking is needed, the code may need refactoring
