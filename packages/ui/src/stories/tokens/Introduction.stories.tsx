import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design Tokens/1. Introduction",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "2rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "1rem",
            color: "var(--color-text-primary)",
          }}
        >
          Design Tokens
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--color-text-secondary)",
            marginBottom: "2rem",
            lineHeight: "1.75",
          }}
        >
          Design tokens are the visual design atoms of the design system — the
          named entities that store visual design attributes. They are the
          foundation of the UI components and ensure consistency across the
          entire application.
        </p>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "var(--color-surface-raised)",
            borderRadius: "0.5rem",
            border: "1px solid var(--color-border-default)",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "0.75rem",
              color: "var(--color-text-primary)",
            }}
          >
            Why Design Tokens?
          </h2>
          <ul
            style={{
              fontSize: "1rem",
              color: "var(--color-text-secondary)",
              paddingLeft: "1.5rem",
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              lineHeight: "1.6",
            }}
          >
            <li>
              <strong>Consistency:</strong> Using tokens ensures that colors,
              spacing, typography, and shadows are consistent throughout the
              application
            </li>
            <li>
              <strong>Maintainability:</strong> Update values in one place and
              see changes reflected everywhere
            </li>
            <li>
              <strong>Theming:</strong> Tokens support light/dark mode
              automatically using CSS light-dark() function
            </li>
            <li>
              <strong>Scalability:</strong> Easy to extend and modify the design
              system without touching component code
            </li>
            <li>
              <strong>Communication:</strong> Provides a shared vocabulary
              between designers and developers
            </li>
          </ul>
        </div>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "1rem",
            marginTop: "2rem",
            color: "var(--color-text-primary)",
          }}
        >
          Token Categories
        </h2>

        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
            marginBottom: "2rem",
          }}
        >
          {[
            {
              title: "Colors",
              description:
                "Surface colors, text colors, borders, status indicators, and action colors with automatic light/dark theming",
              icon: "🎨",
            },
            {
              title: "Typography",
              description:
                "Font families, type scale, line heights, font weights, and letter spacing",
              icon: "📝",
            },
            {
              title: "Spacing",
              description:
                "Spacing scale (8px grid), container widths, and responsive breakpoints",
              icon: "📏",
            },
            {
              title: "Elevation",
              description:
                "Shadow tokens for depth and z-index hierarchy for stacking order",
              icon: "📦",
            },
          ].map((category) => (
            <div
              key={category.title}
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--color-surface-raised)",
                borderRadius: "0.5rem",
                border: "1px solid var(--color-border-default)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.5rem",
                }}
              >
                {category.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  color: "var(--color-text-primary)",
                }}
              >
                {category.title}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                {category.description}
              </p>
            </div>
          ))}
        </div>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "1rem",
            marginTop: "2rem",
            color: "var(--color-text-primary)",
          }}
        >
          How to Use Tokens
        </h2>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "var(--color-surface-sunken)",
            borderRadius: "0.5rem",
            marginBottom: "2rem",
            fontFamily: "var(--font-family-mono)",
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              marginBottom: "1rem",
              color: "var(--color-text-secondary)",
            }}
          >
            In Tailwind CSS (recommended):
          </div>
          <pre
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--color-text-primary)",
              lineHeight: "1.6",
            }}
          >
            {`<button className="
  bg-primary
  text-text-inverse
  p-[var(--spacing-4)]
  rounded-[var(--radius-md)]
  shadow-md
">
  Button
</button>`}
          </pre>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "var(--color-surface-sunken)",
            borderRadius: "0.5rem",
            marginBottom: "2rem",
            fontFamily: "var(--font-family-mono)",
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              marginBottom: "1rem",
              color: "var(--color-text-secondary)",
            }}
          >
            In inline styles (when necessary):
          </div>
          <pre
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--color-text-primary)",
              lineHeight: "1.6",
            }}
          >
            {`<div style={{
  backgroundColor: "var(--color-surface-raised)",
  padding: "var(--spacing-4)",
  borderRadius: "var(--radius-md)",
  boxShadow: "var(--shadow-md)",
}}>
  Content
</div>`}
          </pre>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "var(--color-status-info)",
            color: "var(--color-text-inverse)",
            borderRadius: "0.5rem",
            marginTop: "2rem",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Token-First Principle
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              margin: 0,
              lineHeight: "1.6",
              opacity: 0.95,
            }}
          >
            Always use design tokens from packages/ui/src/styles/. Never
            hardcode colors, spacing, radii, or z-index values. This ensures
            consistency and makes the design system maintainable and themeable.
          </p>
        </div>

        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            backgroundColor: "var(--color-surface-raised)",
            borderRadius: "0.5rem",
            border: "1px solid var(--color-border-default)",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: "0.75rem",
              color: "var(--color-text-primary)",
            }}
          >
            Token Source Files
          </h3>
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-family-mono)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div>packages/ui/src/styles/tokens/colors.css</div>
            <div>packages/ui/src/styles/tokens/typography.css</div>
            <div>packages/ui/src/styles/tokens/spacing.css</div>
            <div>packages/ui/src/styles/tokens/elevation.css</div>
          </div>
        </div>
      </div>
    </div>
  ),
};
