'use client';

import { useTranslations } from "next-intl"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { type UserRecord } from "@/schemas/user.schema"
import { FormSectionWrapper } from "@/components/shared"

const inputStyles =
  "mt-1.5 border-neutral-40 bg-neutral-20/80 text-sm text-neutral-100 shadow-xs focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10"
const textAreaStyles =
  "mt-1.5 w-full rounded-lg border border-neutral-40 bg-neutral-20/80 px-3 py-2 text-sm text-neutral-100 shadow-xs focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10"

export const WorkHistory = ({ editable = true }: { editable?: boolean }) => {
  const { control, register } = useFormContext<UserRecord>()
  const { fields, append, remove } = useFieldArray({ control, name: "workHistory" })
  const t = useTranslations("userForm.sections.workHistory")
  const tCommon = useTranslations("common")

  const handleAdd = () => append({ company: "", role: "", description: "", startDate: "", endDate: "" })

  return (
    <FormSectionWrapper sectionKey="workHistory" emoji="📂" contentLayout="stack">
      {fields.map((field, index) => (
        <FieldSet
          key={field.id}
          className="space-y-4 rounded-2xl border border-neutral-40 bg-neutral-10/60 p-4 shadow-sm dark:border-neutral-90 dark:bg-neutral-110/40"
        >
          <FieldGroup className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
                {t("fields.company")}
              </FieldLabel>
              <Input
                placeholder={t("placeholders.company")}
                {...register(`workHistory.${index}.company` as const)}
                disabled={!editable}
                className={inputStyles}
              />
            </Field>
            <Field>
              <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
                {t("fields.role")}
              </FieldLabel>
              <Input
                placeholder={t("placeholders.role")}
                {...register(`workHistory.${index}.role` as const)}
                disabled={!editable}
                className={inputStyles}
              />
            </Field>
          </FieldGroup>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
              {t("fields.description")}
            </FieldLabel>
            <textarea
              rows={3}
              placeholder={t("placeholders.description")}
              {...register(`workHistory.${index}.description` as const)}
              disabled={!editable}
              className={textAreaStyles}
            />
          </Field>

          <FieldGroup className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
                {t("fields.startDate")}
              </FieldLabel>
              <Input
                type="date"
                {...register(`workHistory.${index}.startDate` as const)}
                disabled={!editable}
                className={inputStyles}
              />
            </Field>
            <Field>
              <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
                {t("fields.endDate")}
              </FieldLabel>
              <Input
                type="date"
                {...register(`workHistory.${index}.endDate` as const)}
                disabled={!editable}
                className={inputStyles}
              />
            </Field>
          </FieldGroup>

          {editable && fields.length > 1 && (
            <div className="flex justify-end">
              <Button type="button" variant="ghost" onClick={() => remove(index)}>
                {tCommon("delete")}
              </Button>
            </div>
          )}
        </FieldSet>
      ))}

      {editable && (
        <div className="flex justify-start">
          <Button type="button" variant="outline" onClick={handleAdd} className="rounded-xl">
            {t("addNew")}
          </Button>
        </div>
      )}
    </FormSectionWrapper>
  )
}
