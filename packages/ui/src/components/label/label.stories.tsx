import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '.'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  argTypes: {
    children: { control: 'text' },
    htmlFor: { control: 'text' },
  },
  args: {
    children: 'Email address',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <Label {...args} />,
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>Default</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Label htmlFor="email">Email address</Label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #e5e5e5',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
            }}
          />
        </div>
      </div>

      <div>
        <div style={{ marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
          Required
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Label htmlFor="required-email">
            Email address <span className="text-destructive">*</span>
          </Label>
          <input
            id="required-email"
            type="email"
            placeholder="you@example.com"
            required
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #e5e5e5',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
            }}
          />
        </div>
      </div>

      <div>
        <div style={{ marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
          Error state
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Label htmlFor="error-email" className="text-destructive">
            Email address
          </Label>
          <input
            id="error-email"
            type="email"
            defaultValue="invalid-email"
            aria-invalid="true"
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid var(--color-destructive, #ef4444)',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
            }}
          />
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-destructive, #ef4444)',
            }}
          >
            Please enter a valid email address
          </span>
        </div>
      </div>

      <div>
        <div style={{ marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
          Disabled
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Label
            htmlFor="disabled-email"
            className="opacity-[var(--opacity-disabled)] cursor-not-allowed"
          >
            Email address
          </Label>
          <input
            id="disabled-email"
            type="email"
            placeholder="you@example.com"
            disabled
            className="peer"
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #e5e5e5',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              opacity: 'var(--opacity-disabled, 0.5)',
              cursor: 'not-allowed',
            }}
          />
        </div>
      </div>
    </div>
  ),
}
