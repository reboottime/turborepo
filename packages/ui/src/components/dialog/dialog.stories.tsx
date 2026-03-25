import type { Meta, StoryObj } from '@storybook/react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '.'
import { Button } from '../button'

const meta: Meta<typeof DialogContent> = {
  title: 'Components/Dialog',
  component: DialogContent,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Dialog width variant',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
  decorators: [
    (Story) => (
      <Dialog defaultOpen>
        <Story />
      </Dialog>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DialogContent>

/**
 * Playground story with all props wired to controls.
 * Adjust the size control to see different width variants.
 */
export const Playground: Story = {
  args: {
    size: 'md',
  },
  render: ({ size }) => (
    <DialogContent size={size}>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>This is a description of the dialog content.</DialogDescription>
      </DialogHeader>
      <DialogBody>
        <p>Dialog body content goes here.</p>
      </DialogBody>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  ),
}

/**
 * All size variants grouped in one story.
 */
export const Sizes: Story = {
  decorators: [],
  render: () => (
    <div className="grid gap-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline">Open {size.toUpperCase()}</Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>{size.toUpperCase()} Dialog</DialogTitle>
              <DialogDescription>Size variant: {size}</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p>This dialog uses the {size} size variant.</p>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
}

/**
 * Scrollable content with max-height constraint on DialogBody.
 * Demonstrates overflow handling.
 */
export const ScrollableContent: Story = {
  args: {
    size: 'md',
  },
  render: ({ size }) => (
    <DialogContent size={size}>
      <DialogHeader>
        <DialogTitle>Terms & Conditions</DialogTitle>
        <DialogDescription>Please read and accept our terms.</DialogDescription>
      </DialogHeader>
      <DialogBody className="max-h-64">
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i} className="mb-4 text-sm text-text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        ))}
      </DialogBody>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Decline</Button>
        </DialogClose>
        <Button>Accept</Button>
      </DialogFooter>
    </DialogContent>
  ),
}

/**
 * Real-world: Confirmation dialog with destructive action.
 */
export const ConfirmationDialog: Story = {
  decorators: [],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Delete Item?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Real-world: Form dialog with input fields.
 */
export const FormDialog: Story = {
  decorators: [],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Name</span>
            <input
              type="text"
              autoComplete="name"
              className="w-full rounded-md border border-border-default bg-surface-base px-3 py-2 text-sm"
              defaultValue="Kate"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              autoComplete="email"
              className="w-full rounded-md border border-border-default bg-surface-base px-3 py-2 text-sm"
              defaultValue="kate@example.com"
            />
          </label>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * Real-world: Complex data display (table).
 */
export const DataDisplayDialog: Story = {
  decorators: [],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Order Details</Button>
      </DialogTrigger>
      <DialogContent size="xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>Complete order information and history.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default">
                <th className="py-2 text-left font-medium">Item</th>
                <th className="py-2 text-left font-medium">Qty</th>
                <th className="py-2 text-right font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-subtle">
                <td className="py-2">Product A</td>
                <td className="py-2">2</td>
                <td className="py-2 text-right">$29.99</td>
              </tr>
              <tr className="border-b border-border-subtle">
                <td className="py-2">Product B</td>
                <td className="py-2">1</td>
                <td className="py-2 text-right">$49.99</td>
              </tr>
              <tr className="border-b border-border-subtle">
                <td className="py-2">Product C</td>
                <td className="py-2">3</td>
                <td className="py-2 text-right">$15.99</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="py-2 font-medium" colSpan={2}>
                  Total
                </td>
                <td className="py-2 text-right font-medium">$157.95</td>
              </tr>
            </tfoot>
          </table>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>Print Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
