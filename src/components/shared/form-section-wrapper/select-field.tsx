'use client';

import { useTranslations } from "next-intl"
import { UseFormRegisterReturn } from "react-hook-form"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { useFormSectionDir } from "./index"

interface SelectFieldProps {
  labelKey: string // Translation key for label (e.g., 'fields.position')
  register: UseFormRegisterReturn
  options: Array<{ value: string }> | ReadonlyArray<{ readonly value: string }>
  optionsTranslationKey: string // Base key for options (e.g., 'position', 'contractType')
  editable?: boolean
  sectionKey: string // For translations (e.g., 'userForm.sections.job')
  className?: string
  error?: string
}

export const SelectField = ({
  labelKey,
  register,
  options,
  optionsTranslationKey,
  editable = true,
  sectionKey,
  className = "rounded-lg border border-neutral-40 bg-neutral-20/80 px-3 py-2 text-sm text-neutral-100 shadow-xs focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10",
  error,
}: SelectFieldProps) => {
  const dir = useFormSectionDir()
  const t = useTranslations(`userForm.sections.${sectionKey}`)
  const tOptions = useTranslations("options")
  const tCommon = useTranslations("common")

  return (
    <Field dir={dir}>
      <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">{t(labelKey)}</FieldLabel>
      <select className={className} dir={dir} {...register} disabled={!editable}>
        <option value="">{tCommon("select")}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {tOptions(`${optionsTranslationKey}.${option.value}`)}
          </option>
        ))}
      </select>
      {error && (
        <FieldDescription variant="error" className="text-xs">
          {error}
        </FieldDescription>
      )}
    </Field>
  )
}

