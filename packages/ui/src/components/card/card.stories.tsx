import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from ".";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    surface: {
      control: "select",
      options: ["base", "raised", "overlay", "sunken"],
    },
  },
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

export const SurfaceVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "48rem",
      }}
    >
      {(["base", "raised", "overlay", "sunken"] as const).map((surface) => (
        <Card key={surface} surface={surface}>
          <CardHeader>
            <CardTitle>Surface: {surface}</CardTitle>
            <CardDescription>
              Using <code>surface=&quot;{surface}&quot;</code> variant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This card uses the {surface} surface level from the design system
              tokens
              {surface === "sunken"
                ? " with no shadow (recessed appearance)."
                : ` with ${surface === "base" ? "subtle" : surface === "raised" ? "small" : "medium"} shadow elevation.`}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const WithCustomClass: Story = {
  name: "Custom className",
  render: () => (
    <Card className="bg-surface-sunken" style={{ maxWidth: "24rem" }}>
      <CardHeader>
        <CardTitle>Custom Background</CardTitle>
        <CardDescription>
          This card uses <code>className=&quot;bg-surface-sunken&quot;</code>{" "}
          merged via <code>cn()</code>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>The background is overridden by the custom class.</p>
      </CardContent>
    </Card>
  ),
};
