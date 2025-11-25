"use client"

import type * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/ui"

// <CHANGE> Added variant props for label
const labelVariants = cva(
  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary-600",
        secondary: "text-secondary-600",
        success: "text-success-600",
        warning: "text-warning-600",
        error: "text-error-600",
        info: "text-info-600",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root>, VariantProps<typeof labelVariants> {
  required?: boolean
}

function Label({ className, variant, size, required, children, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root data-slot="label" className={cn(labelVariants({ variant, size }), className)} {...props}>
      {children}
      {required && <span className="text-error-500 mr-1">*</span>}
    </LabelPrimitive.Root>
  )
}

export { Label, labelVariants }
