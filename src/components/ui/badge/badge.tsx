import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/ui"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // <CHANGE> Added new color variants based on design system
        success: "border-transparent bg-success-500 text-white [a&]:hover:bg-success-600",
        warning: "border-transparent bg-warning-500 text-neutral-900 [a&]:hover:bg-warning-600",
        error: "border-transparent bg-error-500 text-white [a&]:hover:bg-error-600",
        info: "border-transparent bg-info-500 text-white [a&]:hover:bg-info-600",
        neutral:
          "border-transparent bg-neutral-200 text-neutral-700 [a&]:hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200",
        // Outline variants for softer appearance
        "success-outline": "border-success-500 text-success-600 bg-success-50 [a&]:hover:bg-success-100",
        "warning-outline": "border-warning-500 text-warning-600 bg-warning-50 [a&]:hover:bg-warning-100",
        "error-outline": "border-error-500 text-error-600 bg-error-50 [a&]:hover:bg-error-100",
        "info-outline": "border-info-500 text-info-600 bg-info-50 [a&]:hover:bg-info-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
