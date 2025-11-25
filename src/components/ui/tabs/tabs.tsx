"use client"

import type * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/ui"

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />
}

// <CHANGE> Added variant support for TabsList
const tabsListVariants = cva("inline-flex w-fit items-center justify-center", {
  variants: {
    variant: {
      default: "bg-muted text-muted-foreground h-9 rounded-lg p-[3px]",
      underline: "border-b border-neutral-200 dark:border-neutral-700 bg-transparent rounded-none p-0 gap-0",
      pills: "bg-transparent gap-2 p-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function TabsList({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

// <CHANGE> Added variant support for TabsTrigger
const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center gap-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        default:
          "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground h-[calc(100%-1px)] flex-1 rounded-md border border-transparent px-2 py-1 data-[state=active]:shadow-sm",
        underline:
          "text-muted-foreground data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-2 -mb-px hover:text-foreground",
        pills:
          "text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1.5 hover:bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function TabsTrigger({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsTriggerVariants>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
