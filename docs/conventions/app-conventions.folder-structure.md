# App Folder Structure

Next.js App Router conventions for organizing route segments and co-located code.

## High-Level Overview

Next.js App Router uses file-system routing with special naming conventions:

- **Route groups `(name)`** — URL-invisible grouping for organization
- **Private folders `_name`** — Not routed, co-located utilities/components
- **Dynamic routes `[param]`** — Variable URL segments
- **API routes** — Under `api/` directory

## Standard Route Segment Structure

```
route-segment/
├── _components/     # Route-specific components
│   ├── index.ts     # Barrel export
│   └── *.tsx        # Components
├── page.tsx         # Route UI (server component)
└── layout.tsx       # Shared wrapper (optional)
```

## Special Files

| File          | Purpose                              |
| ------------- | ------------------------------------ |
| `page.tsx`    | Route component (required for route) |
| `layout.tsx`  | Shared wrapper, preserves state      |
| `error.tsx`   | Error boundary for route segment     |
| `loading.tsx` | Suspense fallback during load        |

## `_components/` Organization

Route-specific components live in `_components/` with supporting files:

| File             | Purpose                         |
| ---------------- | ------------------------------- |
| `types.ts`       | TypeScript interfaces           |
| `data.ts`        | Fetch functions, mock data      |
| `*-helpers.ts`   | Utility functions               |
| `*-skeleton.tsx` | Loading state components        |
| `index.ts`       | Barrel exports all public items |

## Server vs Client Components

- **Default**: Server components (no directive needed)
- **`'use client'`**: Only for stateful/interactive components
- **Pattern**: Server components fetch data, wrap client components in Suspense

## Complex Features Pattern

When a route needs hooks, workers, or extensive types:

```
route-segment/
├── _components/
├── _hooks/
├── _types/
├── _worker/
└── README.md       # Document interactions between pieces
```

## Root-Level Shared Folders

App-wide utilities at the app root:

| Folder         | Purpose                         |
| -------------- | ------------------------------- |
| `_components/` | App shell, providers, shared UI |
| `_config/`     | Navigation config, constants    |
| `_actions/`    | Server actions                  |
