"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#lib/cn";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-dialog bg-[var(--color-overlay-backdrop)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * Dialog size variants following industry best practices:
 * - sm: Simple confirmations, alerts (384px)
 * - md: Default forms, basic content (448px)
 * - lg: Complex forms, more content (512px)
 * - xl: Large layouts, tables (640px)
 * - full: Full screen dialog
 */
const dialogContentVariants = cva(
  [
    // Base styles
    "fixed left-1/2 top-1/2 z-dialog -translate-x-1/2 -translate-y-1/2",
    "grid w-[calc(100%-var(--dialog-mobile-margin)*2)] gap-[var(--spacing-4)]",
    "rounded-[var(--radius-lg)] border border-border-default bg-surface-base p-[var(--spacing-6)] shadow-lg",
    // Height constraint with scrollable support
    "max-h-[var(--dialog-max-height)] overflow-y-auto",
    // Animations
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  ],
  {
    variants: {
      size: {
        sm: "max-w-[var(--dialog-width-sm)]",
        md: "max-w-[var(--dialog-width-md)]",
        lg: "max-w-[var(--dialog-width-lg)]",
        xl: "max-w-[var(--dialog-width-xl)]",
        full: "max-w-none h-screen max-h-screen rounded-none",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface DialogContentProps
  extends
    ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {}

const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, size, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(dialogContentVariants({ size, className }))}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-[var(--spacing-1-5)] text-center sm:text-left",
      className,
    )}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

const DialogBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto", className)}
    {...props}
  />
));
DialogBody.displayName = "DialogBody";

const DialogFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-[var(--spacing-2)]",
      className,
    )}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-[length:var(--font-size-lg)] font-semibold leading-none tracking-[var(--tracking-tight)]",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-[length:var(--font-size-sm)] text-text-secondary",
      className,
    )}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  dialogContentVariants,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

export type { DialogContentProps };
