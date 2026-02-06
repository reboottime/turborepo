# Dialog Best Practices

Guidelines for using the Dialog component effectively, based on patterns from Material UI, Radix UI, Chakra UI, and shadcn/ui.

## Size Selection

| Size   | Width | Use Case                                               |
| ------ | ----- | ------------------------------------------------------ |
| `sm`   | 384px | Simple confirmations, alerts, single-action dialogs    |
| `md`   | 448px | Forms with 1-3 fields, basic content (default)         |
| `lg`   | 512px | Complex forms, multi-step wizards, more content        |
| `xl`   | 640px | Tables, data-heavy layouts, side-by-side content       |
| `full` | 100%  | Immersive experiences, complex workflows, mobile-first |

```tsx
// Simple confirmation
<DialogContent size="sm">

// Standard form (default)
<DialogContent size="md">

// Complex form with multiple sections
<DialogContent size="lg">

// Data table or comparison view
<DialogContent size="xl">
```

## Content Structure

Use the compound components in this order:

```tsx
<DialogContent>
  <DialogHeader>
    <DialogTitle>Title</DialogTitle>
    <DialogDescription>Optional description</DialogDescription>
  </DialogHeader>

  <DialogBody>{/* Scrollable content area */}</DialogBody>

  <DialogFooter>
    <DialogClose asChild>
      <Button variant="outline">Cancel</Button>
    </DialogClose>
    <Button>Primary Action</Button>
  </DialogFooter>
</DialogContent>
```

## Scrollable Content

For long content, use `DialogBody` with a max-height:

```tsx
<DialogBody className="max-h-64">{/* Long scrollable content */}</DialogBody>
```

The dialog itself is constrained to `85vh` max-height with `overflow-y-auto`.

## Mobile Behavior

- Dialogs automatically use near-full width on mobile (`calc(100% - 2rem)`)
- Max-width constraints apply on larger screens
- Consider `size="full"` for complex mobile workflows
- Footer buttons stack vertically on mobile, horizontally on desktop

## Accessibility

1. **Always include `DialogTitle`** - Required for screen readers
2. **Add `DialogDescription`** when helpful - Provides additional context
3. **Focus management** - Handled automatically by Radix primitives
4. **Escape key** - Closes dialog by default
5. **Click outside** - Closes dialog by default

## Common Patterns

### Confirmation Dialog

```tsx
<DialogContent size="sm">
  <DialogHeader>
    <DialogTitle>Delete item?</DialogTitle>
    <DialogDescription>This action cannot be undone.</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <DialogClose asChild>
      <Button variant="outline">Cancel</Button>
    </DialogClose>
    <Button variant="destructive">Delete</Button>
  </DialogFooter>
</DialogContent>
```

### Form Dialog

```tsx
<DialogContent size="md">
  <DialogHeader>
    <DialogTitle>Edit Profile</DialogTitle>
    <DialogDescription>Make changes to your profile.</DialogDescription>
  </DialogHeader>
  <form className="grid gap-4">{/* Form fields */}</form>
  <DialogFooter>
    <DialogClose asChild>
      <Button variant="outline">Cancel</Button>
    </DialogClose>
    <Button type="submit">Save</Button>
  </DialogFooter>
</DialogContent>
```

### Terms & Conditions (Scrollable)

```tsx
<DialogContent size="md">
  <DialogHeader>
    <DialogTitle>Terms & Conditions</DialogTitle>
  </DialogHeader>
  <DialogBody className="max-h-64">{/* Long legal text */}</DialogBody>
  <DialogFooter>
    <DialogClose asChild>
      <Button variant="outline">Decline</Button>
    </DialogClose>
    <Button>Accept</Button>
  </DialogFooter>
</DialogContent>
```

## Anti-patterns

| Avoid                       | Instead                                     |
| --------------------------- | ------------------------------------------- |
| Nesting dialogs             | Use a single dialog with multi-step content |
| Too much content            | Break into steps or use a dedicated page    |
| No clear action             | Always provide obvious next steps           |
| Overusing `full` size       | Reserve for truly immersive experiences     |
| Custom widths via className | Use the `size` prop for consistency         |

## Design Tokens

The dialog uses these CSS custom properties (customizable in `styles.css`):

```css
--dialog-width-sm: 384px;
--dialog-width-md: 448px;
--dialog-width-lg: 512px;
--dialog-width-xl: 640px;
--dialog-max-height: 85vh;
--dialog-mobile-margin: 1rem;
```
