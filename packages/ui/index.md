# packages/ui — Design System Reference

Read this before using or adding components.

## Components

| Component  | Exports                                                                                                                                                        | Path                 |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **Button** | `Button`, `buttonVariants`, `ButtonProps`                                                                                                                      | `components/button/` |
| **Card**   | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`                                                                                            | `components/card/`   |
| **Dialog** | `Dialog`, `DialogTrigger`, `DialogClose`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription` | `components/dialog/` |
| **Form**   | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`                                                  | `components/form/`   |
| **Input**  | `Input`                                                                                                                                                        | `components/input/`  |
| **Label**  | `Label`                                                                                                                                                        | `components/label/`  |

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
