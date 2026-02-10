"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#lib/cn";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-[var(--radius-md)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)]",
  {
    variants: {
      variant: {
        default: "bg-primary text-text-inverse hover:bg-primary-hover",
        destructive:
          "bg-destructive text-text-inverse hover:bg-destructive-hover",
        outline:
          "border border-border-default bg-surface-base hover:bg-surface-sunken hover:text-text-primary",
        ghost:
          "border border-transparent hover:bg-surface-sunken hover:text-text-primary",
      },
      size: {
        sm: "h-[var(--spacing-8)] w-[var(--spacing-8)]",
        default: "h-[var(--spacing-10)] w-[var(--spacing-10)]",
        lg: "h-[var(--spacing-12)] w-[var(--spacing-12)]",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
    },
  },
);

export interface IconButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof iconButtonVariants> {
  /**
   * Icon element to display in the button
   */
  icon: ReactNode;
  /**
   * Required accessible label for screen readers
   */
  "aria-label": string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, ...props }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon}
      </button>
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
