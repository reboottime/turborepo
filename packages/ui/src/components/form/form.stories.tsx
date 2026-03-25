import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '.'
import { Input } from '../input'
import { Button } from '../button'

const meta: Meta = {
  title: 'Components/Form',
}

export default meta
type Story = StoryObj

function BasicFormDemo() {
  const form = useForm({
    defaultValues: { name: '', email: '' },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
        className="flex max-w-[24rem] flex-col gap-[var(--spacing-6)]"
      >
        <FormField
          control={form.control}
          name="name"
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>We&apos;ll never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const Playground: Story = {
  render: () => <BasicFormDemo />,
}

export const WithValidationErrors: Story = {
  render: () => {
    function Demo() {
      const form = useForm({
        defaultValues: { email: 'invalid-email', password: '' },
        mode: 'all',
      })

      form.trigger()

      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
            className="flex max-w-[24rem] flex-col gap-[var(--spacing-6)]"
          >
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
    }
    return <Demo />
  },
}

export const WithDisabledFields: Story = {
  render: () => {
    function Demo() {
      const form = useForm({
        defaultValues: { username: 'jane.doe', email: 'jane@example.com', role: 'Admin' },
      })

      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
            className="flex max-w-[24rem] flex-col gap-[var(--spacing-6)]"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormDescription>Username cannot be changed.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormDescription>You can update your email.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormDescription>Contact admin to change your role.</FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      )
    }
    return <Demo />
  },
}

export const MultiFieldLayout: Story = {
  render: () => {
    function Demo() {
      const form = useForm({
        defaultValues: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          street: '',
          city: '',
          zipCode: '',
        },
      })

      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
            className="flex max-w-[32rem] flex-col gap-[var(--spacing-8)]"
          >
            <fieldset className="m-0 border-none p-0">
              <legend className="mb-[var(--spacing-4)] text-[length:var(--font-size-base)] font-[var(--font-weight-semibold)] text-text-primary">
                Personal Information
              </legend>
              <div className="flex flex-col gap-[var(--spacing-4)]">
                <div className="flex gap-[var(--spacing-4)]">
                  <FormField
                    control={form.control}
                    name="firstName"
                    rules={{ required: 'First name is required' }}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    rules={{ required: 'Last name is required' }}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-[var(--spacing-4)]">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jane@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="m-0 border-none p-0">
              <legend className="mb-[var(--spacing-4)] text-[length:var(--font-size-base)] font-[var(--font-weight-semibold)] text-text-primary">
                Address
              </legend>
              <div className="flex flex-col gap-[var(--spacing-4)]">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-[var(--spacing-4)]">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="flex-[2]">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="94102" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </fieldset>

            <Button type="submit" className="self-start">
              Submit
            </Button>
          </form>
        </Form>
      )
    }
    return <Demo />
  },
}
