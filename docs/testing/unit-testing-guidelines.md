# Unit Testing Guidelines

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

### What to Use Instead

| Instead of                  | Use                                                         |
| --------------------------- | ----------------------------------------------------------- |
| Snapshot of rendered output | RTL queries (`getByRole`, `getByText`)                      |
| Snapshot of component tree  | Behavioral assertions (`userEvent.click`, form submissions) |
| Visual regression snapshots | Chromatic (already in CI)                                   |

### Example: Testing a Button

```tsx
// Bad — snapshot test
it("renders correctly", () => {
  const { container } = render(<Button>Click me</Button>);
  expect(container).toMatchSnapshot();
});

// Good — behavioral test
it("calls onClick when clicked", async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  await userEvent.click(screen.getByRole("button", { name: /click me/i }));

  expect(handleClick).toHaveBeenCalledOnce();
});

// Good — accessibility test
it("is accessible", () => {
  render(<Button disabled>Submit</Button>);

  expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
});
```

## Query Priority

Follow RTL's [query priority](https://testing-library.com/docs/queries/about#priority):

1. `getByRole` — accessible to everyone (screen readers, mouse, keyboard)
2. `getByLabelText` — form fields
3. `getByPlaceholderText` — when label isn't available
4. `getByText` — non-interactive elements
5. `getByTestId` — last resort

## What to Test

| Test                                    | Don't Test             |
| --------------------------------------- | ---------------------- |
| User-visible behavior                   | Implementation details |
| Interactions (click, type, submit)      | Internal state         |
| Accessibility (roles, labels, disabled) | CSS classes            |
| Error states                            | Prop drilling          |
| Loading states                          | Component lifecycle    |

## References

- [Testing Library - Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [Kent C. Dodds - Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- [Chromatic - Visual Testing Handbook](https://storybook.js.org/tutorials/visual-testing-handbook/)
