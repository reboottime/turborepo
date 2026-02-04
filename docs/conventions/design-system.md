---
description: Conventions for building shared UI components in packages/ui/
tags: [design-system, components, ui, conventions, radix, cva, storybook]
applies_to: design-system-architect agent, staff-frontend-engineer agent
status: Active
last_updated: 2026-02-03
---

# Design System Conventions

## Component Folder Structure

Each component: `packages/ui/src/components/<name>/`

```
button/
  index.tsx              # Component implementation
  button.test.tsx        # Jest + RTL tests
  button.stories.tsx     # Storybook stories
```

## Component Conventions

- Radix UI primitives as base for interactive elements
- Tailwind utility classes only — no custom CSS
- `cva` (class-variance-authority) for variants
- `cn` helper (`clsx` + `tailwind-merge`) for class merging
- Import via Node.js subpath imports (`#lib/cn`, not relative paths)
- Props extend Radix primitive props or native HTML element props
- Always use `forwardRef`
- Export from `packages/ui/src/index.ts`
- `"use client"` only when component uses client-side features (state, effects, event handlers, refs with imperative handles, browser APIs)
- Prefer compound components (`Card` + `CardHeader` + `CardContent`) over prop-heavy monoliths
- Consistent prop names — if `Button` uses `variant` and `size`, all components use the same names/scale
- **Token-first**: Use theme tokens from `packages/ui/src/styles.css` (`--color-*`, `--radius-*`). Never hardcode colors or radii

## Component Template

```tsx
"use client"; // Only if needed

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-border bg-background hover:bg-muted hover:text-foreground",
        ghost: "hover:bg-muted hover:text-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

## Storybook Template

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["default", "outline", "ghost"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { children: "Button" } };
export const Outline: Story = {
  args: { children: "Outline", variant: "outline" },
};
export const Ghost: Story = { args: { children: "Ghost", variant: "ghost" } };
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
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";
import { Button } from "./index";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Label</Button>);
    expect(screen.getByRole("button", { name: "Label" })).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Button variant="outline">Test</Button>);
    expect(screen.getByRole("button").className).toContain("border");
  });

  it("handles click", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
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
