import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Playground — all props controllable
export const Playground: Story = {}

// Variants — all visual states grouped (variant × size matrix + disabled)
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['default', 'destructive', 'outline', 'ghost', 'link'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <span className="w-24 text-xs text-text-secondary">{variant}</span>
          <Button variant={variant} size="sm">
            sm
          </Button>
          <Button variant={variant} size="default">
            default
          </Button>
          <Button variant={variant} size="lg">
            lg
          </Button>
          <Button variant={variant} disabled>
            disabled
          </Button>
        </div>
      ))}
    </div>
  ),
}

// Feature stories — one per meaningful state
export const Disabled: Story = {
  args: { disabled: true },
}

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
}
