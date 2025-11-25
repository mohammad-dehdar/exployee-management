"use client"

import type * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/ui"

// <CHANGE> Added variant props for tooltip content
const tooltipContentVariants = cva(
  "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        primary: "bg-primary-500 text-white",
        secondary: "bg-secondary-500 text-white",
        success: "bg-success-500 text-white",
        warning: "bg-warning-500 text-white",
        error: "bg-error-500 text-white",
        info: "bg-info-500 text-white",
        light: "bg-white text-neutral-900 border border-neutral-200 shadow-lg",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        default: "px-3 py-1.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

// <CHANGE> Added arrow variant colors
const tooltipArrowVariants = cva("z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]", {
  variants: {
    variant: {
      default: "bg-foreground fill-foreground",
      primary: "bg-primary-500 fill-primary-500",
      secondary: "bg-secondary-500 fill-secondary-500",
      success: "bg-success-500 fill-success-500",
      warning: "bg-warning-500 fill-warning-500",
      error: "bg-error-500 fill-error-500",
      info: "bg-info-500 fill-info-500",
      light: "bg-white fill-white border-l border-b border-neutral-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

// <CHANGE> Added variant and size props to TooltipContent
interface TooltipContentProps
  extends React.ComponentProps<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {
  showArrow?: boolean
}

function TooltipContent({
  className,
  sideOffset = 4,
  variant,
  size,
  showArrow = true,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(tooltipContentVariants({ variant, size }), className)}
        {...props}
      >
        {children}
        {showArrow && <TooltipPrimitive.Arrow className={cn(tooltipArrowVariants({ variant }))} />}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
