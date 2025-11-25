import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/ui"

// <CHANGE> Added variant and size support for Input
const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default:
          "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        filled:
          "bg-muted border-transparent focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        ghost: "border-transparent bg-transparent shadow-none focus-visible:bg-muted focus-visible:border-input",
      },
      size: {
        sm: "h-8 px-2.5 py-1 text-xs file:h-6",
        default: "h-9 px-3 py-1 file:h-7",
        lg: "h-11 px-4 py-2 text-base file:h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Input({
  className,
  type,
  variant,
  size,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return <input type={type} data-slot="input" className={cn(inputVariants({ variant, size }), className)} {...props} />
}

export { Input, inputVariants }
