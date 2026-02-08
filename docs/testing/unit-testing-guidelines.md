# Unit Testing Guidelines

Unit tests verify that individual components and functions behave correctly in isolation. They are the fastest, cheapest, and most numerous tests in the stack.

> **Definition:** Tests one unit (function, component, module) in isolation. Mock all external dependencies (APIs, services, sibling modules, 3rd party libs with side effects). Only pure utility functions are called directly.

## File Conventions

```sh
packages/ui/src/components/button/
├── button.tsx
├── button.test.tsx     ← co-located, same directory
└── index.ts

packages/libs/src/math/
├── math.ts
├── math.test.ts        ← co-located
└── index.ts
```

- Test file lives next to the source file: `foo.test.tsx`
- One `describe` block per exported unit
- Test descriptions start with a verb: `"renders children"`, `"calls onClick when clicked"`, `"throws on division by zero"`

## What to Test vs What Not to Test

| Test                                           | Don't Test                          |
| ---------------------------------------------- | ----------------------------------- |
| User-visible behavior                          | Implementation details              |
| Interactions (click, type, submit)             | Internal state                      |
| Accessibility (roles, labels, aria attributes) | Component lifecycle                 |
| Error states and validation messages           | Prop drilling                       |
| Loading states                                 | Third-party library internals       |
| Edge cases and boundaries                      | CSS classes (with exceptions below) |
| Ref forwarding on public components            | Exact DOM structure                 |

### Design system exception: variant class assertions

For design system components (`packages/ui`), asserting CSS class names is acceptable to verify variant-to-style mapping — this IS the component's contract:

```tsx
// Acceptable in design system — variant mapping is the contract
it("applies destructive variant classes", () => {
  render(<Button variant="destructive">Delete</Button>);
  expect(screen.getByRole("button").className).toContain("bg-destructive");
});
```

For app-level components (`apps/`), never assert on CSS classes. Use visual tests instead.

## Query Priority

Follow RTL's [query priority](https://testing-library.com/docs/queries/about#priority):

1. `getByRole` — accessible to everyone (screen readers, mouse, keyboard)
2. `getByLabelText` — form fields
3. `getByPlaceholderText` — when label isn't available
4. `getByText` — non-interactive elements
5. `getByTestId` — last resort

## User Interactions: `userEvent` over `fireEvent`

Always use `userEvent.setup()` — it simulates real browser behavior (focus, pointer events, keyboard) instead of firing synthetic events.

```tsx
// Bad — synthetic event, doesn't reflect real user behavior
fireEvent.click(button);

// Good — simulates full browser interaction chain
const user = userEvent.setup();
await user.click(button);
```

`userEvent.setup()` is called once per test, before `render`:

```tsx
it("calls onClick when clicked", async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);

  await user.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Async Patterns

Use `waitFor` when asserting on state that updates asynchronously (form validation, API-triggered re-renders):

```tsx
it("shows error message on validation failure", async () => {
  const user = userEvent.setup();
  render(<TestForm required />);

  await user.click(screen.getByRole("button", { name: "Submit" }));

  await waitFor(() => {
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });
});
```

Use `findBy*` queries (which internally use `waitFor`) when waiting for an element to appear:

```tsx
const errorMessage = await screen.findByText("Email is required");
expect(errorMessage).toBeInTheDocument();
```

Avoid bare `act()` calls — if you need `act()`, something is wrong. `userEvent` and `waitFor` handle it internally.

## Mocking Strategy

| Mock                                                    | Don't Mock               |
| ------------------------------------------------------- | ------------------------ |
| API calls (fetch, axios)                                | Pure utility functions   |
| Browser APIs (localStorage, IntersectionObserver)       | The component under test |
| Third-party libs with side effects (analytics, logging) | React itself             |
| Timers (`jest.useFakeTimers()`)                         | Testing Library          |
| Router/navigation                                       | Simple child components  |

```tsx
// Mock an API module
jest.mock("@/services/api", () => ({
  fetchUsers: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/dashboard",
}));
```

## Test Helpers for Complex Components

When a component requires providers or setup (forms, context, router), create a focused test helper in the same test file:

```tsx
function TestForm({
  onSubmit = () => {},
  defaultValues = { email: "" },
  required = false,
}: {
  onSubmit?: (data: { email: string }) => void;
  defaultValues?: { email: string };
  required?: boolean;
}) {
  const form = useForm({ defaultValues });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          rules={required ? { required: "Email is required" } : undefined}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}
```

Keep helpers minimal — only the props you need to control in tests.

## Test Structure

### `describe` and `it` — BDD naming

These names come from BDD (Behavior-Driven Development). Tests read as English sentences:

- **`describe("Button", ...)`** — names the subject
- **`it("renders children", ...)`** — describes one behavior

Read together: **"Button — it renders children"**. That's why test descriptions start with a verb (`"renders children"`) not `"should render children"` — the `it` already implies the expectation.

`describe` blocks can nest for sub-categories:

```tsx
describe("Button", () => {
  describe("when disabled", () => {
    // "Button when disabled..."
    it("does not call onClick", () => {}); // "...it does not call onClick"
  });
});
```

`test()` is an alias for `it()` in Jest — same function, different readability style. We use `it()` for consistency.

### Organizing by concern

```tsx
describe("Button", () => {
  // -- Rendering --
  it("renders children", () => { ... });

  // -- Variants -- (design system only)
  it("applies outline variant classes", () => { ... });

  // -- Disabled state --
  it("renders disabled state", () => { ... });

  // -- Click handling --
  it("calls onClick when clicked", async () => { ... });

  // -- Ref forwarding --
  it("forwards ref to the button element", () => { ... });

  // -- HTML attributes --
  it("passes through HTML attributes", () => { ... });
});
```

Each test is self-contained — no shared mutable state between tests. If you need setup, prefer a helper function over `beforeEach` with shared variables.

## Snapshot Tests

**Don't use snapshot tests for UI components.** Use them only for specific cases.

### When Snapshots Are Useful

- **Serialized data structures** — API responses, config objects, generated schemas
- **Regression detection** — stable, rarely-changed outputs
- **Error messages** — ensuring user-facing error text doesn't change

### Why Not for UI Components

1. **Test implementation, not behavior** — a passing snapshot doesn't mean the component works
2. **Noise** — break on every minor change (className, wrapper div, formatting)
3. **Blind updates** — developers update snapshots without reviewing diffs
4. **Unreadable diffs** — large snapshot files obscure real changes in PRs
5. **False confidence** — green tests with broken interactions

| Instead of                  | Use                                                         |
| --------------------------- | ----------------------------------------------------------- |
| Snapshot of rendered output | RTL queries (`getByRole`, `getByText`)                      |
| Snapshot of component tree  | Behavioral assertions (`userEvent.click`, form submissions) |
| Visual regression snapshots | Chromatic (already in CI)                                   |

## Test Determinism

A flaky test is worse than no test — it erodes trust in the entire suite. Common causes and fixes:

| Cause                         | Fix                                                             |
| ----------------------------- | --------------------------------------------------------------- |
| Timers / `setTimeout`         | `jest.useFakeTimers()` + `jest.advanceTimersByTime()`           |
| Random IDs / timestamps       | Mock `Date.now()` or `crypto.randomUUID()`                      |
| Shared state between tests    | Each test renders its own component, no shared `let` variables  |
| Animation / transition timing | Disable animations in test setup or use `waitFor`               |
| Test order dependency         | Tests must pass in any order — never depend on prior test state |

## Coverage Targets

- **Shared packages (`ui`, `libs`):** 80%+ line coverage
- **App components (`apps/`):** Test user-facing behavior, not aiming for a coverage number
- **Pure utility functions:** 100% — they're cheap to test and have clear contracts

Coverage is a floor, not a goal. High coverage with bad tests is worse than moderate coverage with meaningful behavioral tests.

## References

- [Testing Library - Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [Testing Library - Query Priority](https://testing-library.com/docs/queries/about#priority)
- [Kent C. Dodds - Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- [Kent C. Dodds - Common Mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Chromatic - Visual Testing Handbook](https://storybook.js.org/tutorials/visual-testing-handbook/)
