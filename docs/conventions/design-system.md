---
description: Conventions for building shared UI components in packages/ui/
tags: [design-system, components, ui, conventions, radix, cva, storybook]
applies_to: design-system-architect agent, staff-frontend-engineer agent
status: Active
last_updated: 2026-02-09
---

# Design System Conventions

## Principles

- **Token-first**: Use theme tokens from `packages/ui/src/styles/`. Never hardcode colors, spacing, radii, or z-index values.
- **Consistent API surface**: Prop names follow established patterns. If `Button` uses `variant` and `size`, every component with similar concepts uses the same names and scale.
- **Semantic prop separation**: `variant` = what it is (identity, behavior), `size` = how big. Never conflate them. Don't use size to indicate identity (e.g., `size="icon"` is wrong — that's a variant).
- **Minimal API surface**: Don't add props when existing ones work. If `Button` has `variant="destructive"`, `IconButton` reuses it — no separate `color` prop.
- **Compose vs. separate**: Wrap a base component when the specialized version shares behavior with minor styling changes. Extract a separate component when it has unique constraints (required props, different defaults, shape changes) that would complicate the base component's API. Don't add complexity to a base component just to support a specialized use case.
- **Composition over configuration**: Prefer compound components (`Card` + `CardHeader` + `CardContent`) over prop-heavy monoliths.
- **Radix as foundation**: Interactive components build on Radix UI primitives for accessibility (focus management, ARIA, keyboard navigation).
- **Tailwind + cva for styling**: All styling via Tailwind utilities. All variants via `cva`. Class merging via `cn` (imported as `#lib/cn`).

## Component Folder Structure

Each component: `packages/ui/src/components/<name>/`

```
button/
  index.tsx              # Component implementation
  button.test.tsx        # Jest + RTL tests
  button.stories.tsx     # Storybook stories
```

## Component Conventions

Pattern: Radix primitive + `cva` variants + `cn` merging + `forwardRef` (see template below).

**Rules:**

- `"use client"` only when component uses client-side features (state, effects, event handlers, browser APIs)
- Import via subpath imports (`#lib/cn`, not relative paths)
- **Text size scales with size variant**: Move `text-[length:var(--font-size-*)]` from base classes into size variants. Each size variant should specify its own font size (sm: xs, default: sm, lg: base).

**Design tokens** (`packages/ui/src/styles/`) — never hardcode values:

| Token                              | Example                                          |
| ---------------------------------- | ------------------------------------------------ |
| `--color-*`                        | `bg-surface-base`, `text-primary`                |
| `--spacing-*`                      | `p-[var(--spacing-6)]`, `gap-[var(--spacing-2)]` |
| `--radius-*`                       | `rounded-[var(--radius-md)]`                     |
| `--z-*`                            | `z-dialog`, `z-dropdown`, `z-toast`              |
| `--font-size-*`, `--line-height-*` | Typography scales                                |

## Component Template

```tsx
"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-md)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)]",
  {
    variants: {
      variant: {
        default: "bg-primary text-text-inverse hover:bg-primary-hover",
        destructive:
          "bg-destructive text-text-inverse hover:bg-destructive-hover",
        outline:
          "border border-border-default bg-surface-base hover:bg-surface-sunken hover:text-text-primary",
        ghost:
          "border border-transparent hover:bg-surface-sunken hover:text-text-primary",
      },
      size: {
        default:
          "h-[var(--spacing-10)] px-[var(--spacing-4)] py-[var(--spacing-2)] text-[length:var(--font-size-sm)]",
        sm: "h-[var(--spacing-8)] rounded-[var(--radius-md)] px-[var(--spacing-3)] text-[length:var(--font-size-xs)]",
        lg: "h-[var(--spacing-12)] rounded-[var(--radius-md)] px-[var(--spacing-8)] text-[length:var(--font-size-base)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

## Storybook Template

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
```

## Testing

Colocated: `packages/ui/src/components/<name>/<name>.test.tsx` — 80%+ coverage.

**ESM**: Import `jest` from `@jest/globals` for `jest.fn()`, `jest.spyOn()` — global `jest` unavailable in ESM mode.

### What to Test Per Component

- Renders with default props
- Each variant/size renders correctly
- Custom `className` merges without breaking defaults
- `ref` forwards to underlying DOM element
- Native HTML attributes pass through
- User interaction (click, keyboard) — if interactive
- Disabled state prevents interaction — if applicable

### Test Template

```tsx
import { createRef } from "react";
import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./index";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  // -- Variants --

  it("applies default variant classes", () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole("button").className).toContain("bg-primary");
  });

  it("applies outline variant classes", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border");
    expect(button.className).toContain("bg-surface-base");
  });

  // -- Click handling --

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click
      </Button>,
    );
    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // -- className merging --

  it("merges custom className with variant classes", () => {
    render(<Button className="custom-class">Merge</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-class");
    expect(button.className).toContain("bg-primary");
  });

  // -- Ref forwarding --

  it("forwards ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // -- HTML attributes --

  it("passes through HTML attributes", () => {
    render(
      <Button type="submit" aria-label="submit form">
        Submit
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("aria-label", "submit form");
  });
});
```

## Component Checklist

- [ ] Radix UI primitive as base (where applicable)
- [ ] Tailwind styling with variants via cva
- [ ] TypeScript props with forwardRef
- [ ] Storybook story showing all variants
- [ ] Jest + RTL test (render, interaction, accessibility)
- [ ] Exported from `packages/ui/src/index.ts`

## Accessibility Checklist

Before completing any component, verify:

- [ ] **Focus indicator**: 2px minimum thickness, 3:1 contrast ratio (WCAG 2.4.13)
- [ ] **Focus visible on all states**: closed, open/expanded, hover, active
- [ ] **Keyboard navigation**: Tab, Enter, Space, Arrow keys work as expected
- [ ] **Interactive elements use Radix**: Radix handles ARIA attributes, focus management, `aria-activedescendant`
- [ ] **Form fields use shared utilities**: `form-field-base`, `form-field-focus`, `form-field-open`, `form-field-disabled`
- [ ] **No outline:none without replacement**: Never remove focus indicators without providing a visible alternative
