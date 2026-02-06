"use client";

import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ReactNode,
} from "react";
import { Drawer as VaulDrawer } from "vaul";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#lib/cn";

// Re-export Vaul primitives
const DrawerTrigger = VaulDrawer.Trigger;
const DrawerClose = VaulDrawer.Close;
const DrawerPortal = VaulDrawer.Portal;

type DrawerDirection = "left" | "right" | "top" | "bottom";

const DrawerContext = createContext<DrawerDirection>("right");

type DrawerProps = ComponentPropsWithoutRef<typeof VaulDrawer.Root> & {
  /**
   * Direction from which the drawer slides in
   * @default "right"
   */
  direction?: DrawerDirection;
  children?: ReactNode;
};

/**
 * Drawer root component - wraps Vaul and provides direction context
 * so DrawerContent automatically inherits the direction for CSS positioning
 */
const Drawer = ({ direction = "right", children, ...props }: DrawerProps) => (
  <DrawerContext.Provider value={direction}>
    <VaulDrawer.Root direction={direction} {...props}>
      {children}
    </VaulDrawer.Root>
  </DrawerContext.Provider>
);

const DrawerOverlay = forwardRef<
  ComponentRef<typeof VaulDrawer.Overlay>,
  ComponentPropsWithoutRef<typeof VaulDrawer.Overlay>
>(({ className, ...props }, ref) => (
  <VaulDrawer.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-dialog bg-[var(--color-overlay-backdrop)]",
      className,
    )}
    {...props}
  />
));
DrawerOverlay.displayName = VaulDrawer.Overlay.displayName;

/**
 * Drawer side variants - slide in from different edges with swipe gestures
 * - left: Slide from left edge (navigation, menus)
 * - right: Slide from right edge (filters, settings) - default
 * - top: Slide from top edge (notifications)
 * - bottom: Slide from bottom edge (mobile sheets) - native Vaul direction
 */
const drawerContentVariants = cva(
  [
    // Base styles
    "fixed z-dialog flex flex-col",
    "bg-surface-base border-border-default shadow-lg",
  ],
  {
    variants: {
      side: {
        left: [
          "inset-y-0 left-0 h-full w-3/4 max-w-sm",
          "border-r rounded-r-lg",
        ],
        right: [
          "inset-y-0 right-0 h-full w-3/4 max-w-sm",
          "border-l rounded-l-lg",
        ],
        top: ["inset-x-0 top-0 w-full max-h-[80vh]", "border-b rounded-b-lg"],
        bottom: [
          "inset-x-0 bottom-0 w-full max-h-[80vh]",
          "border-t rounded-t-lg",
        ],
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

/**
 * Handle bar indicator for top/bottom drawers
 */
const DrawerHandle = forwardRef<
  ComponentRef<typeof VaulDrawer.Handle>,
  ComponentPropsWithoutRef<typeof VaulDrawer.Handle>
>(({ className, ...props }, ref) => (
  <VaulDrawer.Handle
    ref={ref}
    data-testid="drawer-handle"
    className={cn(
      "mx-auto mt-4 h-2 w-[100px] rounded-full bg-[var(--color-border-muted)]",
      className,
    )}
    {...props}
  />
));
DrawerHandle.displayName = "DrawerHandle";

interface DrawerContentProps
  extends
    Omit<ComponentPropsWithoutRef<typeof VaulDrawer.Content>, "asChild">,
    VariantProps<typeof drawerContentVariants> {
  /**
   * Show handle bar indicator (auto-shown for top/bottom drawers)
   */
  showHandle?: boolean;
}

/**
 * DrawerContent - automatically inherits direction from parent Drawer via context
 */
const DrawerContent = forwardRef<
  ComponentRef<typeof VaulDrawer.Content>,
  DrawerContentProps
>(({ className, children, showHandle, ...props }, ref) => {
  const direction = useContext(DrawerContext);
  // Auto-show handle for top/bottom drawers
  const shouldShowHandle =
    showHandle ?? (direction === "top" || direction === "bottom");

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <VaulDrawer.Content
        ref={ref}
        className={cn(drawerContentVariants({ side: direction }), className)}
        {...props}
      >
        {shouldShowHandle && <DrawerHandle />}
        {children}
      </VaulDrawer.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = VaulDrawer.Content.displayName;

const DrawerHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-[var(--spacing-1-5)] p-[var(--spacing-6)] pb-[var(--spacing-4)]",
      className,
    )}
    {...props}
  />
));
DrawerHeader.displayName = "DrawerHeader";

const DrawerBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto px-[var(--spacing-6)]", className)}
    {...props}
  />
));
DrawerBody.displayName = "DrawerBody";

const DrawerFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-[var(--spacing-2)] p-[var(--spacing-6)] pt-[var(--spacing-4)] mt-auto",
      className,
    )}
    {...props}
  />
));
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = forwardRef<
  ComponentRef<typeof VaulDrawer.Title>,
  ComponentPropsWithoutRef<typeof VaulDrawer.Title>
>(({ className, ...props }, ref) => (
  <VaulDrawer.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = VaulDrawer.Title.displayName;

const DrawerDescription = forwardRef<
  ComponentRef<typeof VaulDrawer.Description>,
  ComponentPropsWithoutRef<typeof VaulDrawer.Description>
>(({ className, ...props }, ref) => (
  <VaulDrawer.Description
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
));
DrawerDescription.displayName = VaulDrawer.Description.displayName;

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  drawerContentVariants,
  DrawerHandle,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

export type { DrawerProps, DrawerContentProps };
