import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/ui"

// <CHANGE> Added variant support for Card
const cardVariants = cva("flex flex-col gap-6 rounded-xl border py-6 shadow-sm", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      elevated: "bg-card text-card-foreground shadow-md",
      outline: "bg-transparent border-2",
      ghost: "border-transparent shadow-none bg-muted/50",
      primary:
        "bg-primary-50 border-primary-200 text-primary-900 dark:bg-primary-950 dark:border-primary-800 dark:text-primary-100",
      success:
        "bg-success-50 border-success-200 text-success-900 dark:bg-success-950 dark:border-success-800 dark:text-success-100",
      warning:
        "bg-warning-50 border-warning-200 text-warning-900 dark:bg-warning-950 dark:border-warning-800 dark:text-warning-100",
      error: "bg-error-50 border-error-200 text-error-900 dark:bg-error-950 dark:border-error-800 dark:text-error-100",
      info: "bg-info-50 border-info-200 text-info-900 dark:bg-info-950 dark:border-info-800 dark:text-info-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Card({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return <div data-slot="card" className={cn(cardVariants({ variant }), className)} {...props} />
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center px-6 [.border-t]:pt-6", className)} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, cardVariants }
