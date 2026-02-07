import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./index";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

/**
 * Set `direction` on <Drawer> - DrawerContent automatically inherits it.
 * Default direction is "right".
 */
export const Right: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Open Right Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Right Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides in from the right side. Commonly used for
            filters, settings, or additional information. Try swiping right to
            dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            <p>This is the drawer body content.</p>
            <p>
              You can put any content here including forms, lists, or other
              components.
            </p>
            <p className="text-sm text-text-secondary">
              Tip: Swipe right or press Escape to close
            </p>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
          <Button>Save Changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Left: Story = {
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button>Open Left Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Left Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides in from the left side. Often used for navigation
            menus. Try swiping left to dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <nav className="space-y-2">
            <a href="#" className="block p-2 hover:bg-muted rounded">
              Dashboard
            </a>
            <a href="#" className="block p-2 hover:bg-muted rounded">
              Projects
            </a>
            <a href="#" className="block p-2 hover:bg-muted rounded">
              Settings
            </a>
          </nav>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Top: Story = {
  render: () => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button>Open Top Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Top Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides in from the top. Useful for notifications or
            announcements. Notice the handle indicator at the top. Swipe up to
            dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded">Notification 1</div>
            <div className="p-3 bg-muted rounded">Notification 2</div>
            <div className="p-3 bg-muted rounded">Notification 3</div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Dismiss All</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button>Open Bottom Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Bottom Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides in from the bottom. Common on mobile for action
            sheets. Notice the handle indicator at the top. Swipe down to
            dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Share
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Edit
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Delete
            </Button>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 border border-border-default rounded"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-border-default rounded"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium">
                Bio
              </label>
              <textarea
                id="bio"
                placeholder="Tell us about yourself"
                rows={4}
                className="w-full p-2 border border-border-default rounded"
              />
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Save Changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithScrollableContent: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Open with Long Content</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Scrollable Content</DrawerTitle>
          <DrawerDescription>
            This drawer demonstrates scrollable content when it exceeds the
            viewport. Scroll within the drawer body, then swipe right to
            dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} className="p-4 bg-muted rounded">
                <p className="font-medium">Item {i + 1}</p>
                <p className="text-sm text-text-secondary mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              </div>
            ))}
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const MinimalWithoutFooter: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Open Minimal</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Minimal Drawer</DrawerTitle>
          <DrawerDescription>
            A simple drawer without a footer section.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>This is a minimal drawer with just a header and body.</p>
          <p className="mt-4">Swipe right or press Escape to close.</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};

const ControlledStateComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Close Drawer (External)
        </Button>
      </div>
      <p className="text-sm text-text-secondary">
        Current state: {open ? "Open" : "Closed"}
      </p>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Controlled Drawer</DrawerTitle>
            <DrawerDescription>
              This drawer&apos;s state is controlled externally.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <p>You can control the drawer state from outside the component.</p>
            <p className="mt-4 text-sm text-text-secondary">
              Try swiping right or using the external close button
            </p>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export const ControlledState: Story = {
  render: () => <ControlledStateComponent />,
};

const WithSnapPointsComponent = () => {
  const [snap, setSnap] = React.useState<number | string | null>(0.5);

  return (
    <Drawer
      direction="bottom"
      snapPoints={[0.3, 0.5, 0.8, 1]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <DrawerTrigger asChild>
        <Button>Open with Snap Points</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer with Snap Points</DrawerTitle>
          <DrawerDescription>
            This drawer has multiple snap points. Drag the handle to snap to
            different heights: 30%, 50%, 80%, or 100% of the screen.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            <p className="text-sm">Current snap point: {snap}</p>
            <div className="space-y-2">
              <p className="font-medium">Quick snap buttons:</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSnap(0.3)}
                >
                  30%
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSnap(0.5)}
                >
                  50%
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSnap(0.8)}
                >
                  80%
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSnap(1)}>
                  100%
                </Button>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i} className="p-4 bg-muted rounded">
                  Content Item {i + 1}
                </div>
              ))}
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const WithSnapPoints: Story = {
  render: () => <WithSnapPointsComponent />,
};

export const NonDismissible: Story = {
  render: () => (
    <Drawer dismissible={false} direction="right">
      <DrawerTrigger asChild>
        <Button>Open Non-Dismissible Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Non-Dismissible Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer cannot be dismissed by clicking outside, pressing
            Escape, or swiping. You must use the close button.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>
            This is useful for important actions where you want to force the
            user to make a decision.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>I Understand</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const CustomThreshold: Story = {
  render: () => (
    <Drawer closeThreshold={0.7} direction="bottom">
      <DrawerTrigger asChild>
        <Button>Open with Custom Threshold</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Custom Close Threshold</DrawerTitle>
          <DrawerDescription>
            This drawer has a 70% close threshold. You need to swipe down at
            least 70% of the drawer height to dismiss it. Try it!
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            <p>
              Default threshold is 25%. This higher threshold makes it harder to
              accidentally close the drawer.
            </p>
            <p className="text-sm text-text-secondary">
              Try swiping down - you&apos;ll need to go further to close it
            </p>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
