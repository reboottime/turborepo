# Frontend Engineering Conventions

## Naming Convention

- **Files**: kebab-case (`user-profile.ts`, `job-card.tsx`)
- **Components**: PascalCase (`UserProfile`, `JobCard`)
- **Functions/Variables**: camelCase (`calculateScore`, `userProfile`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RESULTS`, `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserProfileData`, `JobMatchResult`)

## Component Folder Structure

Each component lives in its own folder under `packages/ui/src/components/`:

```
button/
  index.tsx              # Component implementation
  button.test.tsx        # Jest + RTL tests
  button.stories.tsx     # Storybook stories
```

## Component Implementation Pattern

Add `"use client"` only when a component uses client-side features (state, effects, event handlers, refs with imperative handles, browser APIs). Purely presentational components should remain server-compatible.

```tsx
"use client"; // Only if component needs client-side features

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-border bg-background hover:bg-muted hover:text-foreground",
        ghost: "hover:bg-muted hover:text-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

## Component Conventions

- Use Radix UI primitives as base for interactive elements (Dialog, DropdownMenu, etc.)
- Style with Tailwind utility classes only — no custom CSS
- Use `cva` (class-variance-authority) for component variants
- Use `cn` helper (`clsx` + `tailwind-merge`) for class merging
- Import internal modules via Node.js subpath imports (`#lib/cn`, not relative paths)
- Props extend Radix primitive props or native HTML element props
- Always use `forwardRef` for components
- Export everything from `packages/ui/src/index.ts`

## `cn` Utility

Located at `packages/ui/src/lib/cn.ts`. Combines `clsx` (conditional class names) with `tailwind-merge` (resolves Tailwind conflicts so the last class wins):

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Storybook Story Pattern

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
export const Outline: Story = { args: { children: "Outline", variant: "outline" } };
export const Ghost: Story = { args: { children: "Ghost", variant: "ghost" } };
```

## Component Unit Test Pattern

Colocated with source: `packages/ui/src/components/<name>/<name>.test.tsx`

### RTL Query Priority

1. `getByRole` — best, accessible
2. `getByLabelText` — forms
3. `getByText` — visible text
4. `getByTestId` — last resort

### What to Test Per Component

- Renders with default props
- Renders each variant/size correctly
- Merges custom `className` without breaking defaults
- Forwards `ref` to the underlying DOM element
- Passes through native HTML attributes
- Handles user interaction (click, keyboard) — if interactive
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

### ESM Note

This project uses ESM (`"type": "module"`). Import `jest` from `@jest/globals` for `jest.fn()`, `jest.spyOn()`, etc. — the global `jest` object is not available in ESM mode.

## Component Checklist

For each component:
- [ ] Radix UI primitive as base (where applicable)
- [ ] Tailwind styling with variants via cva
- [ ] TypeScript props with forwardRef
- [ ] Storybook story showing all variants
- [ ] Jest + RTL test (render, interaction, accessibility)
- [ ] Exported from `packages/ui/src/index.ts`
