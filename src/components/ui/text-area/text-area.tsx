import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/ui"

// <CHANGE> Added variant props for textarea
const textareaVariants = cva(
  "flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default:
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 focus-visible:ring-[3px]",
        filled:
          "border-transparent bg-neutral-100 placeholder:text-neutral-500 focus-visible:bg-white focus-visible:border-primary-500 focus-visible:ring-primary-500/20 focus-visible:ring-[3px] dark:bg-neutral-800 dark:placeholder:text-neutral-400",
        ghost:
          "border-transparent bg-transparent placeholder:text-muted-foreground focus-visible:bg-neutral-50 focus-visible:border-neutral-200 dark:focus-visible:bg-neutral-900",
        primary:
          "border-primary-300 placeholder:text-primary-400 focus-visible:border-primary-500 focus-visible:ring-primary-500/20 focus-visible:ring-[3px]",
        success:
          "border-success-300 placeholder:text-success-500 focus-visible:border-success-500 focus-visible:ring-success-500/20 focus-visible:ring-[3px]",
        error:
          "border-error-300 placeholder:text-error-20 focus-visible:border-error-500 focus-visible:ring-error-500/20 focus-visible:ring-[3px]",
      },
      textareaSize: {
        sm: "min-h-12 px-2 py-1.5 text-sm",
        default: "min-h-16 px-3 py-2 text-base md:text-sm",
        lg: "min-h-24 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "default",
    },
  },
)

interface TextareaProps extends React.ComponentProps<"textarea">, VariantProps<typeof textareaVariants> {}

function Textarea({ className, variant, textareaSize, ...props }: TextareaProps) {
  return (
    <textarea data-slot="textarea" className={cn(textareaVariants({ variant, textareaSize }), className)} {...props} />
  )
}

export { Textarea, textareaVariants }
