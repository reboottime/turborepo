import type { Preview } from "@storybook/react";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Design Tokens",
          [
            "1. Introduction",
            "2. Colors",
            "3. Typography",
            "4. Spacing",
            "5. Elevation",
          ],
          "Components",
          "*",
        ],
      },
    },
  },
};

export default preview;
