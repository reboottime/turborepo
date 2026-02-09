# Login Page — Spec

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

## Card Container

- Centered vertically and horizontally
- Width: 400px max, full-width on mobile with 16px side margin
- Shadow, rounded corners (8px), white background, 32px padding

## App Logo

- Centered at top of card, 48px height, 24px margin-bottom

## Username Field

- Label: "Username"
- Type: `text`
- Placeholder: "Enter your username"
- Full width, 40px height
- Border: 1px solid #D1D5DB, radius 6px
- Focus: blue border (#3B82F6)

## Password Field

- Label: "Password"
- Type: `password`
- Placeholder: "Enter your password"
- Toggle visibility icon (eye) on right side, with `aria-label`
- Same dimensions and styling as username

## Sign In Button

- Full width, 44px height
- Background: #3B82F6, white bold 16px text
- Radius: 6px
- Hover: darken background
- Disabled: grey background when fields are empty
- Loading: spinner replaces text, inputs become read-only

## Validation

- Both fields required
- Inline error below field on empty submit: red (#EF4444), 14px
- Messages: "Username is required" / "Password is required"
- Errors linked via `aria-describedby`

## Server Error

- Error banner above username field
- Background: #FEF2F2, red border, red text
- Message: "Invalid username or password. Try again." (wrong credentials)
- Message: "An error occurred. Please try again." (server unreachable)

## Success

- Redirect to Employee Management page

## Responsive

| Breakpoint | Behavior                          |
| ---------- | --------------------------------- |
| > 480px    | Card centered, 400px wide         |
| < 480px    | Card full-width, 16px side margin |

## Accessibility

- Tab order: Username → Password → Sign In
- Enter key submits form
- Password toggle has `aria-label`
- Error messages linked via `aria-describedby`
