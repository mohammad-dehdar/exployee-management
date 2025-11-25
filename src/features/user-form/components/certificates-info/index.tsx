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

export const CertificatesInfo = ({ editable = true }: { editable?: boolean }) => {
  const { control, register } = useFormContext<UserRecord>()
  const { fields, append, remove } = useFieldArray({ control, name: "certificates" })
  const t = useTranslations("userForm.sections.certificates")

  const handleAdd = () => append({ title: "", issuer: "", issueDate: "", duration: "" })

  return (
    <FormSectionWrapper sectionKey="certificates" emoji="📜" contentLayout="stack">
      {fields.map((field, index) => (
        <FieldSet
          key={field.id}
          className="space-y-4 rounded-2xl border border-neutral-40 bg-neutral-10/60 p-4 shadow-sm dark:border-neutral-90 dark:bg-neutral-110/40"
        >
          <FieldGroup className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
                {t("fields.title")}
              </FieldLabel>
              <Input
                placeholder={t("placeholders.title")}
                {...register(`certificates.${index}.title` as const)}
                disabled={!editable}
                className={inputStyles}
              />
            </Field>
            <Field>
              <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
                {t("fields.issuer")}
              </FieldLabel>
              <Input
                placeholder={t("placeholders.issuer")}
                {...register(`certificates.${index}.issuer` as const)}
                disabled={!editable}
                className={inputStyles}
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
                {t("fields.issueDate")}
              </FieldLabel>
              <Input
                type="date"
                {...register(`certificates.${index}.issueDate` as const)}
                disabled={!editable}
                className={inputStyles}
              />
            </Field>
            <Field>
              <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
                {t("fields.duration")}
              </FieldLabel>
              <Input
                placeholder={t("placeholders.duration")}
                {...register(`certificates.${index}.duration` as const)}
                disabled={!editable}
                className={inputStyles}
              />
            </Field>
          </FieldGroup>

          {editable && fields.length > 1 && (
            <div className="flex justify-end">
              <Button variant="ghost" type="button" onClick={() => remove(index)}>
                {t("remove")}
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
