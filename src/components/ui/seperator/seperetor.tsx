"use client"

import type * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/ui"

// <CHANGE> Added variants for color, size, and style
const separatorVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "bg-border",
      primary: "bg-primary-200",
      secondary: "bg-secondary-200",
      neutral: "bg-neutral-300",
      success: "bg-success-200",
      warning: "bg-warning-200",
      error: "bg-error-200",
      info: "bg-info-200",
      muted: "bg-muted",
    },
    size: {
      default: "data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px",
      sm: "data-[orientation=horizontal]:h-[0.5px] data-[orientation=vertical]:w-[0.5px]",
      md: "data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]",
      lg: "data-[orientation=horizontal]:h-[3px] data-[orientation=vertical]:w-[3px]",
      xl: "data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1",
    },
    pattern: {
      solid: "",
      dashed:
        "border-dashed border-0 bg-transparent data-[orientation=horizontal]:border-t data-[orientation=vertical]:border-r border-current",
      dotted:
        "border-dotted border-0 bg-transparent data-[orientation=horizontal]:border-t data-[orientation=vertical]:border-r border-current",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    pattern: "solid",
  },
})

// <CHANGE> Added SeparatorWithLabel component for labeled separators
interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof separatorVariants> {}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  size,
  pattern,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ variant, size, pattern }),
        "data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
        className,
      )}
      {...props}
    />
  )
}

// <CHANGE> New SeparatorWithLabel component
interface SeparatorWithLabelProps extends SeparatorProps {
  label?: React.ReactNode
  labelPosition?: "start" | "center" | "end"
  labelClassName?: string
}

function SeparatorWithLabel({
  label,
  labelPosition = "center",
  labelClassName,
  className,
  variant,
  size,
  pattern,
  ...props
}: SeparatorWithLabelProps) {
  const positionClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  }

  return (
    <div className={cn("flex items-center w-full gap-3", positionClasses[labelPosition], className)}>
      {labelPosition !== "start" && (
        <Separator
          variant={variant}
          size={size}
          pattern={pattern}
          className={labelPosition === "center" ? "flex-1" : "w-8"}
          {...props}
        />
      )}
      {label && (
        <span className={cn("text-sm text-muted-foreground whitespace-nowrap px-2", labelClassName)}>{label}</span>
      )}
      {labelPosition !== "end" && (
        <Separator
          variant={variant}
          size={size}
          pattern={pattern}
          className={labelPosition === "center" ? "flex-1" : "w-8"}
          {...props}
        />
      )}
    </div>
  )
}

export { Separator, SeparatorWithLabel, separatorVariants }
