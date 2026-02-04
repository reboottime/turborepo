# @repo/libs

Shared non-UI utility functions consumed across apps in the monorepo. Each sub-library is organized by folder and independently importable.

## Usage

```ts
// Import everything
import { add, clamp } from "@repo/libs";

// Import a specific sub-library
import * as math from "@repo/libs/math";
```

## Sub-libraries

### math

Arithmetic and numeric utilities.

| Function   | Signature                                             | Description               |
| ---------- | ----------------------------------------------------- | ------------------------- |
| `add`      | `(a: number, b: number) => number`                    | Addition                  |
| `subtract` | `(a: number, b: number) => number`                    | Subtraction               |
| `multiply` | `(a: number, b: number) => number`                    | Multiplication            |
| `divide`   | `(a: number, b: number) => number`                    | Division (throws on zero) |
| `clamp`    | `(value: number, min: number, max: number) => number` | Constrain value to range  |

## Structure

```
src/
├── index.ts              # Top-level barrel export
└── <lib>/
    ├── index.ts           # Sub-library barrel export
    ├── <lib>.ts           # Implementation
    └── <lib>.test.ts      # Tests
```

Each sub-library is also exposed as a package export (`@repo/libs/<lib>`) for direct, tree-shakeable imports.

## Scripts

```bash
pnpm --filter @repo/libs test         # Run tests
pnpm --filter @repo/libs check-types  # Type-check
pnpm --filter @repo/libs lint         # Lint
```

## Adding a new sub-library

Use the Claude command `/add-lib <name>`.

## FAQ

See [FAQ.md](./FAQ.md) for common questions (tree-shaking, bundling, etc.).
