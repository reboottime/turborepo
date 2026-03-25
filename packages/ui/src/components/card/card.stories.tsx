import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '.'
import { Button } from '../button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    surface: {
      control: 'select',
      options: ['base', 'raised', 'overlay', 'sunken'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    surface: 'base',
  },
  render: (args) => (
    <Card {...args} style={{ maxWidth: '24rem' }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content body. This is where the main information lives.</p>
      </CardContent>
    </Card>
  ),
}

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '48rem',
      }}
    >
      {/* Surface variants */}
      {(['base', 'raised', 'overlay', 'sunken'] as const).map((surface) => (
        <Card key={surface} surface={surface}>
          <CardHeader>
            <CardTitle>Surface: {surface}</CardTitle>
            <CardDescription>
              Using <code>surface=&quot;{surface}&quot;</code> variant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This card uses the {surface} surface level from the design system tokens
              {surface === 'sunken'
                ? ' with no shadow (recessed appearance).'
                : ` with ${surface === 'base' ? 'subtle' : surface === 'raised' ? 'small' : 'medium'} shadow elevation.`}
            </p>
          </CardContent>
        </Card>
      ))}

      {/* Simple variant (no header) */}
      <Card>
        <CardContent>
          <p>A simple card with content only — no header.</p>
        </CardContent>
      </Card>

      {/* Interactive variant */}
      <Card
        style={{ cursor: 'pointer' }}
        className="transition-shadow duration-200 hover:shadow-lg"
      >
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Hover over this card to see the effect.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This card has hover styles applied for interactive use cases like clickable list items.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card style={{ maxWidth: '24rem' }}>
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>This card includes a footer section.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content area above the footer.</p>
      </CardContent>
      <div
        className="border-t border-border-default mt-[var(--spacing-4)] pt-[var(--spacing-4)]"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span className="text-[length:var(--font-size-sm)] text-text-secondary">
          Last updated: 2 hours ago
        </span>
        <span className="text-[length:var(--font-size-sm)] text-text-secondary">3 items</span>
      </div>
    </Card>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Card style={{ maxWidth: '24rem' }}>
      <CardHeader>
        <CardTitle>Card with Actions</CardTitle>
        <CardDescription>This card includes action buttons.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content that requires user action or confirmation.</p>
      </CardContent>
      <div
        className="border-t border-border-default mt-[var(--spacing-4)] pt-[var(--spacing-4)]"
        style={{ display: 'flex', gap: 'var(--spacing-2)', justifyContent: 'flex-end' }}
      >
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Confirm</Button>
      </div>
    </Card>
  ),
}
