# @repo/ui

Shared design system for the Turborepo monorepo. Built with React 19, Tailwind CSS v4, and CVA (class-variance-authority).

## Usage

Import styles once in your app's `globals.css`:

```css
@import "@repo/ui/styles.css";
```

Then import components in your TSX files:

```tsx
import { Button, cn } from "@repo/ui";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui";
```

## Components

| Component | Variants | Description |
|-----------|----------|-------------|
| `Button` | `default`, `outline`, `ghost` / `sm`, `default`, `lg` | Standard button with variant and size support |
| `Card` | - | Container with border and background |
| `CardHeader` | - | Card header section |
| `CardTitle` | - | Card heading (`h3`) |
| `CardDescription` | - | Card subtext |
| `CardContent` | - | Card body with top padding |

## Utilities

| Export | Description |
|--------|-------------|
| `cn(...classes)` | Merges Tailwind classes safely using `clsx` + `tailwind-merge` |
| `buttonVariants` | CVA variant function for Button (useful for link styling) |

## Package Design

### Tree-shaking

Barrel file imports (`import { Button } from "@repo/ui"`) are tree-shaken — unused components are eliminated from the final bundle. Three things make this work:

- `"type": "module"` — ES module static imports are analyzable
- `"sideEffects": ["**/*.css"]` — tells bundlers non-CSS files are safe to drop
- Turbopack/webpack 5 — performs the actual dead code elimination

Per-component entrypoints (`@repo/ui/button`) are not needed at this scale.

### `package.json` fields

```jsonc
{
  "sideEffects": ["**/*.css"],       // Only CSS has side effects; rest is tree-shakeable
  "imports": { "#lib/*": "./src/lib/*.ts" },  // Internal path aliases (Node.js subpath imports)
  "exports": {
    ".": "./src/index.ts",           // import { Button } from "@repo/ui"
    "./styles.css": "./src/styles.css" // @import "@repo/ui/styles.css"
  }
}
```

- **`exports`** — public API. Only these entry points are accessible from outside.
- **`imports`** — internal `#lib/*` aliases so components avoid relative path hell. Uses Node.js subpath imports (not TypeScript `paths`) because Turbopack resolves via Node.js rules, not tsconfig.
- **`sideEffects`** — CSS files are kept always; everything else is safe to drop if unused.

See [faq.md](./faq.md) for FAQ on tree-shaking, package.json fields, and Storybook setup.

## Scripts

```bash
pnpm check-types    # TypeScript type checking
pnpm lint           # ESLint
pnpm storybook      # Storybook dev server (port 6006)
pnpm build-storybook # Build static Storybook
```

## Storybook

Component development and documentation environment. Runs on Vite with the `@tailwindcss/vite` plugin so Tailwind v4 styles render correctly.

```bash
pnpm storybook        # Dev server at http://localhost:6006
pnpm build-storybook  # Static build
```

### Writing stories

Story files are co-located with components:

```
src/components/button/
  index.tsx              # Component
  button.stories.tsx     # Stories
  button.test.tsx        # Tests
```

Stories use CSF3 format with `@storybook/react` types:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

### Configuration

| File | Purpose |
|------|---------|
| `.storybook/main.ts` | Framework, story globs, Vite config (`@tailwindcss/vite` plugin) |
| `.storybook/preview.ts` | Global styles (`styles.css`), control matchers |

## Adding a component

Use the `/add-component` command in Claude Code.
