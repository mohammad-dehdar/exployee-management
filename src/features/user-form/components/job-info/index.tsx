'use client';

import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { CONTRACT_TYPES, POSITIONS, WORK_LOCATIONS, type UserRecord } from "@/schemas/user.schema"
import { FormSectionWrapper, SelectField } from "@/components/shared"

const inputStyles =
  "mt-1.5 border-neutral-40 bg-neutral-20/80 text-sm text-neutral-100 shadow-xs focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10"

export const JobInfo = ({ editable = true }: { editable?: boolean }) => {
  const { register, formState } = useFormContext<UserRecord>()
  const t = useTranslations("userForm.sections.job")
  const jobErrors = formState.errors.job ?? {}

  return (
    <FormSectionWrapper sectionKey="job" emoji="💼">
      <FieldSet>
        <FieldGroup className="grid gap-5 md:grid-cols-2">
          <SelectField
            labelKey="fields.position"
            register={register("job.position")}
            options={POSITIONS}
            optionsTranslationKey="position"
            editable={editable}
            sectionKey="job"
            error={jobErrors.position?.message}
          />

          <SelectField
            labelKey="fields.contractType"
            register={register("job.contractType")}
            options={CONTRACT_TYPES}
            optionsTranslationKey="contractType"
            editable={editable}
            sectionKey="job"
            error={jobErrors.contractType?.message}
          />

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.startDate")}
            </FieldLabel>
            <Input type="date" {...register("job.startDate")} disabled={!editable} className={inputStyles} />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.endDate")}
            </FieldLabel>
            <Input type="date" {...register("job.endDate")} disabled={!editable} className={inputStyles} />
          </Field>

          <SelectField
            labelKey="fields.location"
            register={register("job.location")}
            options={WORK_LOCATIONS}
            optionsTranslationKey="location"
            editable={editable}
            sectionKey="job"
            error={jobErrors.location?.message}
          />
        </FieldGroup>
      </FieldSet>
    </FormSectionWrapper>
  )
}

