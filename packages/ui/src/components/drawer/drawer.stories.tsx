import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
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
} from './index'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    dismissible: { control: 'boolean' },
    closeThreshold: { control: 'number' },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Drawer>

/**
 * Playground story with controls for direction, dismissible, and closeThreshold.
 */
export const Playground: Story = {
  args: {
    direction: 'right',
    dismissible: true,
    closeThreshold: 0.25,
  },
  render: ({ direction, dismissible, closeThreshold }) => (
    <Drawer direction={direction} dismissible={dismissible} closeThreshold={closeThreshold}>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This drawer demonstrates all configurable props. Try swiping to dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            <p>This is the drawer body content.</p>
            <p>You can put any content here including forms, lists, or other components.</p>
            <p className="text-sm text-text-secondary">Tip: Swipe or press Escape to close</p>
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
}

/**
 * All direction variants grouped in one story.
 */
export const Directions: Story = {
  render: () => (
    <div className="flex gap-2">
      {(['left', 'right', 'top', 'bottom'] as const).map((dir) => (
        <Drawer key={dir} direction={dir}>
          <DrawerTrigger asChild>
            <Button variant="outline">{dir}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{dir} Drawer</DrawerTitle>
              <DrawerDescription>Slides in from the {dir} side.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p>This drawer slides in from the {dir} side.</p>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
}

/**
 * Scrollable content when it exceeds the viewport.
 */
export const ScrollableContent: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Open with Long Content</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Scrollable Content</DrawerTitle>
          <DrawerDescription>
            Scroll within the drawer body, then swipe right to dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} className="p-4 bg-muted rounded">
                <p className="font-medium">Item {i + 1}</p>
                <p className="text-sm text-text-secondary mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
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
}

/**
 * Non-dismissible drawer that requires explicit user action to close.
 */
export const NonDismissible: Story = {
  render: () => (
    <Drawer dismissible={false} direction="right">
      <DrawerTrigger asChild>
        <Button>Open Non-Dismissible</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Non-Dismissible Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer cannot be dismissed by clicking outside, pressing Escape, or swiping. You
            must use the close button.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>
            This is useful for important actions where you want to force the user to make a
            decision.
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
}

const ControlledStateComponent = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Close Drawer (External)
        </Button>
      </div>
      <p className="text-sm text-text-secondary">Current state: {open ? 'Open' : 'Closed'}</p>
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
  )
}

/**
 * Programmatic control of drawer state.
 */
export const ControlledState: Story = {
  render: () => <ControlledStateComponent />,
}

const WithSnapPointsComponent = () => {
  const [snap, setSnap] = React.useState<number | string | null>(0.5)

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
            Drag the handle to snap to different heights: 30%, 50%, 80%, or 100%.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            <p className="text-sm">Current snap point: {snap}</p>
            <div className="space-y-2">
              <p className="font-medium">Quick snap buttons:</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setSnap(0.3)}>
                  30%
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSnap(0.5)}>
                  50%
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSnap(0.8)}>
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
  )
}

/**
 * Bottom drawer with snap points for multi-height positioning.
 */
export const WithSnapPoints: Story = {
  render: () => <WithSnapPointsComponent />,
}

/**
 * Real-world: Action sheet pattern for mobile.
 */
export const ActionSheet: Story = {
  render: () => (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button>Open Actions</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Actions</DrawerTitle>
          <DrawerDescription>Choose an action to perform.</DrawerDescription>
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
}
