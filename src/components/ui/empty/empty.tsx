import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/ui"

// <CHANGE> Added color variants to Empty component
const emptyVariants = cva(
  "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border border-dashed p-6 text-center text-balance md:p-12",
  {
    variants: {
      variant: {
        default: "border-neutral-200 bg-transparent",
        primary: "border-primary-200 bg-primary-50/50",
        success: "border-success-200 bg-success-50/50",
        warning: "border-warning-200 bg-warning-50/50",
        error: "border-error-200 bg-error-50/50",
        info: "border-info-200 bg-info-50/50",
        neutral: "border-neutral-200 bg-neutral-50/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Empty = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof emptyVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} data-slot="empty" className={cn(emptyVariants({ variant }), className)} {...props} />
))
Empty.displayName = "Empty"

// ... existing code ...

// <CHANGE> Added color variants to EmptyMedia
const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
      color: {
        default: "",
        primary: "bg-primary-100 text-primary-600",
        success: "bg-success-100 text-success-600",
        warning: "bg-warning-100 text-warning-600",
        error: "bg-error-100 text-error-600",
        info: "bg-info-100 text-info-600",
        neutral: "bg-neutral-100 text-neutral-600",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
    },
  },
)

const EmptyMedia = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>
>(({ className, variant = "default", color, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-icon"
    data-variant={variant}
    className={cn(emptyMediaVariants({ variant, color }), className)}
    {...props}
  />
))
EmptyMedia.displayName = "EmptyMedia"

const EmptyHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-header"
      className={cn("flex flex-col items-center gap-2 text-center", className)}
      {...props}
    />
  ),
)
EmptyHeader.displayName = "EmptyHeader"

const EmptyTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      data-slot="empty-title"
      className={cn("text-lg font-semibold leading-tight tracking-tight text-foreground", className)}
      {...props}
    />
  ),
)
EmptyTitle.displayName = "EmptyTitle"

const EmptyDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="empty-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  ),
)
EmptyDescription.displayName = "EmptyDescription"

const EmptyContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-content"
      className={cn("flex flex-col items-center justify-center gap-4", className)}
      {...props}
    />
  ),
)
EmptyContent.displayName = "EmptyContent"

const EmptyActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-actions"
      className={cn("flex flex-col items-center gap-2 sm:flex-row sm:justify-center", className)}
      {...props}
    />
  ),
)
EmptyActions.displayName = "EmptyActions"

export { Empty, EmptyMedia, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyActions }
