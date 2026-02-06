# packages/ui — Design System Reference

Read this before using or adding components.

## Components

| Component     | Exports                                                                                                                                                                                                                                     | Path                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **Button**    | `Button`, `buttonVariants`, `ButtonProps`                                                                                                                                                                                                   | `components/button/`    |
| **Card**      | `Card`, `cardVariants`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardProps`                                                                                                                                            | `components/card/`      |
| **Dialog**    | `Dialog`, `DialogTrigger`, `DialogClose`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`                                                                              | `components/dialog/`    |
| **Drawer**    | `Drawer`, `DrawerTrigger`, `DrawerClose`, `DrawerPortal`, `DrawerOverlay`, `DrawerContent`, `drawerContentVariants`, `DrawerHandle`, `DrawerHeader`, `DrawerBody`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, `DrawerContentProps` | `components/drawer/`    |
| **Form**      | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`                                                                                                                               | `components/form/`      |
| **Input**     | `Input`                                                                                                                                                                                                                                     | `components/input/`     |
| **Label**     | `Label`                                                                                                                                                                                                                                     | `components/label/`     |
| **Select**    | `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `selectTriggerVariants`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`, `SelectTriggerProps`                   | `components/select/`    |
| **Separator** | `Separator`                                                                                                                                                                                                                                 | `components/separator/` |

## Utilities

| Export                    | Path     |
| ------------------------- | -------- |
| `cn` (class merge helper) | `lib/cn` |

## Usage

```tsx
import { Button, Card, CardContent, Input, cn } from "@repo/ui";
```

## Adding Components

Use the `/add-component` skill. Each component lives in `src/components/<name>/` with:

- `index.tsx` — component implementation
- `<name>.stories.tsx` — Storybook stories
- `<name>.test.tsx` — tests

After adding, export from `src/index.ts` and update this file.

## TODO

- [ ] **Visual regression testing** — Unit tests catch behavior but not layout regressions (e.g., icon positioning, spacing changes). Set up Loki for local Storybook visual testing. See: https://loki.js.org/
