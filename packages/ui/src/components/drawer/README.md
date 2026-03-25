# Drawer Component

A slide-in panel component built on [Vaul](https://vaul.emilkowal.ski/) with touch gestures and
multi-directional support.

## Features

- Four directions: left, right (default), top, bottom
- Touch/swipe gestures for mobile via Vaul
- Overlay backdrop with fade animation
- Keyboard support (Escape to close)
- Click outside to close
- Focus management and ARIA attributes
- Handle indicator for top/bottom drawers
- Scrollable content support

## Usage

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from '@repo/ui'

function Example() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Drawer description text</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>Drawer content goes here</p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```

## Controlled State

```tsx
function ControlledExample() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Open</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Controlled Drawer</DrawerTitle>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}
```

## Direction Variants

Set `direction` on the root `Drawer` component:

- `left` - Navigation menus, sidebars
- `right` - Filters, settings panels (default)
- `top` - Notifications, alerts
- `bottom` - Mobile action sheets, modals

## API Reference

### Drawer (Root)

| Prop         | Type                                   | Default | Description                     |
| ------------ | -------------------------------------- | ------- | ------------------------------- |
| direction    | "left" \| "right" \| "top" \| "bottom" | "right" | Direction drawer slides from    |
| open         | boolean                                | -       | Controlled open state           |
| onOpenChange | (open: boolean) => void                | -       | Callback when state changes     |
| defaultOpen  | boolean                                | false   | Uncontrolled default open state |

### DrawerContent

| Prop       | Type    | Default | Description                                      |
| ---------- | ------- | ------- | ------------------------------------------------ |
| showHandle | boolean | auto    | Show handle bar (auto for top/bottom directions) |
| className  | string  | -       | Additional CSS classes                           |

### Compound Components

| Component           | Description                                  |
| ------------------- | -------------------------------------------- |
| `DrawerTrigger`     | Button that opens the drawer                 |
| `DrawerClose`       | Button that closes the drawer                |
| `DrawerPortal`      | Portal container (included in DrawerContent) |
| `DrawerOverlay`     | Backdrop overlay (included in DrawerContent) |
| `DrawerHandle`      | Swipe handle indicator (auto for top/bottom) |
| `DrawerHeader`      | Header section with scroll shadow on scroll  |
| `DrawerBody`        | Scrollable body section                      |
| `DrawerFooter`      | Footer section with action buttons           |
| `DrawerTitle`       | Accessible title (required for a11y)         |
| `DrawerDescription` | Accessible description                       |

## Common Patterns

### Navigation Menu (Left)

```tsx
<Drawer direction="left">
  <DrawerTrigger asChild>
    <Button variant="ghost" size="icon">
      ☰
    </Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Navigation</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      <nav>
        <a href="/dashboard">Dashboard</a>
        <a href="/settings">Settings</a>
      </nav>
    </DrawerBody>
  </DrawerContent>
</Drawer>
```

### Filters Panel (Right)

```tsx
<Drawer direction="right">
  <DrawerTrigger asChild>
    <Button>Filters</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Filters</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>{/* Filter controls */}</DrawerBody>
    <DrawerFooter>
      <Button>Apply Filters</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Mobile Action Sheet (Bottom)

```tsx
<Drawer direction="bottom">
  <DrawerTrigger asChild>
    <Button>Actions</Button>
  </DrawerTrigger>
  <DrawerContent>
    {/* Handle auto-shown for bottom direction */}
    <DrawerBody>
      <Button variant="ghost">Share</Button>
      <Button variant="ghost">Edit</Button>
      <Button variant="ghost">Delete</Button>
    </DrawerBody>
  </DrawerContent>
</Drawer>
```

## Design Guidelines

### Close Button

The `DrawerClose` component is **composable, not forced** — include it when needed.

**When to include a close button (header X icon):**

| Context                          | Include | Rationale                                         |
| -------------------------------- | ------- | ------------------------------------------------- |
| Modal drawers with forms/content | ✅ Yes  | Users need explicit, discoverable dismissal       |
| Complex multi-step flows         | ✅ Yes  | Prevents accidental data loss from backdrop click |
| Mobile drawers                   | ✅ Yes  | Swipe gestures are ambiguous and inaccessible     |
| Accessibility-critical apps      | ✅ Yes  | Screen readers and keyboard users need it         |

**When close button may be omitted:**

| Context                       | Include     | Rationale                           |
| ----------------------------- | ----------- | ----------------------------------- |
| Single-action selection lists | ❌ Optional | Selecting an item closes the drawer |
| Non-modal/persistent sidebars | ❌ No       | Always visible, no dismissal needed |
| Quick action sheets (bottom)  | ❌ Optional | Handle + swipe is primary pattern   |

**Built-in dismissal methods (always available):**

- `Esc` key
- Backdrop click (unless disabled)
- Swipe gesture (direction-aware)

### Border Radius

Drawers use border radius on the **inner edge only** (the side facing content).

| Direction | Rounded Corners           |
| --------- | ------------------------- |
| `right`   | Top-left, bottom-left     |
| `left`    | Top-right, bottom-right   |
| `bottom`  | Top-left, top-right       |
| `top`     | Bottom-left, bottom-right |

**Rationale:**

- Outer edge touches viewport — no radius (extends to screen edge)
- Inner edge radius signals the drawer is a distinct elevated surface
- Follows Material Design 3 "Large" shape category (16dp)

## Accessibility

- Built on Vaul which uses Radix primitives for ARIA compliance
- Focus trapped within drawer when open
- Escape key closes drawer
- Click outside closes drawer
- `DrawerTitle` required for screen readers
- Focus returns to trigger on close
- Touch gestures respect reduced motion preferences

## Styling

Uses design system tokens:

- `--color-overlay-backdrop` - Overlay background
- `--z-dialog` - Z-index layering
- `--color-border-muted` - Handle indicator color
- `--shadow-sm` - Header scroll shadow (via `drawer.css`)
- Border and shadow tokens for elevation

### Scroll Shadow

When `DrawerBody` content is scrolled, `DrawerHeader` shows a shadow to indicate more content above.
This is handled automatically via scroll detection and CSS in `styles/components/drawer.css`.

## Testing

See `drawer.test.tsx` for test coverage:

- Rendering with all direction variants
- User interaction (open, close, keyboard)
- Handle visibility for top/bottom
- Ref forwarding
- Custom className merging
- Accessibility attributes
