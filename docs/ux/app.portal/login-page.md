# Login Page - Wireframe

## Overview

A clean, centered login form for the apps/portal. Minimal distractions, single purpose: authenticate the user.

---

## Layout

```
+------------------------------------------------------------------+
|                                                                  |
|                         HEADER / LOGO                            |
|                                                                  |
+------------------------------------------------------------------+
|                                                                  |
|                                                                  |
|                                                                  |
|                  +----------------------------+                  |
|                  |                            |                  |
|                  |        [App Logo]          |                  |
|                  |                            |                  |
|                  |   Username                 |                  |
|                  |   +----------------------+ |                  |
|                  |   |                      | |                  |
|                  |   +----------------------+ |                  |
|                  |                            |                  |
|                  |   Password                 |                  |
|                  |   +----------------------+ |                  |
|                  |   |          [eye icon]  | |                  |
|                  |   +----------------------+ |                  |
|                  |                            |                  |
|                  |   +----------------------+ |                  |
|                  |   |      Sign In         | |                  |
|                  |   +----------------------+ |                  |
|                  |                            |                  |
|                  +----------------------------+                  |
|                                                                  |
|                                                                  |
+------------------------------------------------------------------+
```

---

## Component Specification

### Card Container
- Centered both vertically and horizontally
- Width: 400px (max), responsive down to full-width on mobile
- Subtle shadow, rounded corners (8px)
- Background: white
- Padding: 32px

### App Logo
- Centered at top of card
- Size: 48px height
- Margin-bottom: 24px

### Username Field
- Label: "Username" (above field)
- Input type: `text`
- Placeholder: "Enter your username"
- Full width within card
- Height: 40px
- Border: 1px solid #D1D5DB, radius 6px
- Focus state: blue border (#3B82F6)

### Password Field
- Label: "Password" (above field)
- Input type: `password`
- Placeholder: "Enter your password"
- Toggle visibility icon (eye) on right side
- Full width within card
- Height: 40px
- Same border styling as username

### Sign In Button
- Full width within card
- Height: 44px
- Background: primary blue (#3B82F6)
- Text: "Sign In", white, bold, 16px
- Border-radius: 6px
- Hover: darken background
- Disabled state: grey background when fields are empty
- Loading state: spinner replaces text during submission

---

## States & Behavior

### Validation
- Both fields required
- Show inline error below field on validation failure
- Error text: red (#EF4444), 14px

### Error States

```
|   Username                 |
|   +----------------------+ |
|   |                      | |
|   +----------------------+ |
|   ! Username is required   |
```

### Server Error (e.g., wrong credentials)

```
|   +---------------------------+   |
|   | ! Invalid username or     |   |
|   |   password. Try again.    |   |
|   +---------------------------+   |
```

- Error banner: red background (#FEF2F2), red border, red text
- Appears above the username field

### Loading

```
|   +----------------------+ |
|   |     [spinner]        | |
|   +----------------------+ |
```

- Button shows a spinner, inputs become read-only

---

## Responsive Behavior

| Breakpoint     | Behavior                          |
|----------------|-----------------------------------|
| Desktop (>768) | Card centered, 400px wide         |
| Tablet (768)   | Card centered, 400px wide         |
| Mobile (<480)  | Card full-width, 16px side margin |

---

## Accessibility Notes

- Tab order: Username -> Password -> Sign In
- Enter key submits form
- Error messages linked via `aria-describedby`
- Password visibility toggle has `aria-label`
