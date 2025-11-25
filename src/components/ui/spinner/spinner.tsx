import type React from "react"
import { LoaderCircleIcon } from "@/components/shared/icons"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/ui"

// <CHANGE> Added size and color variants for Spinner
const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-3",
      default: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
    color: {
      default: "text-current",
      primary: "text-primary-500",
      secondary: "text-secondary-500",
      success: "text-success-500",
      warning: "text-warning-500",
      error: "text-error-500",
      info: "text-info-500",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "default",
    color: "default",
  },
})

function Spinner({
  className,
  size,
  color,
  ...props
}: React.ComponentProps<"svg"> & VariantProps<typeof spinnerVariants>) {
  return (
    <LoaderCircleIcon
      role="status"
      aria-label="Loading"
      className={cn(spinnerVariants({ size, color }), className)}
      {...props}
    />
  )
}

export { Spinner, spinnerVariants }
