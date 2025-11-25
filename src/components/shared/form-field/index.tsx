'use client';

import * as React from "react"
import { useLocale } from "next-intl"
import { cn } from "@/utils/ui"
import { FormFieldProps } from "./type"
import { Label } from "@/components/ui"

const messageToneMap = {
  error: "text-error text-xs",
  warning: "text-warning text-xs",
  neutral: "text-neutral-70 text-xs dark:text-neutral-40",
} as const

export function FormField({
  label,
  error,
  warning,
  helperText,
  required = false,
  id,
  className,
  children,
  labelProps,
}: FormFieldProps) {
  const locale = useLocale()
  const generatedId = React.useId()
  const fieldId = id || generatedId
  const message = error || warning || helperText
  const messageTone = error ? "error" : warning ? "warning" : "neutral"

  const defaultAlign = locale === "fa" ? "text-right" : "text-left"
  const alignClass =
    labelProps?.align === "center"
      ? "text-center"
      : labelProps?.align === "right"
        ? "text-right"
        : labelProps?.align === "justify"
          ? "text-justify"
          : defaultAlign

  const clonedChildren = React.isValidElement(children)
    ? React.cloneElement(children, { id: fieldId } as Partial<unknown>)
    : children

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label
        htmlFor={fieldId}
        className={cn(
          "text-sm font-medium text-neutral-100 dark:text-neutral-20",
          alignClass,
          labelProps?.size === "xs" && "text-xs",
          labelProps?.size === "lg" && "text-base",
          labelProps?.size === "xl" && "text-lg",
        )}
      >
        {label}
        {required && (
          <span className={cn(locale === "fa" ? "mr-1" : "ml-1", "text-error")} aria-label="required">
            *
          </span>
        )}
      </Label>

      {clonedChildren}

      {message && (
        <p
          className={cn(
            "mt-1 leading-relaxed",
            alignClass,
            messageToneMap[messageTone],
          )}
          role={error ? "alert" : "status"}
          aria-live={error ? "assertive" : "polite"}
        >
          {message}
        </p>
      )}
    </div>
  )
}
