'use client'

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ReactNode,
} from 'react'
import { Drawer as VaulDrawer } from 'vaul'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '#lib/cn'

// Re-export Vaul primitives
const DrawerTrigger = VaulDrawer.Trigger
const DrawerClose = VaulDrawer.Close
const DrawerPortal = VaulDrawer.Portal

type DrawerDirection = 'left' | 'right' | 'top' | 'bottom'

const DrawerContext = createContext<DrawerDirection>('right')
const DrawerScrollContext = createContext<{
  isScrolled: boolean
  setIsScrolled: (scrolled: boolean) => void
}>({ isScrolled: false, setIsScrolled: () => {} })

type DrawerProps = ComponentPropsWithoutRef<typeof VaulDrawer.Root> & {
  /**
   * Direction from which the drawer slides in
   * @default "right"
   */
  direction?: DrawerDirection
  children?: ReactNode
}

/**
 * Drawer root component - wraps Vaul and provides direction context
 * so DrawerContent automatically inherits the direction for CSS positioning
 */
const Drawer = ({ direction = 'right', children, ...props }: DrawerProps) => (
  <DrawerContext.Provider value={direction}>
    <VaulDrawer.Root direction={direction} {...props}>
      {children}
    </VaulDrawer.Root>
  </DrawerContext.Provider>
)

const DrawerOverlay = forwardRef<
  ComponentRef<typeof VaulDrawer.Overlay>,
  ComponentPropsWithoutRef<typeof VaulDrawer.Overlay>
>(({ className, ...props }, ref) => (
  <VaulDrawer.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-drawer bg-[var(--color-overlay-backdrop)]',
      'touch-none',
      className
    )}
    {...props}
  />
))
DrawerOverlay.displayName = VaulDrawer.Overlay.displayName

/**
 * Drawer side variants - slide in from different edges with swipe gestures
 * - left: Slide from left edge (navigation, menus)
 * - right: Slide from right edge (filters, settings) - default
 * - top: Slide from top edge (notifications)
 * - bottom: Slide from bottom edge (mobile sheets) - native Vaul direction
 *
 * Mobile (<768px): Full screen for left/right drawers
 * Tablet/Desktop: Partial width with max-w constraint
 */
const drawerContentVariants = cva(
  [
    // Base styles
    'fixed z-drawer flex flex-col overflow-hidden',
    'bg-surface-base border-border-default shadow-lg',
  ],
  {
    variants: {
      side: {
        left: ['top-0 left-0 h-dvh max-h-dvh', 'w-full md:w-3/4 md:max-w-sm', 'border-r'],
        right: ['top-0 right-0 h-dvh max-h-dvh', 'w-full md:w-3/4 md:max-w-md', 'md:border-l'],
        top: ['inset-x-0 top-0 w-full max-h-[80vh]', 'border-b'],
        bottom: ['inset-x-0 bottom-0 w-full max-h-[80vh]', 'border-t'],
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
)

/** Width token for drawer handle - 100px per design spec */
const DRAWER_HANDLE_WIDTH = 'w-[var(--spacing-25)]'

/**
 * Handle bar indicator for top/bottom drawers
 */
const DrawerHandle = forwardRef<
  ComponentRef<typeof VaulDrawer.Handle>,
  ComponentPropsWithoutRef<typeof VaulDrawer.Handle>
>(({ className, ...props }, ref) => (
  <VaulDrawer.Handle
    ref={ref}
    aria-label="Drag to resize"
    data-testid="drawer-handle"
    className={cn(
      `mx-auto mt-[var(--spacing-4)] h-[var(--spacing-2)] ${DRAWER_HANDLE_WIDTH} rounded-full bg-[var(--color-border-muted)]`,
      className
    )}
    {...props}
  />
))
DrawerHandle.displayName = 'DrawerHandle'

interface DrawerContentProps
  extends
    Omit<ComponentPropsWithoutRef<typeof VaulDrawer.Content>, 'asChild'>,
    VariantProps<typeof drawerContentVariants> {
  /**
   * Show handle bar indicator (auto-shown for top/bottom drawers)
   */
  showHandle?: boolean
}

/**
 * DrawerContent - automatically inherits direction from parent Drawer via context
 */
const DrawerContent = forwardRef<ComponentRef<typeof VaulDrawer.Content>, DrawerContentProps>(
  ({ className, children, showHandle, ...props }, ref) => {
    const direction = useContext(DrawerContext)
    const [isScrolled, setIsScrolled] = useState(false)
    // Auto-show handle for top/bottom drawers
    const shouldShowHandle = showHandle ?? (direction === 'top' || direction === 'bottom')

    return (
      <DrawerPortal>
        <DrawerOverlay />
        <VaulDrawer.Content
          ref={ref}
          className={cn(drawerContentVariants({ side: direction }), className)}
          {...props}
        >
          <DrawerScrollContext.Provider value={{ isScrolled, setIsScrolled }}>
            {shouldShowHandle && <DrawerHandle />}
            {children}
          </DrawerScrollContext.Provider>
        </VaulDrawer.Content>
      </DrawerPortal>
    )
  }
)
DrawerContent.displayName = VaulDrawer.Content.displayName

const DrawerHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isScrolled } = useContext(DrawerScrollContext)
    return (
      <div
        ref={ref}
        data-drawer-header=""
        data-scrolled={isScrolled}
        className={cn(
          'flex flex-col gap-[var(--spacing-1-5)] p-[var(--spacing-6)] pb-[var(--spacing-4)] border-b border-border-default flex-shrink-0',
          className
        )}
        {...props}
      />
    )
  }
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, onScroll, ...props }, ref) => {
    const { setIsScrolled } = useContext(DrawerScrollContext)

    const handleScroll = useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        setIsScrolled(e.currentTarget.scrollTop > 0)
        onScroll?.(e)
      },
      [setIsScrolled, onScroll]
    )

    return (
      <div
        ref={ref}
        onScroll={handleScroll}
        className={cn(
          'flex-1 overflow-y-auto overscroll-contain px-[var(--spacing-6)] pt-[var(--spacing-4)]',
          className
        )}
        {...props}
      />
    )
  }
)
DrawerBody.displayName = 'DrawerBody'

const DrawerFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse gap-[var(--spacing-3)] sm:flex-row sm:justify-end p-[var(--spacing-6)] pt-[var(--spacing-4)] mt-auto border-t border-border-default flex-shrink-0',
        className
      )}
      {...props}
    />
  )
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = forwardRef<
  ComponentRef<typeof VaulDrawer.Title>,
  ComponentPropsWithoutRef<typeof VaulDrawer.Title>
>(({ className, ...props }, ref) => (
  <VaulDrawer.Title
    ref={ref}
    className={cn(
      'text-[length:var(--font-size-lg)] font-semibold leading-tight tracking-[var(--tracking-tight)]',
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = VaulDrawer.Title.displayName

const DrawerDescription = forwardRef<
  ComponentRef<typeof VaulDrawer.Description>,
  ComponentPropsWithoutRef<typeof VaulDrawer.Description>
>(({ className, ...props }, ref) => (
  <VaulDrawer.Description
    ref={ref}
    className={cn('text-[length:var(--font-size-sm)] text-text-secondary', className)}
    {...props}
  />
))
DrawerDescription.displayName = VaulDrawer.Description.displayName

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
}

export type { DrawerDirection, DrawerProps, DrawerContentProps }

/** Props for DrawerHeader component */
export type DrawerHeaderProps = React.ComponentPropsWithoutRef<'div'>

/** Props for DrawerBody component */
export type DrawerBodyProps = React.ComponentPropsWithoutRef<'div'>

/** Props for DrawerFooter component */
export type DrawerFooterProps = React.ComponentPropsWithoutRef<'div'>
