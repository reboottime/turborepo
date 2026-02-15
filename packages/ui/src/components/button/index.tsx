"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
// Nodejs pacakge standard of importing internal modules/packages/tools
import { cn } from "#lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-colors duration-[var(--duration-fast)] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-text-inverse hover:bg-primary-hover active:bg-primary-active",
        destructive:
          "bg-destructive text-text-inverse hover:bg-destructive-hover active:bg-destructive-active",
        outline:
          "border border-border-default bg-surface-base text-text-primary hover:bg-surface-sunken active:bg-surface-sunken",
        ghost:
          "border border-transparent text-text-primary hover:bg-surface-sunken active:bg-surface-sunken",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-[var(--spacing-10)] px-[var(--spacing-4)] py-[var(--spacing-2)] text-[length:var(--font-size-sm)]",
        sm: "h-[var(--spacing-8)] rounded-[var(--radius-md)] px-[var(--spacing-3)] text-[length:var(--font-size-xs)]",
        lg: "h-[var(--spacing-12)] rounded-[var(--radius-md)] px-[var(--spacing-8)] text-[length:var(--font-size-base)]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
