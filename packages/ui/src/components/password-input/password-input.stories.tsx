import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from ".";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/PasswordInput",
  component: PasswordInput,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    placeholder: "Enter password",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: "supersecret123",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "supersecret123",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When disabled, both the input field and the visibility toggle button are non-interactive. The toggle button cannot be clicked or activated via keyboard.",
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="password" className="text-sm font-medium">
        Password
      </label>
      <PasswordInput id="password" placeholder="Enter your password" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="password-error" className="text-sm font-medium">
        Password
      </label>
      <PasswordInput
        id="password-error"
        placeholder="Enter your password"
        aria-invalid={true}
      />
      <p className="text-sm text-status-error">
        Password must be at least 8 characters
      </p>
    </div>
  ),
};

export const InForm: Story = {
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
};

export const KeyboardAccessible: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <p className="text-sm text-text-secondary">
        Tab to focus the input, then tab to the toggle button. Press Enter or
        Space to toggle visibility.
      </p>
      <div className="space-y-2">
        <label htmlFor="keyboard-test" className="text-sm font-medium">
          Password
        </label>
        <PasswordInput
          id="keyboard-test"
          placeholder="Try keyboard navigation"
          defaultValue="test123"
        />
      </div>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-sm">
      <div className="space-y-2">
        <label htmlFor="enabled-password" className="text-sm font-medium">
          Enabled (interactive toggle button)
        </label>
        <PasswordInput id="enabled-password" defaultValue="password123" />
        <p className="text-sm text-text-tertiary">
          Toggle button is clickable and keyboard accessible
        </p>
      </div>
      <div className="space-y-2">
        <label htmlFor="disabled-password" className="text-sm font-medium">
          Disabled (non-interactive toggle button)
        </label>
        <PasswordInput
          id="disabled-password"
          disabled
          defaultValue="password123"
        />
        <p className="text-sm text-text-tertiary">
          Toggle button is disabled and cannot be clicked or activated via
          keyboard
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of enabled vs disabled states. The disabled state prevents all interaction with both the input field and the visibility toggle button.",
      },
    },
  },
};
