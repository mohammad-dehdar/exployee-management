'use client';

import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { DEGREE_LEVELS, type UserRecord } from "@/schemas/user.schema"
import { FormSectionWrapper, SelectField } from "@/components/shared"

const inputStyles =
  "mt-1.5 border-neutral-40 bg-neutral-20/80 text-sm text-neutral-100 shadow-xs focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10"

export const EducationInfo = ({ editable = true }: { editable?: boolean }) => {
  const { register } = useFormContext<UserRecord>()
  const t = useTranslations("userForm.sections.education")

  return (
    <FormSectionWrapper sectionKey="education" emoji="🎓">
      <FieldSet>
        <FieldGroup className="grid gap-5 md:grid-cols-2">
          <SelectField
            labelKey="fields.degree"
            register={register("education.degree")}
            options={DEGREE_LEVELS.map((degree) => ({ value: degree }))}
            optionsTranslationKey="degree"
            editable={editable}
            sectionKey="education"
          />

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.major")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.major")}
              {...register("education.major")}
              disabled={!editable}
              className={inputStyles}
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.university")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.university")}
              {...register("education.university")}
              disabled={!editable}
              className={inputStyles}
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.graduationYear")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.graduationYear")}
              {...register("education.graduationYear")}
              disabled={!editable}
              className={inputStyles}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </FormSectionWrapper>
  )
}
