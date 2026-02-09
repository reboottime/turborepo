# Login Page — Wireframe

## Layout

Full-page centered card on a neutral background.

```
+------------------------------------------------------------------+
|                                                                   |
|                                                                   |
|                                                                   |
|                  +----------------------------+                   |
|                  |                            |                   |
|                  |        [App Logo]          |                   |
|                  |                            |                   |
|                  |   Username                 |                   |
|                  |   +----------------------+ |                   |
|                  |   |                      | |                   |
|                  |   +----------------------+ |                   |
|                  |                            |                   |
|                  |   Password                 |                   |
|                  |   +----------------------+ |                   |
|                  |   |          [eye icon]  | |                   |
|                  |   +----------------------+ |                   |
|                  |                            |                   |
|                  |   +----------------------+ |                   |
|                  |   |      Sign In         | |                   |
|                  |   +----------------------+ |                   |
|                  |                            |                   |
|                  +----------------------------+                   |
|                                                                   |
|                                                                   |
+------------------------------------------------------------------+
```

## Elements

| Element        | Placement                 | Notes                  |
| -------------- | ------------------------- | ---------------------- |
| Card           | Centered H + V            | 400px max-width        |
| App Logo       | Top of card, centered     | 48px height            |
| Username input | Below logo                | Full card width        |
| Password input | Below username            | Eye icon right-aligned |
| Sign In button | Below password            | Full card width        |
| Error banner   | Above username (if shown) | Full card width        |

## Responsive

| Breakpoint | Card behavior                |
| ---------- | ---------------------------- |
| > 480px    | Centered, 400px wide         |
| < 480px    | Full-width, 16px side margin |
