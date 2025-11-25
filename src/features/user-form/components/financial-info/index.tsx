'use client';

import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { type UserRecord } from "@/schemas/user.schema"
import { FormSectionWrapper } from "@/components/shared"

const inputStyles =
  "mt-1.5 border-neutral-40 bg-neutral-20/80 text-sm text-neutral-100 shadow-xs focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10"

export const FinancialInfo = ({ editable = true }: { editable?: boolean }) => {
  const { register } = useFormContext<UserRecord>()
  const t = useTranslations("userForm.sections.financial")

  return (
    <FormSectionWrapper sectionKey="financial" emoji="💰" borderColor="amber">
      <FieldSet>
        <FieldGroup className="grid gap-5 md:grid-cols-2">
          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
              {t("fields.baseSalary")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.baseSalary")}
              {...register("financial.baseSalary")}
              disabled={!editable}
              className={inputStyles}
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
              {t("fields.benefits")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.benefits")}
              {...register("financial.benefits")}
              disabled={!editable}
              className={inputStyles}
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
              {t("fields.commission")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.commission")}
              {...register("financial.commission")}
              disabled={!editable}
              className={inputStyles}
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">
              {t("fields.overtimeRate")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.overtimeRate")}
              {...register("financial.overtimeRate")}
              disabled={!editable}
              className={inputStyles}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </FormSectionWrapper>
  )
}

