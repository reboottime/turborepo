import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#lib/cn";

const cardVariants = cva(
  "rounded-[var(--radius-lg)] border border-border-default bg-surface-raised text-text-primary p-[var(--spacing-6)]",
  {
    variants: {
      surface: {
        base: "shadow-xs bg-surface-base",
        raised: "shadow-sm",
        overlay: "shadow-md bg-surface-overlay",
        sunken: "shadow-none bg-surface-sunken",
      },
    },
    defaultVariants: {
      surface: "raised",
    },
  },
);

interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, surface, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ surface }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-[var(--spacing-1-5)]", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-[length:var(--font-size-2xl)] font-semibold leading-none tracking-[var(--tracking-tight)]",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[length:var(--font-size-sm)] text-text-secondary",
      className,
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("pt-[var(--spacing-4)]", className)}
      {...props}
    />
  ),
);
CardContent.displayName = "CardContent";

export {
  Card,
  cardVariants,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  type CardProps,
};
