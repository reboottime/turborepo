import type { Meta, StoryObj } from '@storybook/react'
import { PasswordInput } from '.'

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Enter password',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 max-w-sm">
      <div className="space-y-2">
        <label htmlFor="default-password" className="text-sm font-medium">
          Default
        </label>
        <PasswordInput id="default-password" placeholder="Enter your password" />
      </div>
      <div className="space-y-2">
        <label htmlFor="value-password" className="text-sm font-medium">
          With value
        </label>
        <PasswordInput id="value-password" defaultValue="supersecret123" />
      </div>
      <div className="space-y-2">
        <label htmlFor="disabled-password" className="text-sm font-medium">
          Disabled
        </label>
        <PasswordInput id="disabled-password" disabled defaultValue="password123" />
      </div>
      <div className="space-y-2">
        <label htmlFor="error-password" className="text-sm font-medium">
          Invalid
        </label>
        <PasswordInput id="error-password" aria-invalid={true} defaultValue="weak" />
        <p className="text-sm text-status-error">Password must be at least 8 characters</p>
      </div>
    </div>
  ),
}

export const ChangePasswordForm: Story = {
  render: () => (
    <form className="space-y-4 max-w-sm">
      <div className="space-y-2">
        <label htmlFor="current-password" className="text-sm font-medium">
          Current Password
        </label>
        <PasswordInput id="current-password" autoComplete="current-password" />
      </div>
      <div className="space-y-2">
        <label htmlFor="new-password" className="text-sm font-medium">
          New Password
        </label>
        <PasswordInput id="new-password" autoComplete="new-password" />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirm-password" className="text-sm font-medium">
          Confirm Password
        </label>
        <PasswordInput id="confirm-password" autoComplete="new-password" />
      </div>
    </form>
  ),
}
