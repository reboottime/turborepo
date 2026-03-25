import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from '.'

// Simple icon components for demonstration
const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="12" y1="4" x2="4" y2="12" />
    <line x1="4" y1="4" x2="12" y2="12" />
  </svg>
)

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    icon: <CloseIcon />,
    'aria-label': 'Close',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    variant: 'ghost',
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {(['default', 'destructive', 'outline', 'ghost'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ width: '5rem', fontSize: '0.75rem', color: '#737373' }}>{variant}</span>
          {(['sm', 'default', 'lg'] as const).map((size) => (
            <IconButton
              key={size}
              variant={variant}
              size={size}
              icon={<CloseIcon />}
              aria-label="Close"
            />
          ))}
          <IconButton variant={variant} icon={<CloseIcon />} aria-label="Close" disabled />
        </div>
      ))}
    </div>
  ),
}

export const DialogCloseButton: Story = {
  render: () => (
    <div
      style={{
        position: 'relative',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1rem' }}>Dialog Title</h3>
        <IconButton icon={<CloseIcon />} aria-label="Close dialog" />
      </div>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#737373' }}>
        IconButton is commonly used for close buttons in dialogs, modals, and drawers.
      </p>
    </div>
  ),
}
