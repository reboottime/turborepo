import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from ".";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: "24rem" }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content body. This is where the main information lives.</p>
      </CardContent>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card style={{ maxWidth: "24rem" }}>
      <CardContent>
        <p>A simple card with content only — no header.</p>
      </CardContent>
    </Card>
  ),
};

export const WithCustomClass: Story = {
  name: "Custom className",
  render: () => (
    <Card className="bg-muted" style={{ maxWidth: "24rem" }}>
      <CardHeader>
        <CardTitle>Custom Background</CardTitle>
        <CardDescription>
          This card uses <code>className=&quot;bg-muted&quot;</code> merged via <code>cn()</code>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>The background is overridden by the custom class.</p>
      </CardContent>
    </Card>
  ),
};
