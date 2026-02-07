# Tech Stack

| Layer                | Tool                               | Note                                                                                                                                                                            |
| -------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Monorepo             | Turborepo + pnpm workspaces        |                                                                                                                                                                                 |
| Framework            | React 19.2                         |                                                                                                                                                                                 |
| Language             | TypeScript 5.9                     |                                                                                                                                                                                 |
| Apps                 | Next.js 15.5.11 (App Router)       | Pinned stable; 16.x is canary only                                                                                                                                              |
| Bundler              | Vite 7.3                           | Used by Storybook and ui package                                                                                                                                                |
| UI Primitives        | Radix UI                           |                                                                                                                                                                                 |
| Styling              | Tailwind CSS 4.1.18                | v4: CSS-first config (`@theme`), no `tailwind.config.js`. LLM training data defaults to v3 patterns — always reference v4 docs before generating Tailwind config or setup code. |
| Variants             | class-variance-authority (cva)     |                                                                                                                                                                                 |
| Component Dev        | Storybook 10.2                     |                                                                                                                                                                                 |
| Unit/Component Tests | Jest 30 + React Testing Library 16 | Jest 30 is ESM-native; uses `ts-jest` for TypeScript. LLM training data defaults to Jest 29 patterns — verify config options against v30 docs.                                  |
| E2E Tests            | Playwright                         |                                                                                                                                                                                 |
| CI/CD                | GitHub Actions                     |                                                                                                                                                                                 |
| Deployment           | Vercel (staging + production)      |                                                                                                                                                                                 |
| Package Manager      | pnpm                               |                                                                                                                                                                                 |

## Architecture Decisions

- pnpm workspaces — Turborepo default, fast, strict dependency resolution
- `@repo/` scope for internal packages (e.g., `@repo/ui`, `@repo/libs`)
- Tailwind config shared from `ui` package, consumed by apps
- Radix UI for accessible unstyled primitives — styled with Tailwind
- Each package has its own `tsconfig.json` extending root base
- Internal packages use `"main"` and `"types"` exports — not published to npm
- `cn` utility (clsx + tailwind-merge) for class merging

## Browser Support

Tailwind CSS v4.0 requires modern browsers with support for `@property` and `color-mix()`:

| Browser | Minimum Version |
| ------- | --------------- |
| Chrome  | 111+            |
| Firefox | 128+            |
| Safari  | 16.4+           |

Internet Explorer is not supported.

If older browser support is required, downgrade to Tailwind v3.4.

## References

Consult these before generating code. LLM training data may be outdated — always verify against official docs.

| Tool                  | Docs                                                         | Key Pages                                                                                                                                                                             |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Turborepo             | https://turbo.build/repo/docs                                | [Monorepo handbook](https://turbo.build/repo/docs/crafting-your-repository)                                                                                                           |
| Next.js 15            | https://nextjs.org/docs                                      | [App Router](https://nextjs.org/docs/app), [Upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading)                                                           |
| Radix UI              | https://www.radix-ui.com/primitives/docs                     | [Components](https://www.radix-ui.com/primitives/docs/components)                                                                                                                     |
| Tailwind CSS 4        | https://tailwindcss.com/docs                                 | [v4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide), [CSS-first config](https://tailwindcss.com/docs/theme), [Vite plugin](https://tailwindcss.com/docs/installation/vite) |
| cva                   | https://cva.style/docs                                       | [Getting started](https://cva.style/docs/getting-started)                                                                                                                             |
| Storybook             | https://storybook.js.org/docs                                | [Writing stories](https://storybook.js.org/docs/writing-stories)                                                                                                                      |
| Jest                  | https://jestjs.io/docs/getting-started                       | [Configuration](https://jestjs.io/docs/configuration)                                                                                                                                 |
| React Testing Library | https://testing-library.com/docs/react-testing-library/intro | [Queries](https://testing-library.com/docs/queries/about)                                                                                                                             |
| Playwright            | https://playwright.dev/docs/intro                            | [Test generator](https://playwright.dev/docs/codegen), [Best practices](https://playwright.dev/docs/best-practices)                                                                   |
| GitHub Actions        | https://docs.github.com/en/actions                           | [Workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)                                                                              |
| pnpm                  | https://pnpm.io                                              | [Workspaces](https://pnpm.io/workspaces)                                                                                                                                              |
