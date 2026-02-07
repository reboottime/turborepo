import type { Meta, StoryObj } from "@storybook/react";
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
} from ".";
import { Button } from "../button";

const meta: Meta<typeof DialogContent> = {
  title: "Components/Dialog",
  component: DialogContent,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Dialog width variant",
      table: {
        defaultValue: { summary: "md" },
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
};

export default meta;
type Story = StoryObj<typeof DialogContent>;

export const Default: Story = {
  args: {
    size: "md",
  },
  render: ({ size }) => (
    <DialogContent size={size}>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>
          This is a description of the dialog content.
        </DialogDescription>
      </DialogHeader>
      <p>Dialog body content goes here.</p>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  ),
};

export const Small: Story = {
  args: {
    size: "sm",
  },
  render: ({ size }) => (
    <DialogContent size={size}>
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
  ),
};

export const Medium: Story = {
  args: {
    size: "md",
  },
  render: ({ size }) => (
    <DialogContent size={size}>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-sm font-medium">Name</span>
          <input
            className="w-full rounded-md border border-border-default bg-surface-base px-3 py-2 text-sm"
            defaultValue="Kate"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-medium">Email</span>
          <input
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
  ),
};

export const Large: Story = {
  args: {
    size: "lg",
  },
  render: ({ size }) => (
    <DialogContent size={size}>
      <DialogHeader>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogDescription>
          Fill in the details to create a new project.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-sm font-medium">Project Name</span>
          <input
            className="w-full rounded-md border border-border-default bg-surface-base px-3 py-2 text-sm"
            placeholder="My Awesome Project"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-medium">Description</span>
          <textarea
            className="w-full rounded-md border border-border-default bg-surface-base px-3 py-2 text-sm"
            rows={3}
            placeholder="Describe your project..."
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-medium">Team Members</span>
          <input
            className="w-full rounded-md border border-border-default bg-surface-base px-3 py-2 text-sm"
            placeholder="Add team members by email"
          />
        </label>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button>Create Project</Button>
      </DialogFooter>
    </DialogContent>
  ),
};

export const XLarge: Story = {
  args: {
    size: "xl",
  },
  render: ({ size }) => (
    <DialogContent size={size}>
      <DialogHeader>
        <DialogTitle>Order Details</DialogTitle>
        <DialogDescription>
          Complete order information and history.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
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
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
        <Button>Print Invoice</Button>
      </DialogFooter>
    </DialogContent>
  ),
};

export const Full: Story = {
  args: {
    size: "full",
  },
  render: ({ size }) => (
    <DialogContent size={size}>
      <DialogHeader>
        <DialogTitle>Full Screen Dialog</DialogTitle>
        <DialogDescription>
          This dialog takes up the entire screen.
        </DialogDescription>
      </DialogHeader>
      <DialogBody>
        <p>Use this for immersive experiences or complex workflows.</p>
      </DialogBody>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  ),
};

export const ScrollableContent: Story = {
  args: {
    size: "md",
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
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
};

export const WithTrigger: Story = {
  decorators: [], // Remove defaultOpen decorator
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog with Trigger</DialogTitle>
          <DialogDescription>
            Click the button to open this dialog.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
