"use client"

import type * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/ui"

// <CHANGE> Added size and color variants for Avatar
const avatarVariants = cva("relative flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: {
      sm: "size-6 text-xs",
      default: "size-8 text-sm",
      md: "size-10 text-base",
      lg: "size-12 text-lg",
      xl: "size-16 text-xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const avatarFallbackVariants = cva("flex size-full items-center justify-center rounded-full font-medium", {
  variants: {
    color: {
      default: "bg-muted text-muted-foreground",
      primary: "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300",
      secondary: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900 dark:text-secondary-300",
      success: "bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300",
      warning: "bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300",
      error: "bg-error-100 text-error-600 dark:bg-error-900 dark:text-error-600",
      info: "bg-info-100 text-info-700 dark:bg-info-900 dark:text-info-300",
      neutral: "bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200",
    },
  },
  defaultVariants: {
    color: "default",
  },
})

function Avatar({
  className,
  size,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & VariantProps<typeof avatarVariants>) {
  return <AvatarPrimitive.Root data-slot="avatar" className={cn(avatarVariants({ size }), className)} {...props} />
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full", className)} {...props} />
  )
}

function AvatarFallback({
  className,
  color,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & VariantProps<typeof avatarFallbackVariants>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(avatarFallbackVariants({ color }), className)}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
