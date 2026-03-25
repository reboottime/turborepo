import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '.'
import { Label } from '../label'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
    },
  },
  args: {
    placeholder: 'Enter text...',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '20rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Label>Default</Label>
        <Input placeholder="Default input" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Label>With value</Label>
        <Input defaultValue="kate@example.com" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Label>Disabled</Label>
        <Input disabled placeholder="Disabled input" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Label style={{ color: 'var(--color-status-error-text)' }}>Invalid</Label>
        <Input aria-invalid="true" defaultValue="bad value" />
      </div>
    </div>
  ),
}

export const WithValidation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Label htmlFor="invalid-email" style={{ color: 'var(--color-status-error-text)' }}>
        Email
      </Label>
      <Input
        id="invalid-email"
        type="email"
        aria-invalid="true"
        placeholder="you@example.com"
        defaultValue="not-an-email"
      />
      <p style={{ color: 'var(--color-status-error-text)', fontSize: '0.875rem' }}>
        Please enter a valid email address.
      </p>
    </div>
  ),
}
