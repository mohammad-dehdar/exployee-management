"use client"

import type React from "react"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/ui"
import { Label } from "@/components/ui/label/label"
import { Separator } from "@/components/ui/seperator/seperetor"

// <CHANGE> Added variant props for color theming
const fieldSetVariants = cva(
  "flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
  {
    variants: {
      variant: {
        default: "",
        outlined: "rounded-lg border border-neutral-200 p-4 dark:border-neutral-700",
        filled: "rounded-lg bg-neutral-50 p-4 dark:bg-neutral-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function FieldSet({
  className,
  variant,
  ...props
}: React.ComponentProps<"fieldset"> & VariantProps<typeof fieldSetVariants>) {
  return <fieldset data-slot="field-set" className={cn(fieldSetVariants({ variant }), className)} {...props} />
}

// ... existing code ...

// <CHANGE> Enhanced FieldGroup with variant styling
const fieldGroupVariants = cva(
  "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
  {
    variants: {
      variant: {
        default: "",
        card: "rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-950",
        outlined: "rounded-lg border border-neutral-200 p-4 dark:border-neutral-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function FieldGroup({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldGroupVariants>) {
  return <div data-slot="field-group" className={cn(fieldGroupVariants({ variant }), className)} {...props} />
}

// <CHANGE> Enhanced field variants with status colors
const fieldVariants = cva("group/field flex w-full gap-3", {
  variants: {
    orientation: {
      vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
      horizontal: [
        "flex-row items-center",
        "[&>[data-slot=field-label]]:flex-auto",
        "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      ],
      responsive: [
        "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
        "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
        "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      ],
    },
    status: {
      default: "data-[invalid=true]:text-error-500",
      success: "[&_[data-slot=field-label]]:text-success-600 dark:[&_[data-slot=field-label]]:text-success-400",
      warning: "[&_[data-slot=field-label]]:text-warning-600 dark:[&_[data-slot=field-label]]:text-warning-400",
      error: "[&_[data-slot=field-label]]:text-error-600 dark:[&_[data-slot=field-label]]:text-error-20",
      info: "[&_[data-slot=field-label]]:text-info-600 dark:[&_[data-slot=field-label]]:text-info-400",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    status: "default",
  },
})

function Field({
  className,
  orientation = "vertical",
  status = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      data-status={status}
      className={cn(fieldVariants({ orientation, status }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", className)}
      {...props}
    />
  )
}

// <CHANGE> Enhanced FieldLabel with required indicator support
function FieldLabel({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<typeof Label> & { required?: boolean }) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-4",
        "has-data-[state=checked]:bg-primary-50 has-data-[state=checked]:border-primary-500 dark:has-data-[state=checked]:bg-primary-900/20",
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="text-error-500">*</span>}
    </Label>
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

// <CHANGE> Enhanced FieldDescription with variant colors
const fieldDescriptionVariants = cva(
  "text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5 [&>a:hover]:text-primary-500 [&>a]:underline [&>a]:underline-offset-4",
  {
    variants: {
      variant: {
        default: "text-neutral-500 dark:text-neutral-400",
        success: "text-success-600 dark:text-success-400",
        warning: "text-warning-600 dark:text-warning-100",
        error: "text-error-600 dark:text-error-20",
        info: "text-info-600 dark:text-info-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function FieldDescription({
  className,
  variant,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof fieldDescriptionVariants>) {
  return <p data-slot="field-description" className={cn(fieldDescriptionVariants({ variant }), className)} {...props} />
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn("relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2", className)}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-neutral-500 relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

// <CHANGE> Enhanced FieldError with icon option
function FieldError({
  className,
  children,
  errors,
  showIcon = true,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
  showIcon?: boolean
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors) {
      return null
    }

    if (errors.length === 1 && errors[0]?.message) {
      return errors[0].message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {errors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("flex items-center gap-1.5 text-error-600 text-sm font-normal dark:text-error-20", className)}
      {...props}
    >
      {showIcon && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {content}
    </div>
  )
}

// <CHANGE> Added FieldSuccess component for success messages
function FieldSuccess({
  className,
  children,
  showIcon = true,
  ...props
}: React.ComponentProps<"div"> & { showIcon?: boolean }) {
  if (!children) {
    return null
  }

  return (
    <div
      role="status"
      data-slot="field-success"
      className={cn("flex items-center gap-1.5 text-success-600 text-sm font-normal dark:text-success-400", className)}
      {...props}
    >
      {showIcon && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {children}
    </div>
  )
}

// <CHANGE> Added FieldHint component for helper hints
function FieldHint({ className, children, ...props }: React.ComponentProps<"div">) {
  if (!children) {
    return null
  }

  return (
    <div
      data-slot="field-hint"
      className={cn("flex items-center gap-1.5 text-info-600 text-sm font-normal dark:text-info-400", className)}
      {...props}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </div>
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn("mb-3 font-medium", "data-[variant=legend]:text-base", "data-[variant=label]:text-sm", className)}
      {...props}
    />
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSuccess,
  FieldHint,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
