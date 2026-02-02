# File Structures

## Repo Structure

```
apps/
  web/                    # Next.js main app (port 3000)
  portal/                 # Next.js portal/admin app (port 3001)
packages/
  ui/                     # Shared component library (Tailwind + Radix UI + Storybook)
  libs/                   # Shared non-UI utilities and logic
  config.eslint/          # Shared ESLint configs (base, next-js, react-internal)
  config.typescript/      # Shared TypeScript configs (base, nextjs, react-library)
```

## UI Package Structure

```
packages/ui/
  src/
    lib/                  # Utilities (cn)
    components/
      button/             # Button component (forwardRef + cva variants)
      card/               # Card compound component
      dialog/             # Placeholder for Radix UI Dialog
  .storybook/             # Storybook config
```

## Component Folder Convention

Each component in `packages/ui/src/components/` gets its own folder:

```
button/
  index.tsx
  button.test.tsx
  button.stories.tsx
```

- Barrel exports from `packages/ui/src/index.ts`
- Tests colocated with source files
- Storybook stories colocated with components

## Key Files

| File | Purpose |
|------|---------|
| `turbo.json` | Turborepo task config (build, lint, check-types, test, dev, storybook) |
| `pnpm-workspace.yaml` | Workspace definitions (`apps/*`, `packages/*`) |
| `packages/ui/src/styles.css` | Shared Tailwind v4 theme tokens |
| `packages/ui/src/lib/cn.ts` | Class merge utility (clsx + tailwind-merge) |
| `.github/workflows/ci.yml` | CI/CD pipeline (not yet created) |
