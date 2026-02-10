"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
// Nodejs pacakge standard of importing internal modules/packages/tools
import { cn } from "#lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-md)] text-[length:var(--font-size-sm)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)]",
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
        icon: "bg-transparent hover:bg-surface-sunken text-text-primary border border-transparent",
      },
      size: {
        default:
          "h-[var(--spacing-10)] px-[var(--spacing-4)] py-[var(--spacing-2)]",
        sm: "h-[var(--spacing-8)] rounded-[var(--radius-md)] px-[var(--spacing-3)]",
        lg: "h-[var(--spacing-12)] rounded-[var(--radius-md)] px-[var(--spacing-8)]",
      },
    },
    compoundVariants: [
      {
        variant: "icon",
        size: "sm",
        class: "w-[var(--spacing-8)] p-0",
      },
      {
        variant: "icon",
        size: "default",
        class: "w-[var(--spacing-10)] p-0",
      },
      {
        variant: "icon",
        size: "lg",
        class: "w-[var(--spacing-12)] p-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
